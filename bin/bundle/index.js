const path = require('path');
const modPath = require('app-module-path');
modPath.addPath('');

require('babel-register');
require('./bundle');
