import { useEffect, useRef, useState } from "react"
import { Image } from "react-bootstrap"

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
        ref.current.className = "imgPrevOut"
        setTimeout(() => {
            ref.current.className = "imgPrevIn"
            setSrc(props.src)
        }, 1000)
    }, [props.src])

    return (
        <Image ref={ref} style={imgStyle} src={src} />
    )
}