import { useRef, useState } from "react";
import { httpGetAsync, httpPostAsync } from "./serverHandler";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

export default function AddShow(props) {

    const input = useRef(null);
    const submitBtn = useRef(null);
    const [isWarning, setWarning] = useState(false);

    function changeList(lists) {
        while (list.firstChild) {
            list.removeChild(list.firstChild);
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
            list.append(option);
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
            while (list.firstChild) {
                list.removeChild(list.firstChild);
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

                    <p>Woohoo, you're reading this text in a modal!</p>
                    <input ref={input} onChange={checkInput} autoComplete="off" className="input w-100" id="show" list="list" />
                    <datalist id="list">
                    </datalist>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button disabled={isWarning} variant="primary" id="addShow" onClick={submit}>
                        Add Show
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}