import React, { useState, useEffect } from "react";
import { Theme } from "@swc-react/theme";
import { Slider } from "antd";
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import Preview from "./Preview.jsx";
import UploadButton from "./UploadButton";
import "./bulma.min.css";
import "./App.css";
import { Button } from "@swc-react/button";

const App = ({ addOnUISdk }) => {
    /*
  This application generates a watermark template
   according to the user's input.
  taking in a text and image parameter.
  The user can also adjust the size of the text
   */
    const [watermark, setWatermark] = useState("");
    const [textSize, setTextSize] = useState(36);
    const [image, setImage] = useState(null);
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        async function setDim() {
            const pages = await addOnUISdk.app.document.getPagesMetadata({ range: addOnUISdk.constants.Range.currentPage })
            const { width, height } = pages[0].size
            setWidth(width)
            setHeight(height)
        }
        setDim()
    }, [])

    async function handleAddToPage() {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")
        canvas.width = width;
        canvas.height = height;
        ctx.fillStyle = "black";
        ctx.font = `${textSize.toString()}px Arial`
        ctx.rotate(-30 * Math.PI / 180);

        if (image !== null) {
            let y = 0
            for (let i = 0; i < 50; i++) {
                let x = -width / 2
                let margin = 50;
                for (let j = 0; j < 50; j++) {
                    ctx.fillText(watermark, x, y + image.naturalHeight / 2)
                    x += textSize * watermark.length / 1.5
                    ctx.drawImage(image, x, y)
                    x += image.naturalWidth + margin
                }
                y += image.naturalHeight + margin
            }
        } else {
            let str = ""
            for (let i = 0; i < 20; i++) {
                str += `${watermark}      `
            }

            for (let i = 0; i < 100; i++) {
                ctx.fillText(str, -width / 2, i * (textSize + 50));
            }
        }

        canvas.toBlob(blob => addOnUISdk.app.document.addImage(blob))
    }

    return (
        <Theme theme="express" scale="medium" color="light">
            <div className="container">
                <div>
                    <h1> Watermark Text</h1>
                    <input
                        type="text"
                        value={watermark}
                        onChange={({ target: { value: e } }) => {
                            setWatermark(e);
                        }}
                    />
                </div>
                <div className="text-slider">
                    <h1> Text Size</h1>
                    <h1 className="left"> {textSize}px</h1>
                </div>
                <Slider
                    className="slider"
                    defaultValue={textSize}
                    onChange={(value) => setTextSize(value)}
                    tooltip={{
                        open: false,
                    }}
                    min={36}
                    max={150}
                />
                <div>
                    <h1> Icon Upload </h1>
                    <UploadButton setImage={setImage} />
                </div>
                <Preview />
                <div>
                    <Button onClick={handleAddToPage}>Add</Button>
                </div>
            </div>
        </Theme>
    );
};

export default App;
