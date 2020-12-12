import React from "react";
import Report from "../powerbi/chart";
import { ResponsiveEmbed } from "react-bootstrap";

var CreateReactClass = require('create-react-class');

var Vehicle = CreateReactClass({
   render: function() {
     return (
        <div style={{ width: 'auto', height: 'auto' }}>
        <ResponsiveEmbed aspectRatio="16by9">
        <iframe 
        src="https://app.powerbi.com/reportEmbed?reportId=1ef3dbc1-65bb-4c7d-bbee-a52423f6f47b&groupId=ea929985-479a-4658-80b3-2127650e6dae&autoAuth=true&ctid=5b19fed6-6f38-497c-835f-830dd2a2f29f&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXdlc3QtZXVyb3BlLWUtcHJpbWFyeS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D" 
        frameborder="0" 
        allowFullScreen="true">
        </iframe>
        </ResponsiveEmbed>
        </div>
     );
   }
 });

export default Vehicle;