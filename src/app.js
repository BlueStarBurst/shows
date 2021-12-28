import React, { useRef, useState, useEffect } from 'react'
import { render } from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

import './assets/styles.css'

// import AddShow from './elements/addShow';
import { Button, Container, Form, FormControl, FormLabel, Image, InputGroup, Modal, Row } from 'react-bootstrap';
import { httpGetAsync, httpPostAsync } from "./assets/serverHandler";
import AdjustShow from './elements/adjustShow';
import CreateTicket from './elements/createTicket';

import adminImageSrc from './assets/img/corgi.png'
import SearchShows from './elements/searchShows';
import ImagePreview from './elements/imagePreview';

function App() {
    const input = useRef(null);
    const adminImg = useRef(null);
    const adminInputU = useRef(null);
    const adminInputP = useRef(null);
    const ticket = useRef(null);

    const [findable, setFindable] = useState(false);
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [currentShow, setCurrentShow] = useState('');
    const [currentIn, setCurrentIn] = useState('');
    const [showExpiredModal, setShowExpiredModal] = useState(localStorage.getItem("session") == "expired");
    const [randomShow, setRandomShow] = useState('');
    const [selectedImageSrc, setSelectedImageSrc] = useState(null);

    function changeList(data) {
        data = JSON.parse(data);

        while (findList.firstChild) {
            findList.removeChild(findList.firstChild);
        }
        if (input.current.value.length == 0) {
            return;
        }

        var isDuplicate = false;
        var lists = data[0];

        if (lists.length == 0) {
            setFindable(false);
            return;
        }

        lists.forEach(element => {
            var option = document.createElement("option")
            option.value = element.name;

            if (element.name.toLowerCase() == input.current.value.toLowerCase()) {
                setCurrentShow(element.name)
                isDuplicate = true;
            }
            findList.append(option);
        });

        setFindable(isDuplicate)

        if (isDuplicate) {
            ticket.current.className = "hide";
        } else {
            ticket.current.className = "show";
        }
    }

    function checkInput() {

        setCurrentIn(input.current.value)

        if (input.current.value.length == 0) {
            // ticket.current.className = "hide";
            while (findList.firstChild) {
                findList.removeChild(findList.firstChild);
            }
            return;
        }

        httpPostAsync("/autofill", 'str=' + input.current.value, changeList);
    }

    function getRandom() {
        httpPostAsync("/autofill", 'str=' + '', (data) => {
            data = JSON.parse(data)
            setRandomShow(data[(Math.random() * data.length) | 0].name)
        });
    }

    function handleClose(e) {
        setShowAdminModal(false);
    }

    function handleCloseExpired(e) {
        localStorage.setItem("session", null)
        setShowExpiredModal(false);
    }

    function handleShow(e) {
        setShowAdminModal(true);
    }

    useEffect(() => {
        getRandom();
    }, [])

    function adminMouseEnter(e) {
        adminImg.current.className = "showAdminImg"
        // console.log("enter")
    }

    function adminMouseLeave(e) {
        adminImg.current.className = "hideAdminImg"
        // console.log("leave")
    }

    function handleReport(data) {

        // httpGetAsync("/admin", '', console.log)
        setShowAdminModal(false);
        localStorage.setItem("session", data)
        console.log(data)
        document.getElementsByClassName("midItem")[0].className = "midItemOut"

        setTimeout(() => {
            window.location.href = window.location.origin + "/admin"
        }, 2000)

    }

    function handleError(error) {
        console.log("error")
        setShowAdminModal(false);
    }

    function getAdmin(e) {
        e.preventDefault();
        var time = (document.getElementById("remember").checked) ? 60 : 1;
        time = time * 60000;
        httpPostAsync("/login", 'user=' + adminInputU.current.value + '&pass=' + adminInputP.current.value + '&time=' + time, handleReport, handleError);
    }

    const styles = {
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
        verticalAlign: "center",
        height: "100vh",
        width: "100vw"
    }

    const styleRow = {
        display: "flex-inline",
        alignContent: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        textAlign: "center",
        alignItems: "center",
        verticalAlign: "center",
        width: "100%"
    }

    const item = {
        width: "max-content"
    }

    return (
        <div style={styles}>

            <Row style={styleRow}>
                <div style={item}>
                    <ImagePreview src={selectedImageSrc} />
                </div>
                <div style={item} className='midItem'>
                    <SearchShows setSrc={setSelectedImageSrc} />
                </div>
                <div style={item}>

                </div>
            </Row>



            <Modal show={showAdminModal} size='sm' centered onHide={handleClose}>
                <Form onSubmit={getAdmin}>
                    <Modal.Header closeButton>
                        Admin Login
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicUser">
                            <InputGroup>
                                <InputGroup.Text id="basic-addon1">User</InputGroup.Text>
                                <FormControl placeholder='Username' autoComplete='username' ref={adminInputU} />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPass">
                            <InputGroup>
                                <InputGroup.Text id="basic-addon1">Pass</InputGroup.Text>
                                <FormControl placeholder='Password' type='password' autoComplete='password' ref={adminInputP} />
                            </InputGroup>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check id="remember" type="checkbox" label="Remember me!" />
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant='primary' >
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <div className='admin' onMouseEnter={adminMouseEnter} onMouseLeave={adminMouseLeave} onClick={handleShow}>
                <Image ref={adminImg} className='hideAdminImg' src={adminImageSrc}>

                </Image>
            </div>

            <Modal centered show={showExpiredModal} onHide={handleCloseExpired} >
                <Modal.Header closeButton>
                    Notice
                </Modal.Header>
                <Modal.Body>
                    Your session has expired!
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant='primary' onClick={handleCloseExpired} >
                        Cool
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    )
}

render(<App />, document.getElementById("root"));

function useKeyPress(targetKey) {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState(false);
    // If pressed key is our target key then set to true
    function downHandler({ key }) {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }
    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };
    // Add event listeners
    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    }, []); // Empty array ensures that effect is only run on mount and unmount
    return keyPressed;
}