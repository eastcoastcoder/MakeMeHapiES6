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
    path: '/foo/bar/baz/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    }
  });
});

server.start((err) => {
  Hoek.assert(!err, err);
});
