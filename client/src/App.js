import React, { Component } from 'react';
import './App.css';
import Navbar from "./components/navbar/Navbar";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import cookiePermission from "./components/CookiePermision"

class App extends Component {
  
  
  state = {
    navbarOpen: false,
  };

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  };

  render() {

    return (
      <cookiePermission>
      <Router>
        <Navbar />
        <Switch>
          <Route exactly pattern="/" />
        </Switch>
      </Router>
      </cookiePermission>
      );
  }
}

export default App;
