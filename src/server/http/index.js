import express from 'express';
import config from 'app-config-chain';
import http from 'http';

const app = express();

app.disable('x-powered-by');

// middleware stack
app.use(require('./middleware/errors'))
app.use(require('./middleware/spa'))

if (config.env === 'development') {
  app.use(require('./middleware/webpack'))
} else {
  app.use(express.static(config.paths.dist))
}

const server = http.createServer(app);

require('./socket')(server);

export default server;
