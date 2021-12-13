import React, { useRef, useState, useEffect } from 'react'
import { render } from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

import './assets/styles.css'

import AddShow from './addShow';
import { Button, Container, FormControl, InputGroup } from 'react-bootstrap';
import { httpGetAsync, httpPostAsync } from "./assets/serverHandler";
import AdjustShow from './adjustShow';
import CreateTicket from './createTicket';

function App() {
    const input = useRef(null);
    const ticket = useRef(null);

    const [findable, setFindable] = useState(false);
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

    useEffect(() => {
        getRandom();
    }, [])

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
        </div>




    )
}


function getAdmin() {
    httpPostAsync("/autofill", 'str=' + input.current.value, changeList);
}

render(<App />, document.getElementById("root"));