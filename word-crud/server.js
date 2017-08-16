'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();

const url = 'mongodb://localhost:27017/mydb';



server.connection({
    port: 3000,
    routes: {
        cors: true
    }
});

// MongoClient.connect(url, function(err, db) {
//     console.log("Connected correctly to database.");
//     server.app.db = db;
//     // console.log(db)
//     // var cursor = db.collection('things').find({"Word" : /^fa/ });
//     //     cursor.each(function(err, doc) {  
//     //       console.log(doc)

//     //     });

// });
//Connect to db
server.app.db = require('monk')(url)


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