import React from "react";
import CookiePermision from "../CookiePermision"
var CreateReactClass = require('create-react-class');


console.log("cookies is: "+ document.cookie)
    if (!document.cookie) {
        console.log("success")
      var ErrorMessage = "Please accept the cookies on this site in order to be able to login";
      }

export default class loginForm extends React.Component{
    render() {
      return (
        <div>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossOrigin="anonymous" />
          <link rel="stylesheet" href="/style.css" />
          <title>Document</title>
          <div className="container mt-4">
            <div className="card">
              <div className="card-header">
                Login <form />
              </div>
              <div className="card-body">
                <form action="/auth/login" method="POST">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" className="form-control" id="email" name="email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" />
                  </div>
                  <div className="form-group">
      <label style={{ color: 'red' }}>{ErrorMessage}</label>
                  </div>
                  <button type="submit" className="btn btn-primary">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  