import React from 'react';
import { render } from 'react-dom';
import Router from 'routes/router';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

var appContainer = document.getElementById('app');

render(Router, appContainer);
