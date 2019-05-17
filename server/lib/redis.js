const redis = require('@xibang/redis');
const { redis: rConfig } = require('../config');

module.exports = redis(rConfig);
