const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js?$/, 
        use: [
          {
            loader:'babel-loader', 
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            },
          },
        ], 
        exclude: /node_modules/, 
      },
      { 
        test: /\.tsx?$/, 
        use: [
          {
            loader:'babel-loader', 
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            },
          },
          {
            loader: 'ts-loader',
          },
        ], 
        exclude: /node_modules/, 
      },
      {
        test: /\.ts?$/, 
        use: [
          {
            loader:'babel-loader', 
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            },
          },
          {
            loader:'ts-loader', 
          },
        ], 
        exclude: /node_modules/, 
      },
      {
        test: /\.css?$/, 
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/, 
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Caching',
      template: path.join(__dirname, "src", "index.html"),
      filename: path.join(__dirname, "build", "index.html"),
    }),
  ],
  output: {
    filename: '[contenthash].js',
    path: path.resolve(__dirname, 'build/static/js'),
  },
};