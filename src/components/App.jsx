// To support: theme="express" scale="medium" color="light"
// import these spectrum web components modules:
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import React, { useState } from 'react';
// To learn more about using "swc-react" visit:
// https://opensource.adobe.com/spectrum-web-components/using-swc-react/
import { Button } from "@swc-react/button";
import { Theme } from "@swc-react/theme";
import UploadButton from "./UploadButton";
import "./bulma.min.css";

  import { Slider } from 'antd';
const App = ({ addOnUISdk }) => {
    const [watermark, setWatermark] = useState("");
  const [textSize, setTextSize] = useState(12);

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
        <Slider
    defaultValue={textSize}
onChange={value => setTextSize(value)}
    tooltip={{
      open: true,
    }}
  />
        <h1> Icon Img </h1>
        <UploadButton/>
        </div>
        
        </Theme>
    );
};

export default App;
