
import React from "react";
var CreateReactClass = require('create-react-class');

var createMachineContainer = CreateReactClass({
    render: function() {
      return (
  
        <div className="container mt-4">
          <div className="card">
            <div className="card-header">
              Opret Maskine
            </div>
            <div className="card-body">
            
              <form action="auth/createMachine" method="POST">
                <div className="form-group">
                  <label htmlFor="type">Maskine type</label>
                  <input type="text" className="form-control" id="type" name="type" />
                </div>
                <div className="form-group">
                  <label htmlFor="vehicleID">Maskine ID</label>
                  <input type="text" className="form-control" id="vehicleID" name="vehicleID" />
                </div>
                <div className="form-group">
                  <label htmlFor="powerBILink">PowerBi link</label>
                  <input type="text" className="form-control" id="powerBILink" name="powerBILink" />
                </div>
                <div className="form-group">
                  <label htmlFor="personID">Person ID</label>
                  <input type="text" className="form-control" id="personID" name="personID" />
                </div>
                <div className="form-group">
                  <label htmlFor="timeSinceMotService">Tid til service check</label>
                  <input type="text" className="form-control" id="timeSinceMotService" name="timeSinceMotService" />
                </div>


                <button type="submit" className="btn btn-primary">Opret Maskine</button>
              </form>
            </div>
          </div>
        </div>
      );
    }
  });

  export default createMachineContainer;