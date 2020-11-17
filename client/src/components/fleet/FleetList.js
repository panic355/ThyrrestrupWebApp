import React, { Component } from 'react';
import { connect } from 'react-redux';
import Vehicle from './Vehicle';


const FleetList = (props) => {
    return (
     <div className="vehicle-list">
      { props.vehicles && props.vehicles.map((vehicle) => <Vehicle key={vehicle.vehicleID} {...vehicle} /> ) }
     </div>
    );
   };
   const mapStateToProps = (state) => {
    return {
      vehicles: state
    };
   };

export default connect(mapStateToProps)(FleetList);