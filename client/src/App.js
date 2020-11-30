import React, { Component } from 'react';
import './App.css';
import Navbar from "./components/navbar/Navbar";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

const cookieStorage = {
  getItem: (key) => {
    const cookies = document.cookie
    .split(';')
    .map(cookie => cookie.split('='))
    .reduce((acc, [key, value])=> ({ ...acc,[key.trim()]: value}), {});
    return cookies[key]; 
  },
  setItem: (key, value) => {
      document.cookie = `${key}=${value}`
  }
}

const storageType = cookieStorage;
const consentPropertyName = 'jdc_consent';

const shouldShowPopup = () => !storageType.getItem(consentPropertyName);
const saveToStorage = () => storageType.setItem(consentPropertyName, true);

window.onload = () => {
  if(shouldShowPopup()) {
      const consent = window.confirm('Agree to terms');
      if (consent) {
          saveToStorage();
      }
  }
};

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
