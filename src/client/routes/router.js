import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from 'store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack, indigo500
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';


import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
    primary2Color: pinkA200,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: indigo500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  appBar: {
    height: 50,
  },
});

// layouts
import App from 'layouts/app';

// import Homepage from 'ui/home';
import Home from 'ui/home';
import Calendar from 'ui/calendar';
import Scheduler from 'ui/scheduler';
import LandingPage from 'ui/landingPage';
import employeeSignUp from 'ui/employeeSignUp';
import Info from 'ui/employeeInfoForm';



export default (
  <MuiThemeProvider  muiTheme={muiTheme}>
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
      	<Route path='/landingPage' component={LandingPage} />
        <Route path='/info' component={Info} />
      	<Route path='/' component={Home} />
      	<Route path='/calendar' component={Calendar} />
      	<Route path='/scheduler' component={Scheduler} />
        <Route path='/employee/*' component={employeeSignUp} />	
      </Route>
    </Router>
  </Provider>
  </MuiThemeProvider>
)
