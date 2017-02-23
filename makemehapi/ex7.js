const Hapi = require('hapi');
const Hoek = require('hoek');
const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: Number(process.argv[2] || 8080)
});

server.register(require('vision'), (err) => {
  Hoek.assert(!err, err);
  
  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'templates',
    helpersPath: 'helpers'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: {
      view: 'helper.html'
    }
  });
});

server.start((err) => {
  Hoek.assert(!err, err);
});
