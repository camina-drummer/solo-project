const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    // actual javascript tag that will be in our script tag, where bundling is directed and is loaded to browser
    filename: "bundle.js",
  },
  mode: "development",
  module: {
    rules: // handles transpilation
    [
      {
        test: /\.(?:js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-react', { targets: "defaults" }],
              ['@babel/preset-env', { targets: "defaults" }]
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.(?:css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', // inject css string into DOM - best for dev
        'css-loader', // resolve all css into a single string
        'sass-loader'] // transpile sass/scss into css
      }
    ]
  },
  devServer: {
    // anything thats not available in the output, used for serving up static assets
    // static: {
    //   publicPath: 'build',
    //   directory: path.join(__dirname, 'build'),
    // }
    port: 8080,
    proxy : {
      '/' : 'http://localhost:3000/',
      // '/api' : {
      //   target: 'http://localhost:8080',
      //   router: () => 'http://localhost:3000',
      //   logLevel: 'debug' /*optional*/
      // },
    }, 
    hot: true,
    allowedHosts: 'auto', // are there outside websites to allow to connect
  },
  // connects to dynamic javascript and gets served on localhost, expands functionality of webpack
  plugins: [ 
    new HtmlWebpackPlugin({
    template: './client/index.html',
  }),
  // new MiniCssExtractPlugin(),
  ],
};