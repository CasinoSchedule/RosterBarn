import webpack from 'webpack';
import chalk from 'chalk';
import webpackConfig from '../../build/webpack';
import _debug from 'debug';
const debug = _debug('app:bin:bundle');

debug(`Environment is set to: ${process.env.NODE_ENV || 'default'}`);
debug('Webpack compiler starting to build');

const bundler = webpack(webpackConfig);

bundler.run(function(err, stats){
  const jsonStats = stats.toJson()

  debug('Bundling completed!')

  if (err) {
    debug(chalk.red(err));
    process.exit(1);
  } else if (jsonStats.errors.length > 0) {
    debug(chalk.red(jsonStats.errors));
    process.exit(1);
  } else if (jsonStats.warnings.length > 0) {
    debug(chalk.yellow(jsonStats.warnings));
  }

  debug('All done - everything is good to go.');
});