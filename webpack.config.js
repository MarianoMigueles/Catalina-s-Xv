const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './code/JS/script.js',
  output: {
    filename: 'scripts.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "index.html", to: "index.html" },
      ],
    }),
  ],
};