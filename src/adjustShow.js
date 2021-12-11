import { useRef, useState } from "react";
import { httpGetAsync, httpPostAsync } from "./serverHandler";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { InputGroup, FormControl } from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';

export default function AdjustShow(props) {

    const [isWarning, setWarning] = useState(false);
    const [action, setAction] = useState(5);
    const [comedy, setComedy] = useState(5);
    const [scifi, setScifi] = useState(5);


    const [show, setShow] = useState(false);

    const handleClose = () => {
        setWarning(false);
        setShow(false)
    };
    const handleShow = () => setShow(true);

    return (
        <>
            <Button disabled={props.disabled} variant="primary" onClick={handleShow}>
                Find
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Help us know more!</Modal.Title>
                </Modal.Header>
                {(isWarning) ? <p className="p-0 mb-0 bg-warning text-white text-center">Sorry! That show has already been added!</p> : null}
                <Modal.Body>

                    <p>Action:</p>
                    <RangeSlider
                        min={0}
                        max={10}
                        step={1}
                        value={action}
                        onChange={changeEvent => setAction(changeEvent.target.value)}
                    />

                    <p>Comedy:</p>
                    <RangeSlider
                        min={0}
                        max={10}
                        step={1}
                        value={comedy}
                        onChange={changeEvent => setComedy(changeEvent.target.value)}
                    />

                    <p>Sci-Fi:</p>
                    <RangeSlider
                        min={0}
                        max={10}
                        step={1}
                        value={scifi}
                        onChange={changeEvent => setScifi(changeEvent.target.value)}
                    />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button disabled={isWarning} variant={(isWarning) ? "danger" : "primary"} id="addShow" >
                        Next
                    </Button>
                </Modal.Footer>
            </Modal>
        </>






    );

}