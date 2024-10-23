import React, { useEffect, useRef } from 'react';
import "./Preview.css";

export default function Preview({ watermark, textSize, image, opacity, rotation, width, height, selectedFont }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !width || !height) return;

        // Calculate preview dimensions while maintaining aspect ratio
        const maxPreviewWidth = 250; // Reduced size to fit better
        const aspectRatio = width / height;
        const previewWidth = maxPreviewWidth;
        const previewHeight = previewWidth / aspectRatio;

        // Set canvas dimensions
        canvas.width = previewWidth;
        canvas.height = previewHeight;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, previewWidth, previewHeight);

        // Scale the context to match preview size
        const scaleX = previewWidth / width;
        const scaleY = previewHeight / height;
        ctx.scale(scaleX, scaleY);

        ctx.fillStyle = "black";
        ctx.font = `${textSize}px ${selectedFont}`;
        ctx.globalAlpha = opacity / 100;

        const textWidth = ctx.measureText(watermark).width;
        const tileSize = Math.max(textWidth, textSize) + 40;

        // Match the same pattern as handleAddToPage
        for (let y = -tileSize / 2; y < height + tileSize; y += tileSize) {
            for (let x = -tileSize / 2; x < width + tileSize; x += tileSize) {
                ctx.save();
                ctx.translate(x + tileSize / 2, y + tileSize / 2);
                ctx.rotate((rotation * Math.PI) / 180);
                ctx.translate(-(x + tileSize / 2), -(y + tileSize / 2));

                ctx.fillText(watermark, x, y);

                if (image) {
                    const iconSize = textSize * 1.5;
                    ctx.drawImage(image, x + textWidth + 10, y - textSize / 2, iconSize, iconSize);
                }
                ctx.restore();
            }
        }
    }, [watermark, textSize, image, opacity, rotation, width, height, selectedFont]);

    return (
        <div className="preview-container">
            <h1>Page Preview</h1>
            <canvas 
                ref={canvasRef}
                style={{ 
                    width: '250px',
                    height: 'auto',
                    border: '1px solid #ccc',
                    backgroundColor: 'white'
                }}
                id="previewCanvas"
            />
        </div>
    );
}
