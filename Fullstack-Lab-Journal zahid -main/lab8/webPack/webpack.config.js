const path = require("path");

module.exports = {
  enrty: './app.js',

  output: {
    file: 'bundle.js',
    path: path.resolve(--dirname, 'dist')
  },
  mode: 'development'
}