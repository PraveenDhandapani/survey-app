

if (process.env.NODE_ENV === 'production') {
    // Production Env variables
    module.exports = require('./prod.js');
} else {
    // dev env variables
    module.exports = require('./dev.js');
}