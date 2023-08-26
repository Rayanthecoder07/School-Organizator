const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development', // or 'development' for development environment
  entry: {
    main: './src/index.js', // Adjust the entry point
  },
  output: {
    path: path.resolve(__dirname, 'build'), // Output directory
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/components/pages/WorkPage.js', // Adjust the path to WorkPage.js
          to: 'content-script', // Adjust the output path
        },
        // Add other patterns if needed
      ],
    }),
  ],
};
