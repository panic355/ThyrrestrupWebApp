import React, { Component } from 'react';
import './App.css';
import Navbar from "./components/navbar/Navbar";
import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  // Initialize state
  state = { passwords: [] }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch('/api/passwords')
      .then(res => res.json())
      .then(passwords => this.setState({ passwords }));
  }

  state = {
    navbarOpen: false,
  };

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  };

  render() {
    const { passwords } = this.state;
    
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
