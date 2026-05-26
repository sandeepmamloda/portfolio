// 'use client'

// import { useEffect, useRef } from 'react'

// export default function CustomCursor() {
//   const dotRef       = useRef(null)
//   const ringRef      = useRef(null)
//   const ringMediaRef = useRef(null)
//   const ringImgRef   = useRef(null)
//   const ringVidRef   = useRef(null)

//   useEffect(() => {
//     const dot       = dotRef.current
//     const ring      = ringRef.current
//     const ringMedia = ringMediaRef.current
//     const ringImg   = ringImgRef.current
//     const ringVid   = ringVidRef.current
//     if (!dot || !ring || !ringMedia || !ringImg || !ringVid) return

//     let mx = 0, my = 0
//     let dx = 0, dy = 0
//     let rx = 0, ry = 0
//     let rafId

//     let activeVideoEl = null
//     let srcPollId     = null

//     const onMove = (e) => {
//       mx = e.clientX
//       my = e.clientY
//     }

//     const loop = () => {
//       dx += (mx - dx) * 0.18
//       dy += (my - dy) * 0.18
//       rx += (mx - rx) * 0.08
//       ry += (my - ry) * 0.08

//       dot.style.left  = dx + 'px'
//       dot.style.top   = dy + 'px'
//       ring.style.left = rx + 'px'
//       ring.style.top  = ry + 'px'

//       rafId = requestAnimationFrame(loop)
//     }

//     const onEnter = () => {
//       ring.style.width  = '80px'
//       ring.style.height = '80px'
//     }

//     const onLeave = () => {
//       ring.style.width  = '52px'
//       ring.style.height = '52px'
//     }

//     const showMedia = (type, src) => {
//       ring.style.width        = '120px'
//       ring.style.height       = '120px'
//       ring.style.overflow     = 'hidden'
//       ring.style.mixBlendMode = 'normal'
//       ring.style.background   = 'transparent'
//       ring.classList.add('media-active')
//       dot.style.zIndex        = '10000'

//       if (type === 'video') {
//         ringImg.style.display = 'none'
//         ringVid.style.display = 'block'
//         if (ringVid.src !== src) {
//           ringVid.pause()
//           ringVid.src = src
//           ringVid.load()
//           ringVid.play().catch(() => {})
//         }
//       } else {
//         ringVid.style.display = 'none'
//         ringVid.pause()
//         ringVid.removeAttribute('src')
//         ringImg.style.display = 'block'
//         if (ringImg.src !== src) ringImg.src = src
//       }

//       ringMedia.style.opacity = '1'
//     }

//     const hideMedia = () => {
//       activeVideoEl = null
//       clearInterval(srcPollId)

//       ring.style.width        = '52px'
//       ring.style.height       = '52px'
//       ring.style.overflow     = 'visible'
//       ring.style.mixBlendMode = 'difference'
//       ring.style.background   = '#fff'
//       ring.classList.remove('media-active')
//       dot.style.zIndex        = '9999'
//       ringMedia.style.opacity = '0'
//       ringVid.pause()
//       ringVid.removeAttribute('src')
//     }

//     const startVideoPoll = (el) => {
//       activeVideoEl = el
//       clearInterval(srcPollId)

//       srcPollId = setInterval(() => {
//         if (!activeVideoEl) return
//         const latest = activeVideoEl.currentSrc || activeVideoEl.src || activeVideoEl.getAttribute('src')
//         if (latest && latest !== ringVid.src) {
//           ringVid.pause()
//           ringVid.src = latest
//           ringVid.load()
//           ringVid.play().catch(() => {})
//         }
//       }, 300)
//     }

//     const mediaHandlers = new WeakMap()

//     const attachListeners = () => {
//       document.querySelectorAll('a, button, [data-cursor="hover"]').forEach(el => {
//         el.removeEventListener('mouseenter', onEnter)
//         el.removeEventListener('mouseleave', onLeave)
//         el.addEventListener('mouseenter', onEnter)
//         el.addEventListener('mouseleave', onLeave)
//       })

