import React, { useRef, useState, useEffect } from 'react'
import { render } from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

import '../assets/styles.css'

import AddShow from './addShow';
import { Button, Container, Form, FormControl, FormLabel, Image, InputGroup, Modal } from 'react-bootstrap';
import { httpGetAsync, httpPostAsync } from "../assets/serverHandler";
import AdjustShow from './adjustShow';
import CreateTicket from './createTicket';

import adminImageSrc from '../assets/img/corgi.png'

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
    const [randomShow, setRandomShow] = useState('');

    function changeList(lists) {
        while (findList.firstChild) {
            findList.removeChild(findList.firstChild);
        }
        if (input.current.value.length == 0) {
            return;
        }

        var isDuplicate = false;
        lists = JSON.parse(lists);
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
        // window.location.href = "https://localhost/admin"
        httpGetAsync("/admin",'',console.log)
        console.log(data)
    }

    function handleError(error) {
        console.log("error")
        setShowAdminModal(false);
    }

    function getAdmin(e) {
        e.preventDefault();
        // console.log(adminInputP.current.value)
        localStorage.setItem("data", JSON.stringify([adminInputU.current.value, adminInputP.current.value]))
        httpPostAsync("/login", 'user=' + adminInputU.current.value + '&pass=' + adminInputP.current.value, handleReport, handleError);
    }

    return (

        <div style={{ display: "flex", alignContent: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", alignItems: "center", verticalAlign: "center", height: "100vh" }}>
            <div>
                <p>Find me a show like...</p>
                <InputGroup className='m-auto' style={{ zIndex: "100" }}>
                    <FormControl ref={input} onChange={checkInput} list="findList" placeholder={randomShow} />
                    <datalist id="findList">
                    </datalist>
                    <AdjustShow disabled={!findable} currentShow={currentShow} />
                </InputGroup>
            </div>
            <br />
            <div className='hide' ref={ticket} >
                <p>Can't find what you're looking for? <CreateTicket tempShow={currentIn} /></p>
            </div>
            <Modal show={showAdminModal} centered onHide={handleClose}>
                <Form onSubmit={getAdmin}>
                    <Modal.Header closeButton>
                        Admin Login
                    </Modal.Header>
                    <Modal.Body>

                        <InputGroup>
                            <InputGroup.Text id="basic-addon1">User</InputGroup.Text>
                            <FormControl placeholder='Username' autoComplete='username' ref={adminInputU} />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <InputGroup.Text id="basic-addon1">Pass</InputGroup.Text>
                            <FormControl placeholder='Password' type='password' autoComplete='password' ref={adminInputP} />
                        </InputGroup>


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