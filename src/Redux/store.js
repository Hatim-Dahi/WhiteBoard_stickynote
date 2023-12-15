// dashboardStore.js

import { createStore } from 'redux';
import dashboardReducer from './Reducer/dashboardReducer';

// Create and configure the Redux store
const dashboardStore = createStore(dashboardReducer);

export default dashboardStore;
