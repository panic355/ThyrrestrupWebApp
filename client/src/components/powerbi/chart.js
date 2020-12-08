import React from "react";
import { PowerBIEmbed } from "powerbi-client-react";
import { ResponsiveEmbed } from "react-bootstrap";

var CreateReactClass = require("create-react-class");

var chart = CreateReactClass({
  render: function () {
    return (
      <div style={{ width: 'auto', height: 'auto' }}>
      <ResponsiveEmbed aspectRatio="16by9">
      <iframe
        src="https://app.powerbi.com/reportEmbed?reportId=577ec87d-ca79-4214-9614-20c3e6c09bb5&groupId=ea929985-479a-4658-80b3-2127650e6dae&autoAuth=true&ctid=5b19fed6-6f38-497c-835f-830dd2a2f29f&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXdlc3QtZXVyb3BlLWUtcHJpbWFyeS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
      </ResponsiveEmbed>
      </div>
    );
  },
});

export default chart;
