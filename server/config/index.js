exports.redis = {
  host: process.env.RS_HOST || '127.0.0.1',
  port: process.env.RS_PORT || 6379,
  db: process.env.RS_DB || 2
};

exports.wechatMp = {
  ak: process.env.MP_APPID || '',
  sk: process.env.MP_SECRET || '',
  redirect: encodeURIComponent('https://test.xb.pub/api/wechat/callback')
};
