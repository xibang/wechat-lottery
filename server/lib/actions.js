const redis = require('./redis');
const { token, user } = require('./wechat');

exports.getGlobalToken = async (force = false) => {
  let t = await redis.get('token');
  if (force || t === null) {
    t = await token();
    await redis.setex('token', 5000, t.access_token);
  }
  return t;
};

exports.getUser = async openid => user(await exports.getGlobalToken(), openid);