//       document.querySelectorAll('img').forEach(el => {
//         if (el === ringImg) return
//         if (mediaHandlers.has(el)) {
//           el.removeEventListener('mouseenter', mediaHandlers.get(el))
//           el.removeEventListener('mouseleave', hideMedia)
//         }
//         const handler = () => showMedia('image', el.currentSrc || el.src)
//         mediaHandlers.set(el, handler)
//         el.addEventListener('mouseenter', handler)
//         el.addEventListener('mouseleave', hideMedia)
//       })

//       document.querySelectorAll('video').forEach(el => {
//         if (el === ringVid) return
//         if (mediaHandlers.has(el)) {
//           el.removeEventListener('mouseenter', mediaHandlers.get(el))
//           el.removeEventListener('mouseleave', hideMedia)
//         }
//         const handler = () => {
//           const src = el.currentSrc || el.src || el.getAttribute('src')
//           showMedia('video', src)
//           startVideoPoll(el)
//         }
//         mediaHandlers.set(el, handler)
//         el.addEventListener('mouseenter', handler)
//         el.addEventListener('mouseleave', hideMedia)
//       })

//       document.querySelectorAll('[data-cursor-type]').forEach(el => {
//         if (mediaHandlers.has(el)) {
//           el.removeEventListener('mouseenter', mediaHandlers.get(el))
//           el.removeEventListener('mouseleave', hideMedia)
//         }
//         const handler = () => showMedia(el.dataset.cursorType, el.dataset.cursorSrc)
//         mediaHandlers.set(el, handler)
//         el.addEventListener('mouseenter', handler)
//         el.addEventListener('mouseleave', hideMedia)
//       })
//     }

//     window.addEventListener('mousemove', onMove)
//     rafId = requestAnimationFrame(loop)
//     attachListeners()

//     const observer = new MutationObserver(attachListeners)
//     observer.observe(document.body, { childList: true, subtree: true })

//     return () => {
//       window.removeEventListener('mousemove', onMove)
//       cancelAnimationFrame(rafId)
//       clearInterval(srcPollId)
//       observer.disconnect()
//     }
//   }, [])

//   return (
//     <>
//       <div ref={dotRef}  id="c-dot" />
//       <div ref={ringRef} id="c-ring">
//         <div ref={ringMediaRef} id="ring-media">
//           <img   ref={ringImgRef} src={null} alt="" />
//           <video ref={ringVidRef} src={null} muted loop playsInline />
//         </div>
//       </div>
//     </>
//   )
// }

