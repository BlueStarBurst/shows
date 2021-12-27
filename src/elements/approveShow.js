import { useState } from "react";
import { Button, Form, FormControl, InputGroup, Modal, Col, Image } from "react-bootstrap";

export default function ApproveShow(props) {

    const [src, setSrc] = useState(null);

    const widthStyles = {
        width: "max-content"
    }

    const picStyle = {
        width: "max-content",
        border: "gray 1px dashed",
        marginRight: "1rem",
        backgroundColor: "rgba(128, 128, 128, 0.2)",
        textAlign: "center",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    }

    const nex = {
        width: "auto",
        height: "auto",
        maxHeight: "600px",
        maxWidth: "50%",
        display: "block",
        position: "relative",
        marginRight: "1rem",
    }

    const img = {
        maxWidth: "100%",
        maxHeight: "100%",
        width: "auto",
        height: "100%",
        border: "rgb(121, 239, 119) 1px dashed",
        position: "relative",
        objectFit: "cover"
    }

    const input = {
        position: "absolute",
        width: "100%",
        height: "100%",
        cursor: "pointer",
        opacity: "0",
        zIndex: "100"
    }

    function onImageChange(e) {
        console.log(e)
        setSrc(URL.createObjectURL(e.target.files[0]))
    }

    function closeModal() {
        setSrc(null)
        props.close();
    }

    return (
        <Modal show={props.show} centered onHide={closeModal} size="lg">
            <Form>
                <Modal.Header style={{textAlign: "center", paddingLeft: "3rem"}} closeButton>
                    {(props.selected) ? <p className="m-0 w-100">Approve <i>{props.selected.name}</i>?</p> : "Approve Show?"}
                </Modal.Header>
                <Modal.Body style={{ display: "flex" }}>
                    {(src) ? <div style={nex}>
                        <input onChange={onImageChange} accept="image/*" style={input} type="file" id="logo" />
                        <Image style={img} src={src} />
                    </div> :
                        <Col style={picStyle}>
                            <input onChange={onImageChange} accept="image/*" style={input} type="file" id="logo" />
                            <p>Insert Photo Here!</p>
                        </Col>}
                    <Col style={widthStyles}>
                        <Form.Group className="mb-3">
                            <InputGroup>
                                <InputGroup.Text>Action</InputGroup.Text>
                                <FormControl/>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <InputGroup>
                                <InputGroup.Text>Comedy</InputGroup.Text>
                                <FormControl/>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <InputGroup>
                                <InputGroup.Text>Romance</InputGroup.Text>
                                <FormControl/>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-0">
                            <InputGroup>
                                <InputGroup.Text>Sci-Fi</InputGroup.Text>
                                <FormControl/>
                            </InputGroup>
                        </Form.Group>
                    </Col>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={props.close}>
                        Delete
                    </Button>
                    <Button type="submit" variant='success' >
                        Approve
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}