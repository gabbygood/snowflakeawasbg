import React, { useRef, useEffect } from 'react'

const LanternCanvas = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const lanterns = []
    const maxLanterns = 50

    const createLantern = () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 200,
      size: Math.random() * 20 + 30,
      speedY: Math.random() * 1.5 + 2.5,
      driftX: Math.random() * 0.6 - 0.3,
      angle: Math.random() * Math.PI * 2,
      rotation: Math.random() * 360,
      char: '🏮',
      glowPhase: Math.random() * Math.PI * 2, // start at different pulse angles
    })

    for (let i = 0; i < maxLanterns; i++) {
      lanterns.push(createLantern())
    }

    const drawLantern = (lantern, time) => {
      ctx.save()
      ctx.translate(lantern.x, lantern.y)
      ctx.rotate((lantern.rotation * Math.PI) / 180)

      // Animate glowing halo using sine wave
      const glow = 15 + Math.sin(time / 500 + lantern.glowPhase) * 10
      ctx.shadowBlur = glow
      ctx.shadowColor = 'rgba(255, 150, 50, 0.8)' // orange glow

      ctx.font = `${lantern.size}px serif`
      ctx.fillText(lantern.char, 0, 0)

      ctx.restore()
    }

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      lanterns.forEach((lantern) => {
        lantern.y -= lantern.speedY
        lantern.x += Math.sin(lantern.angle) * lantern.driftX
        lantern.angle += 0.01
        lantern.rotation += 0.2

        // Reset if it floats too high
        if (lantern.y < -50) {
          Object.assign(lantern, createLantern(), { y: canvas.height + 50 })
        }

        drawLantern(lantern, time)
      })

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundColor: '#0d1b2a', // Deep night sky
      }}
    />
  )
}

export default LanternCanvas
