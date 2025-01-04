import React, { useRef, useEffect } from 'react'

const SnowflakesCanvas = () => {
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

    const snowflakes = []
    const maxFlakes = 100

    // Create snowflake particles
    const createFlake = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 5 + 1,
      speed: Math.random() * 2 + 0.5,
    })

    for (let i = 0; i < maxFlakes; i++) {
      snowflakes.push(createFlake())
    }

    // Animate snowflakes
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      snowflakes.forEach((flake) => {
        flake.y += flake.speed
        if (flake.y > canvas.height) {
          flake.y = 0
          flake.x = Math.random() * canvas.width
        }

        ctx.beginPath()
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.fill()
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

export default SnowflakesCanvas
