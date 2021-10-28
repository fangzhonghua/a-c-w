const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const getBaseConfig = require('./base');

module.exports =(env, argv)=> {
  return {
    ...getBaseConfig(env, argv),
    mode: 'development',
    devtool: 'source-map',
    devServer:{
      static: false,
      port: 8001,
      hot: true,
      allowedHosts: ['localhost','test.yyuap.com']
    }
  }
}