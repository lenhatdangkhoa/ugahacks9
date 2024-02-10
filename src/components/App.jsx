import React, { useState } from "react";
import { Theme } from "@swc-react/theme";
import { Slider } from "antd";
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import Preview from "./Preview.jsx";
import UploadButton from "./UploadButton";
import "./bulma.min.css";
import "./App.css";
const App = ({ addOnUISdk }) => {
/* 
This application generates a watermark template
 according to the user's input.
taking in a text and image parameter. 
The user can also adjust the size of the text
 */
  const [watermark, setWatermark] = useState("");
  const [textSize, setTextSize] = useState(12);

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
      </div>
    </Theme>
  );
};

export default App;
