const Hapi = require('hapi');
const Hoek = require('hoek');
const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.register(require('h2o2'), (err) => {
  Hoek.assert(!err, err);
  
  server.route({
    method: 'GET',
    path: '/proxy',
    handler: {
      proxy: {
        host: '127.0.0.1',
        port: 65535
      }
    }
  });
});

server.start((err) => {
  Hoek.assert(!err, err);
});
