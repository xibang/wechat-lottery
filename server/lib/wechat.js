const axios = require('axios');
const { wechatMp: { ak, sk } } = require('../config');

exports.token = () => axios.get(
  `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${ak}&secret=${sk}`
).then(({ data = {} }) => data);

exports.user = (token, openid) => axios.get(
  `https://api.weixin.qq.com/cgi-bin/user/info?access_token=${token}&openid=${openid}&lang=zh_CN`
).then(({ data = {} }) => data);
