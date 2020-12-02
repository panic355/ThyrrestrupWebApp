import React from "react";
var CreateReactClass = require('create-react-class');

var jumbotron = CreateReactClass({
  render: function () {
    return (
      <div className="container mt-4">
        <div className="jumbotron">
          <h1 className="display-4">Login Project</h1>
          <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          <hr className="my-4" />
          <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
          <a className="btn btn-primary btn-lg" role="button">Learn more</a>
        </div>
      </div>

    );

  }
});

export default jumbotron;