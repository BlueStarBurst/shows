import React, { useRef, useState } from 'react'
import { render } from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

import AddShow from './addShow';
import { Button, Container, FormControl, InputGroup } from 'react-bootstrap';
import { httpGetAsync, httpPostAsync } from "./serverHandler";
import AdjustShow from './adjustShow';

function App() {
    const input = useRef(null);

    const [findable, setFindable] = useState(false);

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
            if (element.name == input.current.value) {
                isDuplicate = true;
            }
            findList.append(option);
        });

        setFindable(isDuplicate)

    }

    function checkInput() {

        if (input.current.value.length == 0) {
            while (findList.firstChild) {
                findList.removeChild(findList.firstChild);
            }
            return;
        }

        httpPostAsync("/autofill", 'str=' + input.current.value, changeList);
    }

    return (

        <div style={{ display: "flex", alignContent: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", alignItems: "center", verticalAlign: "center", height: "100vh" }}>
            <div>
                <p>Find me a show like...</p>
                <InputGroup className='m-auto'>
                    <FormControl ref={input} onChange={checkInput} list="findList" />
                    <datalist id="findList">
                    </datalist>
                    <AdjustShow disabled={true} />
                </InputGroup>
            </div>
            <br />
            {/* <div>
                <p>Can't find what you're looking for?</p>
                
            </div> */}
        </div>


    )
}

console.log("hi")

render(<App />, document.getElementById("root"));