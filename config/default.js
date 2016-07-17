import path from 'path';

const basePath = path.resolve(__dirname, '../');
const config = {
  env: process.env.NODE_ENV,
  paths: {
    base: basePath,
    src: path.join(basePath, './src'),
    dist: path.join(basePath, './dist'),
    client: path.join(basePath, './src/client'),
    server: path.join(basePath, './src/server'),
    public: '/'
  },
  http: {
    host: '0.0.0.0',
    port: process.env.port || 5000
  }
}

export default config;
