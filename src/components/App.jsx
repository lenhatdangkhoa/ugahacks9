import React, { useState, useEffect, useRef } from "react";
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
  const [textSize, setTextSize] = useState(12);
  const [image, setImage] = useState(null);
  const watermarkCanvas = useRef(null);

  function generateWatermark() {
    const ctx = watermarkCanvas.current.getContext("2d");
    watermarkCanvas.current.width = 300;
    watermarkCanvas.current.height = 360;
    ctx.fillStyle = "black";
    ctx.fillStyle = "black";
    let size = textSize.toString();
    ctx.font = size + "px Arial";
    ctx.fillText(watermark, 10, 50);
  }

  async function handleAddToPage() {
    const blob = await new Promise((resolve, reject) => {
      watermarkCanvas.current.toBlob((blob) => {
        resolve(blob);
      });
    });
    addOnUISdk.app.document.addImage(blob);
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
        />
        <div>
          <h1> Icon Upload </h1>
          <UploadButton />
        </div>
        <Preview />
        <div>
          <Button onClick={generateWatermark}>Generate</Button>
          <Button onClick={handleAddToPage}>Add</Button>
        </div>
        <div>
          <canvas ref={watermarkCanvas} />
        </div>
      </div>
    </Theme>
  );
};

export default App;
