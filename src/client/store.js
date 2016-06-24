import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// Add middleware to createStore
var createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

// App Reducers
import GeneralReducer from 'reducers/generalReducer';

// Combine Reducers
var reducers = combineReducers({
	generalReducer: GeneralReducer
  // more...
});

// Create Store
var store = createStoreWithMiddleware(reducers);

export default store;
