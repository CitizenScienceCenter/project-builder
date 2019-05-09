'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_KEY: '"90cb9c4b-2f31-4d26-bd4e-f4926e57babb"',
  BASE_API_URL: '"https://pybossa.citizenscience.ch/api/"'
})
