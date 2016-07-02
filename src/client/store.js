import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// Add middleware to createStore
var createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

// App Reducers
import ShowReducer from 'reducers/show';
import EmployeeReducer from 'reducers/employee';
import CalendarReducer from 'reducers/calendarReducer';

// Combine Reducers
var reducers = combineReducers({
	showReducer: ShowReducer,
	employeeReducer: EmployeeReducer,
	calendarReducer: CalendarReducer
  // more...
});

// Create Store
var store = createStoreWithMiddleware(reducers);

export default store;
