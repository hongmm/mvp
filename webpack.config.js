const path = require('path');

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "/client/src/index.jsx"),
  output: {
      path: path.join(__dirname, '/client/static'),
      filename: "bundle.js"
  },
  module: {
      rules: [
          {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: {
                  loader: "babel-loader",
                  options: {
                      presets: [
                          "@babel/preset-react",
                          "@babel/preset-env"
                      ]
                  }
              }
          },
          {
              test: /\.css$/,
              use: [
                  "style-loader",
                  "css-loader"
              ]
          }
      ]
  }
};
