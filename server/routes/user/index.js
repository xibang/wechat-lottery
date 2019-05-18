const { randNumber } = require('@xibang/node-common');
const redis = require('../../lib/redis');
const { getUser } = require('../../lib/actions');

exports.check = async (req, reply) => {
  const { openid = '' } = req.session;
  const count = ~~await redis.get(`count:${openid}`);
  const data = { openid, count };
  if (openid !== '') {
    const result = await getUser(openid);
    data.subscribe = result.subscribe;
  }
  reply.send({ status: 1, data });
};

exports.feeling = async (req, reply) => {
  const { openid = '' } = req.session;
  const count = ~~await redis.get(`count:${openid}`) + 1;
  let result = -1;
  if (count === 1) {
    await redis.setex(`count:${openid}`, 86400, count);
    result = randNumber(0, 100) === 66 ? 1 : 0;
  }
  reply.send({ status: 1, data: { result } });
};
