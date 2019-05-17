const { callback: wechatCallbackHandler, login: wechatLoginHandler } = require('./wechat');
const { check: userCheckHandler, feeling: userFeelingHandler } = require('./user');

module.exports = (fastify, opts, next) => {
  fastify.get('/wechat/login', wechatLoginHandler);
  fastify.get('/wechat/callback', wechatCallbackHandler);
  fastify.get('/user/check', userCheckHandler);
  fastify.get('/user/feeling', userFeelingHandler);

  next();
};
