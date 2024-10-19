const { useRef, useEffect, useState } = React

export function NoteCanvas({ note, readOnly, onSaveCanvas, noteTitle }) {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)

    const [isDrawing, setIsDrawing] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = 200
        canvas.height = 200

        const context = canvas.getContext('2d')
        context.lineCap = 'round'
        context.strokeStyle = 'black'
        context.lineWidth = 5
        contextRef.current = context

        if (note && note.info.url) {
            const img = new Image()
            img.src = note.info.url
            img.onload = () => context.drawImage(img, 0, 0, canvas.width, canvas.height)
        }
    }, [note])

    function startDrawing({ nativeEvent }) {
        const { offsetX, offsetY } = nativeEvent
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }

    function draw({ nativeEvent }) {
        if (!isDrawing) return

        const { offsetX, offsetY } = nativeEvent
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
    }

    function stopDrawing() {
        contextRef.current.closePath()
        setIsDrawing(false)
    }

    function setToDraw() {
        contextRef.current.globalCompositeOperation = 'source-over'
    }

    function setToErase() {
        contextRef.current.globalCompositeOperation = 'destination-out'
    }

    function saveCanvasToNote() {
        const dataURL = canvasRef.current.toDataURL()
        onSaveCanvas(dataURL)
    }

    if (readOnly) {
        const title = note.info.title || noteTitle
        return (
            <div className="canvas-note">
                {title && <h3>{title}</h3>}
                <canvas ref={canvasRef} />
            </div>
        )
    }

    return (
        <div className="canvas-note">
            <canvas
                className="canvas-container"
                id={note && note.id ? note.id : ''}
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            ></canvas>
            <div className="canvas-btns">
                <span className="material-symbols-outlined" onClick={setToDraw} title="Draw">
                    stylus_note
                </span>
                <span className="material-symbols-outlined" onClick={setToErase} title="Erase">
                    ink_eraser
                </span>
                <span className="material-symbols-outlined" onClick={saveCanvasToNote} title="Save before close">
                    save
                </span>
            </div>
        </div>
    )
}
