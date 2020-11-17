import { createStore } from 'redux';
import vehiclesReducer from '../../reducers/vehicles';

const store = createStore(vehiclesReducer);

store.subscribe(() => {
 console.log('store data:', store.getState());
});
export default store;