const Hapi = require('hapi');
const Hoek = require('hoek');
const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.register(require('inert'), (err) => {
  Hoek.assert(!err, err);
  
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply.file('./public/index.html');
    }
  });
});

server.start((err) => {
  Hoek.assert(!err, err);
});
