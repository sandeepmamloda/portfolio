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

    // Currently hovered video element track karo
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

    // Normal hover
    const onEnter = () => {
      ring.style.width  = '80px'
      ring.style.height = '80px'
    }

    const onLeave = () => {
      ring.style.width  = '52px'
      ring.style.height = '52px'
    }

    const showMedia = (type, src) => {
      ring.style.width        = '160px'
      ring.style.height       = '160px'
      ring.style.overflow     = 'hidden'
      ring.style.mixBlendMode = 'normal'
      ring.style.background   = 'transparent'
      // dot NAHI hatate — visible rehega
      dot.style.zIndex        = '10000'       // dot ring ke upar rahe

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
        if (ringImg.src !== src) {
          ringImg.src = src
        }
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
      dot.style.zIndex        = '9999'
      ringMedia.style.opacity = '0'
      ringVid.pause()
      ringVid.removeAttribute('src')
    }

    // Video ka src continuously poll karo jab hover ho
    // — React/JS se src change hone pe bhi catch ho
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
      // Links & buttons
      document.querySelectorAll('a, button, [data-cursor="hover"]').forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })

      // Saari <img> — automatically
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

      // Saare <video> — automatically + src change detection
      document.querySelectorAll('video').forEach(el => {
        if (el === ringVid) return
        if (mediaHandlers.has(el)) {
          el.removeEventListener('mouseenter', mediaHandlers.get(el))
          el.removeEventListener('mouseleave', hideMedia)
        }
        const handler = () => {
          const src = el.currentSrc || el.src || el.getAttribute('src')
          showMedia('video', src)
          startVideoPoll(el)  // polling start — src change hone pe ring update hogi
        }
        mediaHandlers.set(el, handler)
        el.addEventListener('mouseenter', handler)
        el.addEventListener('mouseleave', hideMedia)
      })

      // Manual data-cursor-type bhi support
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

    window.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(loop)
    attachListeners()

    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
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