// ===========================================================
'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef       = useRef(null)
  const ringRef      = useRef(null)
  const ringMediaRef = useRef(null)
  const ringImgRef   = useRef(null)
  const ringVidRef   = useRef(null)

  useEffect(() => {
    const dot       = dotRef.current
    const ring      = ringRef.current
    const ringMedia = ringMediaRef.current
    const ringImg   = ringImgRef.current
    const ringVid   = ringVidRef.current
    if (!dot || !ring || !ringMedia || !ringImg || !ringVid) return

    let mx = 0, my = 0
    let dx = 0, dy = 0
    let rx = 0, ry = 0
    let rafId

    let activeVideoEl = null
    let srcPollId     = null

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
    }

    const loop = () => {
      dx += (mx - dx) * 0.18
      dy += (my - dy) * 0.18
      rx += (mx - rx) * 0.08
      ry += (my - ry) * 0.08

      dot.style.left  = dx + 'px'
      dot.style.top   = dy + 'px'
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'

      rafId = requestAnimationFrame(loop)
    }

    const onEnter = () => {
      ring.style.width  = '80px'
      ring.style.height = '80px'
    }

    const onLeave = () => {
      ring.style.width  = '52px'
      ring.style.height = '52px'
    }

    const showMedia = (type, src) => {
      ring.style.width        = '120px'
      ring.style.height       = '120px'
      ring.style.overflow     = 'hidden'
      ring.style.mixBlendMode = 'normal'
      ring.style.background   = 'transparent'
      ring.classList.add('media-active')
      dot.style.zIndex        = '10000'

      if (type === 'video') {
        ringImg.style.display = 'none'
        ringVid.style.display = 'block'
        if (ringVid.src !== src) {
          ringVid.pause()
          ringVid.src = src
          ringVid.load()
          ringVid.play().catch(() => {})
        }
      } else {
        ringVid.style.display = 'none'
        ringVid.pause()
        ringVid.removeAttribute('src')
        ringImg.style.display = 'block'
        if (ringImg.src !== src) ringImg.src = src
      }

      ringMedia.style.opacity = '1'
    }

    const hideMedia = () => {
      activeVideoEl = null
      clearInterval(srcPollId)

      ring.style.width        = '52px'
      ring.style.height       = '52px'
      ring.style.overflow     = 'visible'
      ring.style.mixBlendMode = 'difference'
      ring.style.background   = '#fff'
      ring.classList.remove('media-active')
      dot.style.zIndex        = '9999'
      ringMedia.style.opacity = '0'
      ringVid.pause()
      ringVid.removeAttribute('src')
    }

    const startVideoPoll = (el) => {
      activeVideoEl = el
      clearInterval(srcPollId)

      srcPollId = setInterval(() => {
        if (!activeVideoEl) return
        const latest = activeVideoEl.currentSrc || activeVideoEl.src || activeVideoEl.getAttribute('src')
        if (latest && latest !== ringVid.src) {
          ringVid.pause()
          ringVid.src = latest
          ringVid.load()
          ringVid.play().catch(() => {})
        }
      }, 300)
    }

    const mediaHandlers = new WeakMap()

    const attachListeners = () => {
      document.querySelectorAll('a, button, [data-cursor="hover"]').forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })

      document.querySelectorAll('img').forEach(el => {
        if (el === ringImg) return
        if (mediaHandlers.has(el)) {
          el.removeEventListener('mouseenter', mediaHandlers.get(el))
          el.removeEventListener('mouseleave', hideMedia)
        }
        const handler = () => showMedia('image', el.currentSrc || el.src)
        mediaHandlers.set(el, handler)
        el.addEventListener('mouseenter', handler)
        el.addEventListener('mouseleave', hideMedia)
      })

      document.querySelectorAll('video').forEach(el => {
        if (el === ringVid) return
        if (mediaHandlers.has(el)) {
          el.removeEventListener('mouseenter', mediaHandlers.get(el))
          el.removeEventListener('mouseleave', hideMedia)
        }
        const handler = () => {
          const src = el.currentSrc || el.src || el.getAttribute('src')
          showMedia('video', src)
          startVideoPoll(el)
        }
        mediaHandlers.set(el, handler)
        el.addEventListener('mouseenter', handler)
        el.addEventListener('mouseleave', hideMedia)
      })

      document.querySelectorAll('[data-cursor-type]').forEach(el => {
        if (mediaHandlers.has(el)) {
          el.removeEventListener('mouseenter', mediaHandlers.get(el))
          el.removeEventListener('mouseleave', hideMedia)
        }
        const handler = () => showMedia(el.dataset.cursorType, el.dataset.cursorSrc)
        mediaHandlers.set(el, handler)
        el.addEventListener('mouseenter', handler)
        el.addEventListener('mouseleave', hideMedia)
      })
    }

    // ── NEW: Fullscreen mein native cursor dikhao, bahar custom cursor ──
    const onFullscreenChange = () => {
      if (document.fullscreenElement) {
        // Fullscreen enter — custom cursor hide, native cursor show
        dot.style.display  = 'none'
        ring.style.display = 'none'
        document.documentElement.style.cursor = 'default'
      } else {
        // Fullscreen exit — custom cursor wapas, native cursor hide
        dot.style.display  = 'block'
        ring.style.display = 'block'
        document.documentElement.style.cursor = 'none'
        hideMedia()
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('fullscreenchange', onFullscreenChange)
    rafId = requestAnimationFrame(loop)
    attachListeners()

    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('fullscreenchange', onFullscreenChange)
      cancelAnimationFrame(rafId)
      clearInterval(srcPollId)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  id="c-dot" />
      <div ref={ringRef} id="c-ring">
        <div ref={ringMediaRef} id="ring-media">
          <img   ref={ringImgRef} src={null} alt="" />
          <video ref={ringVidRef} src={null} muted loop playsInline />
        </div>
      </div>
    </>
  )
}