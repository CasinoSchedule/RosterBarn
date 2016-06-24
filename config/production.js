import baseConfig from './default';
import secret from './secret';

const config = Object.assign({
  // production config overrides
}, secret);

export default config;