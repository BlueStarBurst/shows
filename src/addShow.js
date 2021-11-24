import { useRef } from "react";
import { httpGetAsync, httpPostAsync } from "./serverHandler";
import Button from 'react-bootstrap/Button';

export default function AddShow(props) {

    const input = useRef(null);

    function changeList(lists) {
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
        if (show.value.length == 0) {
            return;
        }

        lists = JSON.parse(lists);
        lists.forEach(element => {
            var option = document.createElement("option")
            option.value = element.name;
            list.append(option);
            console.log(element.name);
        });
    }

    function checkInput() {

        if (input.current.value.length == 0) {
            return;
        }

        httpPostAsync("/autofill", 'str=' + input.current.value, changeList);
    }

    function submit() {
        httpPostAsync('/addShow', 'name=' + input.current.value)
    }

    return (<>
        <input ref={input} onChange={checkInput} className="input" id="show" list="list" />
        <datalist id="list">
        </datalist>
        <Button variant="primary" id="addShow" onClick={submit}>addShow</Button>
    </>);
}