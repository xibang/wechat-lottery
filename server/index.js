const { Nuxt, Builder } = require('nuxt');
const fastifySession = require('fastify-session');
const fastifyCookie = require('fastify-cookie');
const RedisStore = require('connect-redis')(fastifySession);
// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');
const { getGlobalToken } = require('./lib/actions');
const { redis } = require('./config');


config.dev = !(process.env.NODE_ENV === 'production');

// eslint-disable-next-line import/order
const fastify = require('fastify')({
  logger: config.dev
});


async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 6030
  } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }
  await getGlobalToken(true);
  fastify.register(fastifyCookie);
  fastify.register(fastifySession, {
    // saveUninitialized: false,
    secret: '9V_3W<xlxS8:Lk!/qe%IdR1qD+l|"ozrPCZUY:8I?)65+1M>1z(Y>Pa1?L;t8#J',
    store: new RedisStore(Object.assign({}, redis, {
      db: 0,
      ttl: 86400 * 30
    }))
  });

  // eslint-disable-next-line global-require
  fastify.register(require('./routes'), { prefix: '/api' });

  // fastify.use(nuxt.render);
  fastify.get('*', (req, res) => {
    nuxt.render(req.req, res.res);
  });

  fastify.listen(port, host, (err, address) => {
    console.log(address);
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  });
}

start();
