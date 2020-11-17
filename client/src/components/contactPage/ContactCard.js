import styled from "styled-components";
import React, {Component} from "react";
import axios from 'axios';

var CreateReactClass = require('create-react-class');

var contactCard = CreateReactClass({
   render: function() {
     return (
       <div>
         <div className="card mb-3">
           <img src="https://image.jimcdn.com/app/cms/image/transf/none/path/se2d7155d6368abec/image/i1a65fa82efc209c9/version/1477465477/image.jpg" className="card-img-top" style={{width: '700x', height: '350px'}} alt="..." />
           <div className="card-body">
             <h5 className="card-title">Kontakt</h5>
             <p className="card-text">Telefon: +45 22  42 30 50 Email: info@tmink.dk Åbningstider: Mandag til torsdag: 8:00 - 16:00 Fredag: 8:00 - 14:00</p>
           </div>
         </div>
         <div className="card">
           <div className="card-body">
             <h5 className="card-title">Adresse</h5>
             <p className="card-text">Thyrrestrup Produktion Vestvej 18, DK-9600 Aars</p>
           </div>
         </div>
       </div>
     );
   }
 });

export default contactCard;