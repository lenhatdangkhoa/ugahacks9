import React, {useState , useEffect} from 'react'
import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js"
import "./Preview.css"

export default function Preview() {
    const [image, setImage] = useState(null)
    async function getCanvas () {
        const response  = await addOnUISdk.app.document.createRenditions({
                range:"currentPage",
                format:"image/jpeg",
        })   
        return URL.createObjectURL(response[0].blob)
    }
    async function loadImage() {
        const imageURL = await getCanvas()
        setImage(imageURL)
        console.log(image)
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