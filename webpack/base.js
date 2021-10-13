const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');

const getBaseConfig = (env, argv) => {
  const baseConfig = {
    entry: ["babel-polyfill",'./src/index.js'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js'
    },
    module:{
      rules:[
        {
          test: /\.(js|jsx)$/,
          use:['babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.(css|less)$/,
          use: [
            {loader:'style-loader'},
            {loader:'css-loader'},
            {loader:'less-loader'},
          ]
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|png|jpe?g|gif)(\?\S*)?$/,
          loader: 'file-loader'
        }
      ]
    },
    resolve: {
      // alias:{
      //   '@': path.resolve(__dirname, './src'),
      //   "ImgDir": path.resolve(__dirname, './images'),
      // },
      extensions: [".js", ".jsx"]
    },
    plugins:[
      new HtmlWebpackPlugin({
        title:"web-compnent",
        template:"index.html"
      }),
      new webpack.DefinePlugin({
        'isMock': argv.mock
      })
    ]
  }
  return baseConfig
}

module.exports = getBaseConfig;





