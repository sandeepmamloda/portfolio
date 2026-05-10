"use client"
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./heroabout.module.css";

const ParticleBox = ({ children, imageSrc }) => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = canvas.clientWidth;
    const H = canvas.clientHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(W, H, false);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.set(0, 0, 10);

    // ── Grid config ────────────────────────────────────────────────────────
    const PARTS     = 32;             // more tiles → smaller cubes
    const SIZE      = 10;
    const TILE      = SIZE / PARTS;   // each tile's world size
    const GAP       = 1.0;            // tile fill ratio (1.0 = no gap)

    // ── Object-fit: cover UVs ──────────────────────────────────────────────
    const canvasAspect = W / H;
    const imageAspect  = 1.0;
    let uScale = 1, vScale = 1, uOff = 0, vOff = 0;
    if (canvasAspect > imageAspect) {
      vScale = imageAspect / canvasAspect;
      vOff   = (1 - vScale) / 2;
    } else {
      uScale = canvasAspect / imageAspect;
      uOff   = (1 - uScale) / 2;
    }

    // ── Texture ────────────────────────────────────────────────────────────
    const texture = new THREE.TextureLoader().load(imageSrc, (tex) => {
      tex.colorSpace      = THREE.SRGBColorSpace;
      tex.generateMipmaps = true;
      tex.minFilter       = THREE.LinearMipMapLinearFilter;
      tex.magFilter       = THREE.LinearFilter;
      tex.anisotropy      = renderer.capabilities.getMaxAnisotropy();
      tex.needsUpdate     = true;
    });

    // ── Build tiles ────────────────────────────────────────────────────────
    const planes = [];

    for (let xi = 0; xi < PARTS; xi++) {
      for (let yi = 0; yi < PARTS; yi++) {

        const geo = new THREE.PlaneGeometry(TILE * GAP, TILE * GAP);

        // Cover UVs
        const u0  = uOff + (xi / PARTS) * uScale;
        const v0  = vOff + (yi / PARTS) * vScale;
        const uS  = uScale / PARTS;
        const vS  = vScale / PARTS;
        const uvArr = geo.attributes.uv.array;
        for (let k = 0; k < uvArr.length; k += 2) {
          uvArr[k]     = u0 + uvArr[k]     * uS;
          uvArr[k + 1] = v0 + uvArr[k + 1] * vS;
        }
        geo.attributes.uv.needsUpdate = true;

        const mat  = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(geo, mat);

        // Grid resting position (image assembled)
        const rx = xi * TILE - SIZE / 2 + TILE / 2;
        const ry = yi * TILE - SIZE / 2 + TILE / 2;
        mesh.position.set(rx, ry, 0);

        // ── Circular scattered position ──────────────────────────────────
        // Each tile gets a "burst" position — random angle, random radius
        // within a circular area centered at origin
        const angle   = Math.random() * Math.PI * 2;
        const radius  = 1.5 + Math.random() * 3.5; // 1.5–5 world units from center
        const sx      = Math.cos(angle) * radius;
        const sy      = Math.sin(angle) * radius;
        const sz      = (Math.random() - 0.5) * 2;  // slight Z depth variation

        // Random rotation for scattered state
        const srx = (Math.random() - 0.5) * Math.PI * 2;
        const sry = (Math.random() - 0.5) * Math.PI * 2;
        const srz = (Math.random() - 0.5) * Math.PI * 2;

        mesh.userData = {
          // Grid (assembled) state
          gx: rx, gy: ry, gz: 0,
          grx: 0, gry: 0, grz: 0,
          // Scattered (circular burst) state
          sx, sy, sz,
          srx, sry, srz,
          // Hover
          hoverProgress: 0,
          hoverTarget:   0,
          randomDir: new THREE.Vector3(
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
          ),
        };

        scene.add(mesh);
        planes.push(mesh);
      }
    }

    // ── GSAP: assembled ↔ circular-scattered loop ─────────────────────────
    // Animate each tile between its grid position and its circular burst pos
    const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } });

    // Phase 1 → assembled (grid)
    tl.to(planes.map(p => p.userData), {
      duration: 1.8,
      ease: "power2.inOut",
      stagger: {
        amount: 1.2,
        from:   "center",   // stagger radiates outward from center
        grid:   [PARTS, PARTS],
      },
      onUpdate() {
        // driven by GSAP progress — actual position set in render loop
      },
    });

    // We'll drive position via a simpler approach:
    // animate a single "progress" value per tile using gsap.to on userData
    // Phase A: 0 = grid, 1 = scattered
    planes.forEach((p) => {
      p.userData.blend = 0; // 0 = grid, 1 = scattered
    });

    // Kill the above dummy tl, use proper one
    tl.kill();

    const tl2 = gsap.timeline({ repeat: -1, yoyo: true });
    // → scatter out
    tl2.to(planes.map(p => p.userData), {
      blend: 1,
      duration: 1.6,
      ease: "power2.inOut",
      stagger: { amount: 1.0, from: "center", grid: [PARTS, PARTS] },
    })
    // hold scattered
    .to({}, { duration: 0.6 })
    // → assemble back  (yoyo handles this via repeat:-1 yoyo:true)
    ;

    // ── Mouse hover via raycaster ─────────────────────────────────────────
    const raycaster     = new THREE.Raycaster();
    const threeMouseVec = new THREE.Vector2();

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      threeMouseVec.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      threeMouseVec.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
      raycaster.setFromCamera(threeMouseVec, camera);
      const hits = raycaster.intersectObjects(planes);
      planes.forEach((p) => {
        p.userData.hoverTarget = hits.find(h => h.object === p) ? 1 : 0;
      });
    };

    const onLeave = () => {
      mouse.current = { x: -999, y: -999 };
      planes.forEach(p => { p.userData.hoverTarget = 0; });
    };

    const onTouch = (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
      threeMouseVec.x =  ((e.touches[0].clientX - rect.left) / rect.width)  * 2 - 1;
      threeMouseVec.y = -((e.touches[0].clientY - rect.top)  / rect.height) * 2 + 1;
      raycaster.setFromCamera(threeMouseVec, camera);
      const hits = raycaster.intersectObjects(planes);
      planes.forEach((p) => {
        p.userData.hoverTarget = hits.find(h => h.object === p) ? 1 : 0;
      });
    };

    const onTouchEnd = () => {
      mouse.current = { x: -999, y: -999 };
      planes.forEach(p => { p.userData.hoverTarget = 0; });
    };

    canvas.addEventListener("mousemove",  onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchmove",  onTouch, { passive: false });
    canvas.addEventListener("touchend",   onTouchEnd);

    // ── Render loop ────────────────────────────────────────────────────────
    let raf;
    const loop = () => {
      raf = requestAnimationFrame(loop);

      planes.forEach((p) => {
        const ud = p.userData;

        // Lerp hover progress
        ud.hoverProgress = THREE.MathUtils.lerp(ud.hoverProgress, ud.hoverTarget, 0.1);

        // Base position: lerp between grid and circular-scattered via blend
        const b = ud.blend;
        const bx = ud.gx + (ud.sx - ud.gx) * b;
        const by = ud.gy + (ud.sy - ud.gy) * b;
        const bz = ud.gz + (ud.sz - ud.gz) * b;

        // Hover offset (scatter away from cursor)
        const hoverDist = 1.2;
        const hx = bx + ud.randomDir.x * hoverDist * ud.hoverProgress;
        const hy = by + ud.randomDir.y * hoverDist * ud.hoverProgress;
        const hz = bz + ud.randomDir.z * hoverDist * ud.hoverProgress;

        p.position.set(hx, hy, hz);

        // Rotation: lerp between grid (flat) and scattered (random)
        p.rotation.x = ud.srx * b;
        p.rotation.y = ud.sry * b;
        p.rotation.z = ud.srz * b;
      });

      renderer.render(scene, camera);
    };
    loop();

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      tl2.kill();
      canvas.removeEventListener("mousemove",  onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchmove",  onTouch);
      canvas.removeEventListener("touchend",   onTouchEnd);
      planes.forEach(p => { p.geometry.dispose(); p.material.dispose(); });
      texture.dispose();
      renderer.dispose();
    };
  }, [imageSrc]);

  return (
    <div className={styles["img-wrapper"]} style={{ position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          borderRadius: "1.5rem",
          cursor: "crosshair",
        }}
      />
      {children}
    </div>
  );
};

const Heroabout = function () {
  return (
    <section className={styles["heroabout-wrapper"]}>
      <div className={styles["hero-video-wrapper"]}>
        <video autoPlay muted loop playsInline>
          <source src="/videos/about/about.mp4" type="video/mp4" />
        </video>
      </div>
      <div className={styles["hero-text-wrapper"]}>
        <ParticleBox imageSrc="/images/normal.png">
          <div className={styles["hero-text-left-1"]}>
            <h1>WHERE SCRIPTS BECOME SIGHT</h1>
          </div>
          <div className={styles["hero-text-left-2"]}>
            <p>
              I tell stories through both the lens and the page where visuals
              meet emotion and moments become cinema.
            </p>
          </div>
          <div className={styles["hero-text-right-bottom"]}>
            <p>FILM-MAKER &amp; WRITER</p>
          </div>
        </ParticleBox>
      </div>
    </section>
  );
};

export default Heroabout;