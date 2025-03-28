import React, { useRef, useEffect } from 'react'

const HeartsCanvas = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Ensure canvas fills the screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const hearts = []
    const maxHearts = 100

    // Create heart shape
    const createHeart = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 2 + 0.5,
      rotation: Math.random() * 360, // Random rotation for hearts
    })

    for (let i = 0; i < maxHearts; i++) {
      hearts.push(createHeart())
    }

    // Draw heart shape
    const drawHeart = (x, y, size, rotation) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate((rotation * Math.PI) / 180)
      ctx.beginPath()

      const topCurveHeight = size * 0.3

      // Left half of the heart
      ctx.moveTo(0, 0)
      ctx.bezierCurveTo(
        -size / 2,
        -topCurveHeight,
        -size,
        topCurveHeight,
        0,
        size
      )
      // Right half of the heart
      ctx.bezierCurveTo(size, topCurveHeight, size / 2, -topCurveHeight, 0, 0)

      ctx.fillStyle = '#ff4d6d' // Heart color
      ctx.fill()
      ctx.restore()
    }

    // Animate hearts falling
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      hearts.forEach((heart) => {
        heart.y += heart.speed
        heart.rotation += 1

        if (heart.y > canvas.height) {
          heart.y = 0
          heart.x = Math.random() * canvas.width
        }

        drawHeart(heart.x, heart.y, heart.size, heart.rotation)
      })

      requestAnimationFrame(animate)
    }

    animate()

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
        backgroundColor: '#0d47a1', // Optional: Change the background color
      }}
    />
  )
}

export default HeartsCanvas
