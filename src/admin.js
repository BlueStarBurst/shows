import React, { useRef, useState, useEffect } from 'react'
import { render } from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

import './assets/styles.css'

import SearchShows from './elements/searchShows';

import { httpPostAsync } from './assets/serverHandler';
import { Badge, Container, Row } from "react-bootstrap";

function unAuth(data) {
    localStorage.setItem("session", "expired");
    console.log(data);
    document.getElementsByClassName("midItem")[0].className = "midItemOut"
    document.getElementsByClassName("reqShowItemIn")[0].className = "reqShowItemOut"

    setTimeout(() => {
        window.location.href = window.location.origin + "/"
    }, 2000)
    
}

function onAuth(data) {
    console.log(data)
    console.log("yeah ok math checks out");
}

var checkEx = setInterval(() => {
    httpPostAsync("/auth", '', onAuth, console.log, unAuth);
}, 60000)


export default function Admin(props) {

    const header = {
        padding: "5%",
        borderBottom: "1px solid #CED4DA",
        width: "100%",
        display: "block",
        alignItems: "center",
        textAlign: "center"
    }

    const elem = {
        padding: "5%",
        borderBottom: "1px solid #CED4DA",
        width: "100%",
        cursor: "pointer",
        display: "inline-flex",
        justifyContent: "start",
        alignItems: "center"
    }

    const [requests, setReq] = useState(null);

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

    const reqShows = {
        position: "relative",
        maxHeight: "75vh",
        minHeight: "50vh",
        width: "30vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "start",
        textAlign: "left",
        borderLeft: "1px solid #CED4DA",
        borderTop: "1px solid #CED4DA",
        borderBottom: "1px solid #CED4DA",
        borderRadius: "15px 0 0 15px",
        justifySelf: "end",
        marginLeft: "auto",
    }

    const styleRow = {
        display: "flex-inline",
        justifyContent: "space-between",
        flexDirection: "row",
        textAlign: "center",
        alignItems: "center",
        verticalAlign: "center",
        width: "100%"
    }

    const item = {
        minWidth: "1px",
        minHeight: "1px",
        flex: "1 1 0px",
        padding: "0"
    }

    const midItem = {
        minWidth: "1px",
        minHeight: "1px",
        flex: "1 1 0px",
        padding: "5%"
    }

    function onShowRequests(data) {
        data = JSON.parse(data);
        console.log(data)

        var arr = Object.keys(data).map(e => { return { name: e, count: data[e].count, data: data[e].data } })
        arr.sort((a, b) => b.count - a.count)
        console.log(arr)

        setReq(arr.map(e =>
            <div style={elem} className='reqShow'>
                <Badge pill bg="secondary" style={{ marginRight: "2%" }}>{e.count}</Badge>
                <p className='m-0'>{e.name}</p>
            </div>
        ))
    }

    useEffect(() => {
        httpPostAsync('/ticketShowRequests', '', onShowRequests, console.log, unAuth);
    }, [])



    return (

        <div style={styles}>

            <Row style={styleRow}>
                <div style={item}>

                </div>
                <div style={midItem} className='midItem'>
                    <SearchShows />
                </div>
                <div style={item} className="reqShowItemIn">
                    <div style={reqShows}>
                        <div style={header}>
                            Requested Shows
                        </div>
                        {requests}
                    </div>
                </div>

            </Row>

        </div>
    )
}

render(<Admin />, document.getElementById("root"));

