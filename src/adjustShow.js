import { useEffect, useRef, useState } from "react";
import { httpGetAsync, httpPostAsync } from "./serverHandler";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { InputGroup, FormControl } from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';

export default function AdjustShow(props) {

    const [isWarning, setWarning] = useState(false);
    const [isFakeFeedback, setFakeFeedBack] = useState(true);

    const [testData, setTestData] = useState([-1, -1, -1, -1])
    const [data, setData] = useState([5, 5, 5, 5])
    // ACTION COMEDY ROMANCE SCIFI


    const [show, setShow] = useState(false);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        console.log(props.disabled)
    }, [props])

    const handleClose = () => {
        setWarning(false);
        setShow(false)
        setTestData([-1, -1, -1, -1])
        setFakeFeedBack(true)
    };

    const handleShow = () => setShow(true);

    function adjustData(changeEvent, num) {
        var temp = data;
        var temp2 = testData;
        temp[num] = changeEvent.target.value
        temp2[num] = changeEvent.target.value
        setData(temp)
        setTestData(temp2)

        if (!testData.includes(-1)) {
            setFakeFeedBack(false);
        }

        setToggle(!toggle)
    }

    return (
        <>
            <Button disabled={props.disabled} variant="primary" onClick={handleShow}>
                Find
            </Button>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Help us know more about {props.currentShow}!</Modal.Title>
                </Modal.Header>
                {/* {(isWarning) ? <p className="p-0 mb-0 bg-warning text-white text-center">Sorry! That show has already been added!</p> : null} */}
                <Modal.Body>

                    <p>Action:</p>
                    <RangeSlider
                        variant={(testData[0] == -1) ? "secondary" : "primary"}
                        min={0}
                        max={10}
                        step={1}
                        value={data[0]}
                        onChange={changeEvent => adjustData(changeEvent, 0)}
                    />

                    <p>Comedy:</p>
                    <RangeSlider
                        variant={(testData[1] == -1) ? "secondary" : "primary"}
                        min={0}
                        max={10}
                        step={1}
                        value={data[1]}
                        onChange={changeEvent => adjustData(changeEvent, 1)}
                    />

                    <p>Romance:</p>
                    <RangeSlider
                        variant={(testData[2] == -1) ? "secondary" : "primary"}
                        min={0}
                        max={10}
                        step={1}
                        value={data[2]}
                        onChange={changeEvent => adjustData(changeEvent, 2)}
                    />

                    <p>Sci-Fi:</p>
                    <RangeSlider
                        variant={(testData[3] == -1) ? "secondary" : "primary"}
                        min={0}
                        max={10}
                        step={1}
                        value={data[3]}
                        onChange={changeEvent => adjustData(changeEvent, 3)}
                    />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant={(isFakeFeedback) ? "warning" : "primary"} id="addShow" >
                        {(!isFakeFeedback) ? "Next" : "Skip"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>






    );

}