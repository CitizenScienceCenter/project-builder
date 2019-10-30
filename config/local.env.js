'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
console.log('using local')
module.exports = merge(prodEnv, {
  BASE_ENDPOINT_URL: 'https://pybossa.citizenscience.ch/',
  BASE_API_URL: 'https://pybossa.citizenscience.ch/api/',
  FLICKR_CALLBACK_URL: 'http://localhost:8080/flickr/callback',
  NODE_ENV: 'local',
  OPENAPI_SERVER: 'http://localhost:9000/v3/',
  OPENAPI_URL: 'http://localhost:9000/v3/openapi.json'
})
