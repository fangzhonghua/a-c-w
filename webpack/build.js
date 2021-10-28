const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const getBaseConfig = require('./base');

module.exports =(env, argv)=> {
  return {
    ...getBaseConfig(env, argv),
    mode: 'production'
  }
}