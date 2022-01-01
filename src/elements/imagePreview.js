import { useEffect, useRef, useState } from "react"
import { Image } from "react-bootstrap"

var timeout = null;

export default function ImagePreview(props) {

    const ref = useRef(null)
    const [src, setSrc] = useState(null);

    const imgStyle = {
        height: "auto",
        width: "85%",
        paddingLeft: "20%",
        paddingRight: "0%"
    }

    useEffect(() => {
        clearTimeout(timeout);
        ref.current.className = "imgPrevOut"
        timeout = setTimeout(() => {
            ref.current.className = "imgPrevIn"
            setSrc(props.src)
        }, 1000)
    }, [props.src])

    return (
        <Image id="imgPrev" ref={ref} style={imgStyle} src={src} />
    )
}