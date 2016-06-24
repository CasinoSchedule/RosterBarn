import baseConfig from './default';
import secret from './secret';

const config = Object.assign({
  // development config overrides
}, secret);

export default config;