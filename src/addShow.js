import { useRef, useState } from "react";
import { httpGetAsync, httpPostAsync } from "./serverHandler";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { InputGroup, FormControl } from "react-bootstrap";
import RangeSlider from 'react-bootstrap-range-slider';

export default function AddShow(props) {

    const input = useRef(null);
    const submitBtn = useRef(null);
    const [isWarning, setWarning] = useState(false);
    const [action, setAction] = useState(5);
    const [comedy, setComedy] = useState(5);
    const [scifi, setScifi] = useState(5);

    function changeList(lists) {
        while (addList.firstChild) {
            addList.removeChild(addList.firstChild);
        }
        if (input.current.value.length == 0) {
            return;
        }

        var isDuplicate = false;
        lists = JSON.parse(lists);
        lists.forEach(element => {
            var option = document.createElement("option")
            option.value = element.name;

            if (input.current.value.toLowerCase() == element.name.toLowerCase()) {
                isDuplicate = true;
            }
            addList.append(option);
            console.log(element.name);
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
            while (addList.firstChild) {
                addList.removeChild(list.firstChild);
            }
            return;
        }

        httpPostAsync("/autofill", 'str=' + input.current.value, changeList);
    }

    function submit() {
        httpPostAsync('/addShow', 'name=' + input.current.value)
        input.current.value = "";
        handleClose();
    }

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setWarning(false);
        setShow(false)
    };
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Show
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Show to our Collection!</Modal.Title>
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
                            list="addList"
                            autoComplete="off"
                            aria-describedby="basic-addon2"
                        />
                    </InputGroup>
                    <datalist id="addList">
                    </datalist>

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
                    <Button disabled={isWarning} variant={(isWarning) ? "danger": "primary"}  id="addShow" onClick={submit}>
                        Next
                    </Button>
                </Modal.Footer>
            </Modal>

            
        </>
    );

}