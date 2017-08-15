'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
    port: 3000,
    routes: { cors: true }
});

//Connect to db
// server.app.db = mongojs(config.database);

// bring your own validation function
var validate = function (decoded, request, callback) {
    if (decoded._id) {
      return callback(null, true);
    }
    return callback(null, false);
};

//Load plugins and start server
server.register([

    require('./routes/suggestion'),

], (err) => {

    if (err) {
        throw err;
    }

    // Start the server
    server.start((err) => {
        console.log('Server running at:', server.info.uri);
    });

});