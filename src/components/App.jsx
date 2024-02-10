// To support: theme="express" scale="medium" color="light"
// import these spectrum web components modules:
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import React, { useState } from 'react';
// To learn more about using "swc-react" visit:
// https://opensource.adobe.com/spectrum-web-components/using-swc-react/
import { Button } from "@swc-react/button";
import { Theme } from "@swc-react/theme";
import "./bulma.min.css";
import { NumberInput, Slider } from '@mantine/core';
const App = ({ addOnUISdk }) => {
    const [watermark, setWatermark] = useState("");
  const [textSize, setTextSize] = useState(1);

    return (
        // Please note that the below "<Theme>" component does not react to theme changes in Express.
        // You may use "addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
        <Theme theme="express" scale="medium" color="light">
            <div className="container">
        <h1> Watermark Name </h1>
        <input type="text"
          placeholder="Name"
          value = {watermark}
          onChange={({ target : {value : e}}) => {
            setWatermark(e);
          }}
        />
        <div>{watermark}</div>

        <NumberInput
          value={textSize}
          onChange{setTextSize}
          label="Watermark Text Size"
          step={1}
          min={1}
          max={100}
          hideControls
        />
        <Slider
          step={1}
          min={1}
          max={100}
          value={textSize}
          onChange={setTextSize}
          size={2}

        />
            </div>
        </Theme>
    );
};

export default App;
