import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'

var CreateReactClass = require('create-react-class');

var NavbbarLoggedIn = CreateReactClass({
   render: function() {
     return (
         <div>
        <Nav.Link href="/contact-us">Om os</Nav.Link>
        <Nav.Link href="/createMachine">Lav maskine</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/register">Register</Nav.Link>
        </div>
     );
   }
 });

export default NavbbarLoggedIn;