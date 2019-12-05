'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: 'development',
  BASE_ENDPOINT_URL: 'https://pb.citizenscience.ch/',
  BASE_API_URL: 'https://pb.citizenscience.ch/api/',
  FLICKR_CALLBACK_URL: 'http://localhost:8080/flickr/callback',
  OPENAPI_URL: "https://staging.citizenscience.ch/v3/openapi.json",
  OPENAPI_SERVER: 'https://staging.citizenscience.ch/v3/'
})
