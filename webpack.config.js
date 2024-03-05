const path = require('path');

module.exports = {
  entry: './src/index.js', // Replace with the entry file of your React app
  output: {
    filename: 'bundle.js', // Replace with the desired output bundle name
    path: path.resolve(__dirname, 'dist'), // Replace with the desired output directory
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      // Add additional loaders for CSS, images, etc., as needed
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Add more extensions as needed
  },
  devtool: 'source-map', // Enable source maps for better debugging
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // Replace with the path to your static files
    port: 3000, // Specify the port for the development server
    open: true, // Open the default browser when the server starts
  },
};