import { Container, Row } from "react-bootstrap";

export default function Admin(props) {

    const styles = {
        position: "absolute",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "end"
    }

    const reqShows = {
        position: "relative",
        maxHeight: "75vh",
        minHeight: "50vh",
        width: "30vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
        textAlign: "left",
        borderLeft: "1px solid #CED4DA",
        borderTop: "1px solid #CED4DA",
        borderBottom: "1px solid #CED4DA",
        borderRadius: "15px 0 0 15px"
    }

    return(
        <div style={styles}>
            <div style={reqShows}>
                <Row>1</Row>
            </div>
        </div>
    )
} 