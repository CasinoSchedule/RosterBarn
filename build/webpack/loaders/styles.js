import ExtractTextPlugin from 'extract-text-webpack-plugin';

export const ExtractCSS = new ExtractTextPlugin('css!styles.css');

export default [
  {
    test: /\.scss$/i,
    loader: ExtractCSS.extract(['css', 'sass'])
  }
];
