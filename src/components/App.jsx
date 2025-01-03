import React, { useState, useEffect } from "react";
import { Theme } from "@swc-react/theme";
import { Slider, Collapse, Select } from "antd";
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
  const [opacity, setOpacity] = useState(35);
  const [rotation, setRotation] = useState(-30);
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [fontColour, setFontColour] = useState("#808080");

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

  const handleFontColourChange = (value) => {
    if (!value.startsWith("#")) {
      setFontColour(`#${value}`);
    } else {
      setFontColour(value);
    }
  };

  async function handleAddToPage() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = fontColour;
    ctx.font = `${textSize}px ${selectedFont}`;
    ctx.globalAlpha = opacity / 100;

    const textWidth = ctx.measureText(watermark).width;
    const tileSize = Math.max(textWidth, textSize) + 40;

    for (let y = -tileSize / 2; y < canvas.height + tileSize; y += tileSize) {
      for (let x = -tileSize / 2; x < canvas.width + tileSize; x += tileSize) {
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

    canvas.toBlob((blob) => addOnUISdk.app.document.addImage(blob));
  }

  return (
    <Theme theme="express" scale="medium" color="light">
      <div className="container">
        <Preview
          watermark={watermark}
          textSize={textSize}
          image={image}
          opacity={opacity}
          rotation={rotation}
          width={width}
          height={height}
          selectedFont={selectedFont}
          fontColour={fontColour}
        />
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
              min={1}
              max={150}
            />

            <div className="option-item text-slider" style={{ marginTop: "10px", marginBottom: "10px" }}>
              <h3>Font Colour</h3>
              <input
                type="text"
                value={fontColour}
                onChange={({ target: { value } }) => handleFontColourChange(value)}
                style={{ marginLeft: "10px", width: "80px" }}
              />
            </div>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <input
                type="color"
                value={fontColour}
                onChange={({ target: { value } }) => setFontColour(value)}
              />
            </div>

            <div className="option-item">
              <h3>Font</h3>
              <Select
                style={{ width: "100%" }}
                value={selectedFont}
                onChange={(value) => setSelectedFont(value)}
                options={[
                  { value: "Arial", label: "Arial" },
                  { value: "Helvetica", label: "Helvetica" },
                  { value: "Times New Roman", label: "Times New Roman" },
                  { value: "Courier", label: "Courier" },
                  { value: "Verdana", label: "Verdana" },
                  { value: "Georgia", label: "Georgia" },
                  { value: "Palatino", label: "Palatino" },
                  { value: "Garamond", label: "Garamond" },
                  { value: "Bookman", label: "Bookman" },
                  { value: "Comic Sans MS", label: "Comic Sans MS" },
                  { value: "Trebuchet MS", label: "Trebuchet MS" },
                  { value: "Arial Black", label: "Arial Black" },
                ]}
              />
            </div>
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

        <div className="rotation-section">
          <div className="text-slider">
            <h1>Rotation</h1>
            <h1>{rotation}°</h1>
          </div>
          <div className="rotation-slider">
            <Slider
              className="slider"
              defaultValue={rotation}
              onChange={(value) => setRotation(value)}
              tooltip={{ open: false }}
              min={-90}
              max={90}
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
