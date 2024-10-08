import React, { useEffect, useRef } from 'react';
import "./Preview.css";

export default function Preview({ watermark, textSize, image, opacity, rotation }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const width = 300;  // Fixed preview width
        const height = 300; // Fixed preview height

        if (canvas) {
            const ctx = canvas.getContext('2d');
            canvas.width = width;
            canvas.height = height;

            ctx.clearRect(0, 0, width, height);

            ctx.fillStyle = "black";
            ctx.font = `${textSize}px Arial`;
            ctx.globalAlpha = opacity / 100;

            const textWidth = ctx.measureText(watermark).width;
            const tileSize = Math.max(textWidth, textSize) + 40;

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
        }
    }, [watermark, textSize, image, opacity, rotation]);

    return (
        <div className="preview-container">
            <h1>Page Preview</h1>
            <canvas ref={canvasRef} width={300} height={300} id="previewCanvas" />
        </div>
    );
}
