import React, { useEffect, useRef } from 'react';
import "./Preview.css";

const Preview = ({
    watermark,
    textSize,
    image,
    opacity,
    rotation,
    width,
    height,
    selectedFont,
}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasWidth = width;  // Use the provided width
        const canvasHeight = height; // Use the provided height

        if (canvas) {
            const ctx = canvas.getContext('2d');
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            ctx.fillStyle = "black";
            ctx.font = `${textSize}px ${selectedFont}`; // Use the selected font here
            ctx.globalAlpha = opacity / 100;

            const textWidth = ctx.measureText(watermark).width;
            const tileSize = Math.max(textWidth, textSize) + 40;

            for (let y = -tileSize / 2; y < canvasHeight + tileSize; y += tileSize) {
                for (let x = -tileSize / 2; x < canvasWidth + tileSize; x += tileSize) {
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
    }, [watermark, textSize, image, opacity, rotation, width, height, selectedFont]);

    return (
        <div className="preview-container">
            <h1>Page Preview</h1>
            <canvas ref={canvasRef} width={width} height={height} id="previewCanvas" />
        </div>
    );
};

export default Preview;
