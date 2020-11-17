import React from 'react';

const Vehicle = ({ vehicleID, type, timeSinceMotService, powerBiLink }) => {
 return (
  <div>
   <div>
    <img src={powerBiLink} alt={type} />
   </div>
   <div><strong>Name:</strong> {type}</div>
   <div><strong>Country:</strong> {timeSinceMotService}</div>
   <div><strong>vehicleID:</strong> {vehicleID}</div>
  </div>
 );
};

export default Vehicle;