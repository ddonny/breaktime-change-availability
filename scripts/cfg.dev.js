const webpack = require('webpack');
const path = require('path');

module.exports = function(config) {
  var plugin = new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }
  });
  config.plugins.push(plugin);
};
