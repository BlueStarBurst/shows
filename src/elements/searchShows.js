import React, { useRef, useState, useEffect } from 'react'
import { render } from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

import '../assets/styles.css'

import { Button, Container, Form, FormControl, FormLabel, Image, InputGroup, Modal, Row } from 'react-bootstrap';
import { httpGetAsync, httpPostAsync } from "../assets/serverHandler";
import AdjustShow from './adjustShow';
import CreateTicket from './createTicket';

import adminImageSrc from '../assets/img/corgi.png'

export default function SearchShows(props) {
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

    function changeList(data) {
        var data = JSON.parse(data)
        while (findList.firstChild) {
            findList.removeChild(findList.firstChild);
        }
        if (input.current.value.length == 0) {
            props.setSrc(null);
            setFindable(false);
            return;
        }

        var isDuplicate = false;

        var lists = data[0];

        if (!lists) {
            ticket.current.className = "show";
            props.setSrc(null);
            setFindable(false);
            return;
        }

        props.setSrc(data[1]);
        lists.forEach(element => {
            var option = document.createElement("option")
            option.value = element;

            if (element.toLowerCase() == input.current.value.toLowerCase()) {
                setCurrentShow(element)
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
            props.setSrc(null);
            setFindable(false);
            return;
        }

        httpPostAsync("/autofill", 'str=' + input.current.value, changeList);
    }

    function getRandom() {
        httpPostAsync("/autofill", 'str=' + '', (data) => {
            data = JSON.parse(data)[0]
            console.log(data)
            setRandomShow(data[(Math.random() * data.length) | 0])
        });
    }

    useEffect(() => {
        console.log(randomShow)
    }, [randomShow])

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
        httpGetAsync("/admin", '', console.log)
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
        httpPostAsync("/login", 'user=' + adminInputU.current.value + '&pass=' + adminInputP.current.value + '&time=100', handleReport, handleError);
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
        <>
            <div>
                <p>Find me a <a>show</a> like...</p>
                <InputGroup className='m-auto' style={{ zIndex: "100", maxWidth: "400px" }}>
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
        </>
    )
}