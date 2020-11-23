import React, { Component } from 'react';
import './App.css';
import Navbar from "./components/navbar/Navbar";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  
  state = {
    navbarOpen: false,
  };

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  };

  render() {

    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exactly pattern="/" />
        </Switch>
      </Router>
      );
  }
}

export default App;
