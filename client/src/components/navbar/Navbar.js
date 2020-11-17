import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
} from "react-router-dom";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Image } from 'react-bootstrap'
import Home from '../homePage/HomeJumbotron';
import Register from '../register/RegisterForm';
import Contact from '../contactPage/ContactCard';
import ContactUs from '../contactPage/ContactCard';
import CreateMachine from '../createMachine/CreateMachine';
import Login from '../Login/LoginForm';
import FleetVehicles from '../fleet/FleetVehicles';
//import logo from './logo.png'
const logo = require('./logoWhite.svg');
class BootstrapNavbar extends React.Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Router>
                            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                                <Navbar.Brand href="#home">
                                    <img src={logo} height="50fr" ></img> 
                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                        <Nav.Link href="/">Home</Nav.Link>
                                        <Nav.Link href="/register">Register</Nav.Link>
                                        <Nav.Link href="/contact">Contact Us</Nav.Link>
                                        <Nav.Link href="/fleet">Flåde</Nav.Link>
                                        <Nav.Link href="/contact-us">About Us</Nav.Link>
                                        <Nav.Link href="/login">Login</Nav.Link>
                                        <Nav.Link href="/createMachine">CreateMachine</Nav.Link>
                                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                    <Form inline>
                                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                        <Button variant="outline-success">Search</Button>
                                    </Form>
                                </Navbar.Collapse>
                            </Navbar>
                            <br />
                            <Switch>

                                <Route exact path="/">
                                    <Home />
                                </Route>

                                <Route exact path="/register">
                                    <Register />
                                </Route>

                                <Route exact path="/login">
                                    <Login />
                                </Route>

                                <Route exact path="/fleet">
                                    <FleetVehicles />
                                </Route>

                                <Route path="/contact">
                                    <Contact />
                                </Route>

                                <Route path="/contact-us">
                                    <ContactUs />
                                </Route>

                                <Route exact path="/createMachine">
                                    <CreateMachine />

                                </Route>
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        )
    }
}

export default BootstrapNavbar;