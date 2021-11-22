import React from 'react'
import { render } from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import AddShow from './addShow';

function App() {
    return(
        <AddShow/>
    )
}

console.log("hi")

render(<App/>, document.getElementById("root"));