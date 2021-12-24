import React, { useRef, useState, useEffect } from 'react'
import { render } from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

import './assets/styles.css'

import SearchShows from './elements/searchShows';

import { httpPostAsync } from './assets/serverHandler';
import { Container, Row } from "react-bootstrap";

function unAuth(data) {
    console.log(data);
    window.location.href = window.location.origin + "/"
}

function onAuth(data) {
    console.log(data)
    console.log("yeah ok math checks out");
}

httpPostAsync("/auth", '', onAuth, console.log, unAuth);

export default function Admin(props) {

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
        justifyContent: "end",
        textAlign: "left",
        borderLeft: "1px solid #CED4DA",
        borderTop: "1px solid #CED4DA",
        borderBottom: "1px solid #CED4DA",
        borderRadius: "15px 0 0 15px"
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
        width: "max-content",
        minWidth: "1px",
        minHeight: "1px"
    }

    function onShowRequests(data) {
        console.log(data)
    }

    httpPostAsync('/ticketShowRequests', '', onShowRequests, console.log, unAuth);

    return (

        <div style={styles}>

            <Row style={styleRow}>
                <div style={item}>

                </div>
                <div style={midItem}>
                    <SearchShows />
                </div>
                <div style={item}>
                    <div style={reqShows}>
                        {requests}
                    </div>
                </div>

            </Row>

        </div>
    )
}

render(<Admin />, document.getElementById("root"));