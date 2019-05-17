const { token } = require('../server/lib/wechat');

token().then(console.log);

// const redis = require('../server/lib/redis');

// redis.get('token').then(console.log);
