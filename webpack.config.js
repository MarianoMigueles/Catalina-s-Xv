// webpack.config.js
const path = require('path');

module.exports = {
  entry: './code/js/script.js', // Tu archivo principal
  output: {
    filename: 'scripts.min.js',
    path: path.resolve(__dirname, 'dist'), // Directorio de salida
  },
  mode: 'production', // Modo de producción para minificación
};