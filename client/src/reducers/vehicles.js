const vehiclesReducer = (state = [], action) => {
    switch(action.type) {
     case 'ADD_vehicles':
      return [...state, ...action.vehicles];
    }
   };
   export default vehiclesReducer;