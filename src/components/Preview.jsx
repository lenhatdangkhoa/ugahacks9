import React, {useState , useEffect} from 'react'
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js"
import "./Preview.css"

export default function Preview() {
    /**
     * Displays a preview of the watermark
     * on the current image
     */
    const [image, setImage] = useState(null)
    async function getCanvas () {
        const response  = await addOnUISdk.app.document.createRenditions({
                range:"currentPage",
                format:"image/jpeg",
        }, addOnUISdk.constants.RenditionIntent.preview)   
        return URL.createObjectURL(response[0].blob)
    }
    async function loadImage() {
        const imageURL = await getCanvas()
        setImage(imageURL)
    }
    useEffect(() => {
        loadImage()
    },[image])
    return (
        <div>
            <h1>
                This is a preview</h1> 
            <img src={image} alt="Preview" id="previewImg"/>
            <div>

            <button onClick={(e) => loadImage()}>Change</button>
            </div>
        </div>

    )
}