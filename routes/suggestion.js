'use strict';

const Boom = require('boom');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/mydb';

exports.register = function(server, options, next) {

  // console.log(server.app.db)
  const db = server.app.db;

  // console.log(db)

  server.route({
    method: 'GET',
    path: '/suggestion/{prefix}',
    handler: function(request, reply) {
      // let regex = {$regex : ".*" + request.params.query + ".*", $options: 'i'}   
      let regex = {
          $regex: new RegExp("^" + request.params.prefix)
        }
        // console.log(regex);

      // db.collection('things').find({}).then((docs) => {

      //   reply(doc)
      // })

      MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to database.");


        var cursor = db.collection('things').find({
          "Word": regex
        }).sort({'Count': -1}).limit(10);
        cursor.toArray(function(err, docs) {

          reply(docs);
          db.close();
        });

      });



    }
  });



  return next();
};

exports.register.attributes = {
  name: 'routes-suggestion'
};