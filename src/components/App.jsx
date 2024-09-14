import React, { useState, useEffect } from "react";
import { Theme } from "@swc-react/theme";
import { Slider, Collapse } from "antd";
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import Preview from "./Preview.jsx";
import UploadButton from "./UploadButton";
import "./bulma.min.css";
import "./App.css";
import { Button } from "@swc-react/button";

const App = ({ addOnUISdk }) => {
  const [watermark, setWatermark] = useState("");
  const [textSize, setTextSize] = useState(36);
  const [image, setImage] = useState(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [opacity, setOpacity] = useState(100);

  useEffect(() => {
    async function setDim() {
      const pages = await addOnUISdk.app.document.getPagesMetadata({
        range: addOnUISdk.constants.Range.currentPage,
      });
      const { width, height } = pages[0].size;
      setWidth(width);
      setHeight(height);
    }
    setDim();
  }, []);

  async function handleAddToPage() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = "black";
    ctx.font = `${textSize}px Arial`;
    ctx.globalAlpha = opacity / 100;
    ctx.rotate((-30 * Math.PI) / 180);

    if (image !== null) {
      const max = textSize + 80;
      const imgCanvas = document.createElement("canvas");
      const imgCtx = imgCanvas.getContext("2d");

      const aspectRatio = image.width / image.height;
      if (image.width > image.height) {
        imgCanvas.width = max;
        imgCanvas.height = max / aspectRatio;
      } else {
        imgCanvas.height = max;
        imgCanvas.width = max * aspectRatio;
      }
      imgCtx.drawImage(image, 0, 0, imgCanvas.width, imgCanvas.height);
      image.src = imgCanvas.toDataURL();
      await new Promise((res) => setTimeout(res, 0));

      let y = 0;
      const textWidth = ctx.measureText(watermark).width;
      for (let i = 0; i < 50; i++) {
        let x = -width / 2;
        const margin = 50;
        for (let j = 0; j < 50; j++) {
          ctx.fillText(watermark, x, y + image.height / 2 + textSize / 2);
          x += textWidth + margin;
          ctx.drawImage(image, x, y);
          x += image.width + margin;
        }
        y += image.height + margin;
      }
    } else {
      let str = "";
      for (let i = 0; i < 20; i++) {
        str += `${watermark}      `;
      }

      for (let i = 0; i < 100; i++) {
        ctx.fillText(str, -width / 2, i * (textSize + 50));
      }
    }

    canvas.toBlob((blob) => addOnUISdk.app.document.addImage(blob));
  }

  return (
    <Theme theme="express" scale="medium" color="light">
      <div className="container">
        <Preview />
        <Collapse expandIconPosition="right">
          <Collapse.Panel header="Text Options" key="1">
            <div className="option-item">
              <h3>Watermark Text</h3>
              <input
                type="text"
                value={watermark}
                onChange={({ target: { value: e } }) => setWatermark(e)}
              />
            </div>
            <div className="option-item text-slider">
              <h3>Text Size</h3>
              <h3>{textSize}px</h3>
            </div>
            <Slider
              className="slider"
              defaultValue={textSize}
              onChange={(value) => setTextSize(value)}
              tooltip={{ open: false }}
              min={36}
              max={150}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Image Options" key="2">
            <div className="option-item">
              <h3>Icon Upload</h3>
              <UploadButton setImage={setImage} />
            </div>
          </Collapse.Panel>
        </Collapse>

        <div className="opacity-section">
          <div className="text-slider">
            <h1>Opacity</h1>
            <h1>{opacity}%</h1>
          </div>
          <div className="opacity-slider">
            <Slider
              className="slider"
              defaultValue={opacity}
              onChange={(value) => setOpacity(value)}
              tooltip={{ open: false }}
              min={0}
              max={100}
            />
          </div>
        </div>

        <div>
          <Button onClick={handleAddToPage}>Add</Button>
        </div>
      </div>
    </Theme>
  );
};

export default App;

