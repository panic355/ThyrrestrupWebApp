import React from "react";
import { PowerBIEmbed } from "powerbi-client-react";
import {
  models,
  Report,
  Embed,
  IEmbedConfiguration,
  service,
  Page,
} from "powerbi-client";

var CreateReactClass = require("create-react-class");

var chart = CreateReactClass({
  render: function () {
    return (
      <iframe
        width="1140"
        height="541.25"
        src="https://app.powerbi.com/reportEmbed?reportId=577ec87d-ca79-4214-9614-20c3e6c09bb5&groupId=ea929985-479a-4658-80b3-2127650e6dae&autoAuth=true&ctid=5b19fed6-6f38-497c-835f-830dd2a2f29f&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXdlc3QtZXVyb3BlLWUtcHJpbWFyeS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
    );
  },
});

export default chart;
