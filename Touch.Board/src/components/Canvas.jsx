import {useRef, useState, useEffect} from 'react'

export default function Canvas() {
    const canvasRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [lastPoint , setLastPoint] = useState(null)

    // Dynamic canvas resizing
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const resizeCanvas = () => {
            const canvasRect = canvas.getBoundingClientRect()
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight

            const context = canvas.getContext('2d')
            context.lineCap = 'round'
            context.lineJoin = 'round'
            context.lineWidth = 3
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)
        return () => window.removeEventListener('resize', resizeCanvas)
    }, [])

        // Canvas coordinates regardless of resizing
        const getCoordinates = (e) => {
            const canvas = canvasRef.current
            if (!canvas) return null
            const rect = canvas.getBoundingClientRect()
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            }
        }

        // Pointer logic
        const handlePointerDown = (e) => {
            const canvas = canvasRef.current
            if (!canvas) return null
            const coordinates = getCoordinates(e)
            if (!coordinates) return
            setIsDrawing(true)
            setLastPoint(coordinates)

            const context = canvas.getContext('2d')
            context.beginPath()
            context.moveTo(coordinates.x, coordinates.y)
        }
        const handlePointerUp = (e) => {
            setIsDrawing(false)
            setLastPoint(null)
        }
        const handlePointerMove = (e) => {
            const canvas = canvasRef.current
            if (!canvas) return null
            if (!isDrawing || !lastPoint) return
            const coordinates = getCoordinates(e)
            if (!coordinates) return

            const context = canvas.getContext('2d')
            context.beginPath()
            context.moveTo(lastPoint.x, lastPoint.y)
            context.lineTo(coordinates.x, coordinates.y)
            context.stroke()

            setLastPoint(coordinates)
        }
        const clearCanvas = () => {
            const canvas = canvasRef.current
            if (!canvas) return 

            const context = canvas.getContext('2d')
            context.clearReact(0, 0, canvas.width, canvas.height)
        }

        return (
            <div className="flex flex-col items-center justify-center w-full h-full">
                <canvas 
                    ref={canvasRef}
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onPointerMove={handlePointerMove}
                    className="absolute inset-0 w-full h-full bg-white touch-none"
                />
            </div>
        )
}