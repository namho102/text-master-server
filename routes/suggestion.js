'use strict';

const Boom = require('boom');


exports.register = function(server, options, next) {

  // const db = server.app.db;



  server.route({
    method: 'GET',
    path: '/suggestion/{prefix}',
    handler: function(request, reply) {
      // let regex = {$regex : ".*" + request.params.query + ".*", $options: 'i'}   
      // db.products.find({
      //   'name': regex
      // }, (err, docs) => {

      //   if (err) {
      //     return reply(Boom.wrap(err, 'Internal MongoDB error'));
      //   }

      //   reply(docs);
      // });
      reply(request.params.prefix)
    }
  });


  


  return next();
};

exports.register.attributes = {
  name: 'routes-products'
};