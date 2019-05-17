const axios = require('axios');
const { getTimestamp } = require('@xibang/node-common');
const { wechatMp: { ak, sk, redirect } } = require('../../config');

exports.login = (req, reply) => {
  const URL = 'https://open.weixin.qq.com/connect/oauth2/authorize';
  reply.redirect(
    `${URL}?appid=${ak}&redirect_uri=${redirect}&scope=snsapi_base&response_type=code#wechat_redirect`
  );
};

exports.callback = async (req, reply) => {
  const { code = '' } = req.query;
  const { data } = await axios.get(
    `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${ak}&secret=${sk}&code=${code}&grant_type=authorization_code`
  );
  const { access_token: token = '', expires_in: expires, refresh_token: rt, openid } = data;
  if (token !== '') {
    req.session.access_token = token;
    req.session.expires_in = getTimestamp() + expires;
    req.session.refresh_token = rt;
    req.session.openid = openid;
  }
  // const { data: user = {} } = await axios.get(
  //   `https://api.weixin.qq.com/sns/userinfo?access_token=${token}&openid=${openid}&lang=zh_CN`
  // );
  // req.session.user = user;
  // reply.send(user);
  reply.redirect(`/?openid=${openid}`);
};
