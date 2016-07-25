import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from 'store';

// layouts
import App from 'layouts/app';

// import Homepage from 'ui/home';
import Home from 'ui/home';
import Calendar from 'ui/calendar';
import Scheduler from 'ui/scheduler';
import LandingPage from 'ui/landingPage';
import employeeSignUp from 'ui/employeeSignUp';



export default (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
      	<Route path='/landingPage' component={LandingPage} />
      	<Route path='/' component={Home} />
      	<Route path='/calendar' component={Calendar} />
      	<Route path='/scheduler' component={Scheduler} />
        <Route path='/employee/*' component={employeeSignUp} />	
      </Route>
    </Router>
  </Provider>
)
