import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import Home from "../homePage/HomeJumbotron";
import Register from "../register/RegisterForm";
import Contact from "../contactPage/ContactCard";
import ContactUs from "../contactPage/ContactCard";
import CreateMachine from "../createMachine/CreateMachine";
import Login from "../Login/LoginForm";
import FleetVehicles from "../fleet/FleetVehicles";
import logo from "./logoWhite.svg";
import Cookies from "js-cookie";
import Vehicle from "../fleet/Vehicle"


class BootstrapNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoggedIn: false,
      userType: "",
      showNavComps: false,
    };
  }

  async componentDidMount() {
    fetch("/auth/status")
      .then((res) => res.json())
      .then((data) => this.setState({ LoggedIn: data.active }));

    fetch("/userType")
      .then((res) => res.json())
      .then((data) => this.setState({ userType: data.userType }));
      if(this.state.userType == "Administrator"){
        this.state.showNavComps = true;
      }else{
        this.state.showNavComps = false;
      }
    console.log(this.state.userType);
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <Router>
              <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Navbar.Brand href="#home">
                  <img src={logo} height="50fr" alt="fancy_logo"></img>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav
                    className="mr-auto"
                    onSelect={(selectedKey) => {
                      if (selectedKey == "logout") {
                        fetch("/auth/logout")
                          .then((res) => res.json())
                          .then((data) => this.setState({ LoggedIn: false }));
                      }
                    }}
                  >
                    <Nav.Link href="/">Hjem</Nav.Link>
                    <Nav.Link href="/contact-us">Om os</Nav.Link>
                    {this.state.LoggedIn && (
                      <Nav.Link eventKey="logout">Log ud</Nav.Link>
                    )}
                    {!this.state.LoggedIn && (
                      <Nav.Link href="/login">Log ind</Nav.Link>
                    )}
                    {this.state.LoggedIn && this.state.showNavComps && (
                      <Nav.Link href="/register">Register</Nav.Link>
                    )}
                    {this.state.LoggedIn && (
                      <Nav.Link href="/fleet">Flåde</Nav.Link>
                    )}
                    {this.state.LoggedIn && this.state.showNavComps && (
                      <Nav.Link href="/createMachine">Lav maskine</Nav.Link>
                    )}
                  </Nav>
                  <p
                    className="mr-sm-2"
                    style={{ color: "gray", marginTop: "10px" }}
                  >
                    {this.state.userType}
                  </p>
                  <Form inline>
                    <FormControl
                      type="text"
                      placeholder="Søgefelt"
                      className="mr-sm-2"
                    />
                    <Button variant="outline-success">Søg</Button>
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

                <Route exact path="/Vehicle/">
                  <Vehicle />
                </Route>
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default BootstrapNavbar;
