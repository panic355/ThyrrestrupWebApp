import React, { Component } from 'react';
import styled from "styled-components";

export default class fetchVechicleList extends React.Component {
  state = {
    loading: true,
    vehicleList: []
  };
  async componentDidMount() {
/*     const url = "http://localhost:8080/fleet";
    const response = await fetch(url);
    const data = await response.json();
    console.log({vehicleList: data});
    console.log(data);
    this.setState({vehicleList: data, loading: false});
 */
      fetch('/fleet')
        .then(res => res.json())
        .then(vehicleList => this.setState({ vehicleList, loading: false }));
  }

  render() {
    if(this.state.loading) {
      return <div>Loading...</div>
    }
    if (!this.state.vehicleList.length) {
      return <div>Didn't get a vehicle</div>
    }
    return (
      <div>
      {this.state.vehicleList.map(vehicle => (
      <div class="content">
      <a href="#" class="list-group-item list-group-item-action active">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="headline">Min flåde</h5>
        </div>
        <p class="sub-title">Oversigt over dine maskiner.</p>
      </a>
      <div key={vehicle.vehicleID}>
      <a class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="machineNr: ">{vehicle.vehicleID}</h5>
        </div>
        <div>
        <img src="https://cdn.lfmedia.dk/CMSContent/Media/PageContent/Max/22784.jpg" class="card-img-top" style={{width: 175, height: 100, position: 'left', top: this.props.top, left: this.props.left}} alt="..."></img>
        <p class="mb-1">Type: {vehicle.type}</p>
        <p class="mb-1">Timer siden sidste motor servicecheck: {vehicle.timeSinceMotService}</p>
        <p class="mb-1">vehicleID: {vehicle.vehicleID}</p>
        <p class="mb-1">person id: {vehicle.personID}</p>
    
     <input type="submit" value="Gå til maskine" class="btn btn-primary"
       onclick="window.location='/vehicle/{{vehicleID}}';"/>
    
    <input type="submit" value="Rediger maskine" class="btn btn-primary"
        onclick="window.location='/editMachine/{{vehicleID}}';"/>
    
        <input type="submit" value="Slet Maskine" class="btn btn-primary"
        onclick="window.location='/deleteMachine/{{vehicleID}}';"/>
    
        <input type="submit" value="Servicer maskine" class="btn btn-primary"
        onclick="window.location='/service/{{vehicleID}}';"/>
        </div>
      </a>
      </div>
      </div>
      ))}
      </div>
      );
      /*{this.state.vehicleList.map(vehicle => (
        <div key={vehicle.vehicleID}>
        <div> {vehicle.vehicleID} </div>
        <div> {vehicle.timeSinceMotService} </div>
        </div>*/
      }
    }