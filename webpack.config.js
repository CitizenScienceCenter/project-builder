'use strict';

const environment = (process.env.NODE_ENV || 'development').trim();
console.log(environment)
if (environment === 'development') {
    module.exports = require('./build/webpack.dev.config');
} else if (environment === 'local') {
    module.exports = require('./build/webpack.local.config');
} else {
    module.exports = require('./build/webpack.prod.config');
}
