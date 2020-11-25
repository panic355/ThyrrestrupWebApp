
import React from "react";
var CreateReactClass = require('create-react-class');

var registerForm = CreateReactClass({
    render: function() {
      return (
        <div className="container mt-4">
        <div className="card">
          <div className="card-header">
            Register <form />
          </div>
          <div className="card-body">
            <form action="/auth/register" method="POST">

            <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" id="name" name ="name"/>
                    </div>

                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" class="form-control" id="email" name="email"/>
                    </div>

                   <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" name="password"/>
                    </div>

                    <div class="form-group">
                        <label for="passwordConfirm">Password Confirm</label>
                        <input type="password" class="form-control" id="passwordConfirm" name="passwordConfirm"/>
                    </div>

                    <div class="form-group">
                        <label for="name">Bruger type (Owner eller User)</label>
                        <input type="text" class="form-control" id="admin" name ="admin"/>
                    </div>

                    <button type="submit" class="btn btn-primary">Register User</button>
                </form>
            </div>
        </div>

    </div>
      );
      }
    });

export default registerForm;