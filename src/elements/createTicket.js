import { useEffect, useRef, useState } from "react";
import { httpGetAsync, httpPostAsync } from "../assets/serverHandler";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { InputGroup, FormControl, FormLabel, FormSelect } from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';

export default function CreateTicket(props) {



    const [show0, setShow0] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);

    const [currentShow, setCurrentShow] = useState('');


    const handleClose = () => {
        setTestData([-1, -1, -1, -1])
        setFakeFeedBack(true)
        setShow0(false)
        setShow1(false)
        setShow2(false)
    };

    const handleShow = (e, num) => {
        handleClose()
        switch (num) {
            case 0:
                setShow0(true)
                break
            case 1:
                setShow1(true)
                break
            case 2:
                setShow2(true)
                break
            default:
                break
        }
    };

    const [isWarning, setWarning] = useState(false);
    const input = useRef(null);

    function changeList(data) {
        data = JSON.parse(data);

        if (input.current.value.length == 0) {
            return;
        }

        var isDuplicate = false;
        var lists = data[0];
        lists.forEach(element => {
            var option = document.createElement("option")
            option.value = element.name;

            if (input.current.value.toLowerCase() == element.toLowerCase()) {
                isDuplicate = true;
            }
            console.log(element);
        });
        if (isDuplicate) {
            // submitBtn.current.disabled = true;
            setWarning(true);
        } else {
            // submitBtn.current.disabled = false;
            setWarning(false);
        }
    }

    function checkInput() {

        if (input.current.value.length == 0) {
            return;
        }

        httpPostAsync("/autofill", 'str=' + input.current.value, changeList);
    }

    function submit(e) {
        setCurrentShow(input.current.value)
        // httpPostAsync('/addShow', 'name=' + input.current.value)
        handleShow(null, 2)
        // handleClose();
    }



    const [isFakeFeedback, setFakeFeedBack] = useState(true);

    const [testData, setTestData] = useState([-1, -1, -1, -1])
    const [data, setData] = useState([5, 5, 5, 5])
    // ACTION COMEDY ROMANCE SCIFI

    const [toggle, setToggle] = useState(false);

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

    function finish(e, feed = false) {
        if (feed && !isFakeFeedback) {
            httpPostAsync('/createShowRequest', 'name=' + currentShow + '&data=' + data)
        } else {
            httpPostAsync('/createShowRequest', 'name=' + currentShow)
        }
        handleClose();
    }

    return (
        <>
            <a onClick={e => handleShow(e, 0)}>submit a ticket</a>
            <Modal centered show={show0} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a ticket!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormLabel>What do you need help with?</FormLabel>
                    <InputGroup>
                        <FormSelect>
                            <option value="1">Adding a Show</option>
                            <option disabled value="2">Adjusting a Show</option>
                            <option disabled value="3">Requesting a Feature</option>
                            <option disabled value="3">Reporting a Bug D:</option>
                        </FormSelect>
                    </InputGroup>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={e => handleShow(e, 1)}>
                        Next
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal centered show={show1} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a ticket!</Modal.Title>
                </Modal.Header>
                {(isWarning) ? <p className="p-0 mb-0 bg-warning text-white text-center">Sorry! That show has already been added!</p> : null}
                <Modal.Body>

                    <p>Name of the show:</p>
                    <InputGroup className="mb-3">

                        <FormControl id="show"
                            ref={input}
                            onChange={checkInput}
                            placeholder="Title"
                            aria-label="server"
                            autoComplete="off"
                            aria-describedby="basic-addon2"
                            defaultValue={props.tempShow}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={e => handleShow(e, 0)}>
                        Back
                    </Button>
                    <Button disabled={isWarning} variant={(isWarning) ? "danger" : "primary"} id="addShow" onClick={submit}>
                        Next
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal centered show={show2} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Help us know more about {currentShow}!</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <p>Action:</p>
                    <RangeSlider
                        variant={(testData[0] == -1) ? "secondary" : "primary"}
                        min={0}
                        max={10}
                        step={1}
                        value={data[0]}
                        onChange={changeEvent => adjustData(changeEvent, 0)}
                        onClick={changeEvent => adjustData(changeEvent, 0)}
                    />

                    <p>Comedy:</p>
                    <RangeSlider
                        variant={(testData[1] == -1) ? "secondary" : "primary"}
                        min={0}
                        max={10}
                        step={1}
                        value={data[1]}
                        onClick={changeEvent => adjustData(changeEvent, 1)}
                        onChange={changeEvent => adjustData(changeEvent, 1)}
                    />

                    <p>Romance:</p>
                    <RangeSlider
                        variant={(testData[2] == -1) ? "secondary" : "primary"}
                        min={0}
                        max={10}
                        step={1}
                        value={data[2]}
                        onClick={changeEvent => adjustData(changeEvent, 2)}
                        onChange={changeEvent => adjustData(changeEvent, 2)}
                    />

                    <p>Sci-Fi:</p>
                    <RangeSlider
                        variant={(testData[3] == -1) ? "secondary" : "primary"}
                        min={0}
                        max={10}
                        step={1}
                        value={data[3]}
                        onClick={changeEvent => adjustData(changeEvent, 3)}
                        onChange={changeEvent => adjustData(changeEvent, 3)}
                    />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={e => handleShow(e, 1)}>
                        Back
                    </Button>
                    <Button variant="warning" id="addShow" onClick={finish}>
                        Skip Step
                    </Button>
                    {(!isFakeFeedback) ? <Button variant="primary" id="addShow" onClick={e => finish(e, true)} >
                        Submit
                    </Button> : null}
                </Modal.Footer>

                

            </Modal>

            
        </>
    )
}