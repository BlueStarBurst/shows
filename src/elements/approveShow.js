import { useState, useEffect } from "react";
import { Button, Form, FormControl, InputGroup, Modal, Col, Image } from "react-bootstrap";
import { httpPostAsync } from "../assets/serverHandler";

export default function ApproveShow(props) {

    const [src, setSrc] = useState(null);
    const [data, setData] = useState(null);

    const categories = ["Action", "Comedy", "Romance", "Sci-Fi"]

    const widthStyles = {
        width: "max-content",
        height: "max-content",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap"
    }

    const flexStyles = {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        marginRight: "1rem",
        maxWidth: "90%",
        // minWidth: "10vw"
    }

    const picStyle = {
        width: "100%",
        border: "gray 1px dashed",
        marginRight: "1rem",
        backgroundColor: "rgba(128, 128, 128, 0.2)",
        display: "block",
        position: "relative",
        flexGrow: "4"
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
        setSrc(e.target.value)
    }

    function closeModal() {
        setSrc(null)
        props.close();
    }

    useEffect(() => {
        if (props.selected) {
            console.log(props.selected.data)
            var datas = categories.map(e => 0)

            var propData = props.selected.data
            propData.forEach(element => {
                element.forEach((e, i) => {
                    datas[i] = datas[i] + e;
                });
            });

            var dataSet = []

            datas.forEach((e, i) => {
                datas[i] = datas[i] / propData.length;
                console.log("selectedShow" + categories[i])
                dataSet.push(
                    <Form.Group className="mb-3 minCon" style={{ width: "min-content !important", marginRight: "1rem", display: "flex", flexDirection: "row" }}>
                        <InputGroup>
                            <InputGroup.Text className="textNum" style={{ borderRadius: "0.25rem 0.25rem 0 0" }}>{categories[i]}</InputGroup.Text>
                            <FormControl id={"selectedShow" + categories[i]} required className="textNum2" style={{ borderRadius: "0 0 0.25rem 0.25rem" }} defaultValue={datas[i]} />
                        </InputGroup>
                    </Form.Group>)
            });

            setData(dataSet);

        }

    }, [props.selected])

    function submitShow(e) {
        e.preventDefault();
        const name = document.getElementById('selectedShowName').value;
        const img = document.getElementById('selectedShowImg').value;
        const data = categories.map(e => {
            console.log("selectedShow" + e)
            return document.getElementById("selectedShow" + e).value;
        })
        console.log(data);
        httpPostAsync('/approveShow', 'name=' + name + "&data=" + data + "&img=" + img + "&ticket=" + props.selected.name);
        closeModal();
    }

    return (
        <Modal show={props.show} centered onHide={closeModal}>
            <Form onSubmit={submitShow}>
                <Modal.Header style={{ textAlign: "center", paddingLeft: "3rem" }} closeButton>
                    {(props.selected) ? <p className="m-0 w-100">Approve Show</p> : "Approve Show?"}
                </Modal.Header>
                <Modal.Body style={{ borderBottom: "rgb(230, 230, 230) 1px solid" }}>
                    <Form.Group >
                        <InputGroup>
                            <InputGroup.Text>Name</InputGroup.Text>
                            <FormControl id="selectedShowName" required defaultValue={(props.selected) ? props.selected.name : "title"} />
                        </InputGroup>
                    </Form.Group>
                </Modal.Body>
                <Modal.Body style={{ display: "flex", width: "max-contents" }}>
                    <div style={flexStyles}>

                        <Form.Group className="mb-3" style={{ height: "max-content", width: "100%" }}>
                            <InputGroup style={{ width: "100% !important" }}>
                                <InputGroup.Text>URL</InputGroup.Text>
                                <FormControl id="selectedShowImg" required onChange={onImageChange} autoComplete="off" />
                            </InputGroup>
                        </Form.Group>

                        {(src) ? <Image style={img} src={src} /> : <div style={picStyle}>
                        </div>}


                    </div>
                    <Col style={widthStyles}>
                        {data}
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