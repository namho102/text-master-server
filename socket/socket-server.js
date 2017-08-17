const server = require('http').createServer();
const io = require('socket.io')(server);
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/mydb';


server.listen(3000, () => {
	console.log('listening on *:3000');
});

io.on('connection', function(socket) {
	console.log('a user connected');
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});

	socket.on('suggestion', function(prefix) {
		console.log(prefix);
		
		let regex = {
			$regex: new RegExp("^" + prefix)
		}

		MongoClient.connect(url, function(err, db) {
			// console.log("Connected correctly to database.");

			var cursor = db.collection('things').find({
				"Word": regex
			}).sort({
				'Count': -1
			}).limit(10);
		
			cursor.toArray(function(err, docs) {
				socket.emit('suggestion', docs)

				db.close();
			});

		});

	});
});