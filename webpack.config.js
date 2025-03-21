const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './code/js/script.js',
  output: {
    filename: 'scripts.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "assets", to: "assets" },
        { from: "index.html", to: "index.html" },
        { from: "app-information.json", to: "app-information.json" },      
      ],
    }),
  ],
};