const server = require('http').createServer();
const io = require('socket.io')(server);
const SummaryTool = require('./summary');
const htmlToText = require('html-to-text');
const retext = require('retext');
const keywords = require('retext-keywords');
const nlcstToString = require('nlcst-to-string');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/vocabulary';

server.listen(3000, () => {
	console.log('listening on *:3000');
});

io.on('connection', function(socket) {
	console.log('a user connected');
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});

	socket.on('suggestion', function(data) {
		console.log(data);

		var {
			topic,
			prefix
		} = data;

		// console.log(prefix); 

		let regex = {
			$regex: new RegExp("^" + prefix)
		}

		MongoClient.connect(url, function(err, db) {
			// console.log("Connected correctly to database.");

			var cursor = db.collection(topic).find({
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

	socket.on('follower', function(data) {
		console.log(data);
		var {
			topic,
			preword
		} = data;

		MongoClient.connect(url, function(err, db) {
			// console.log("Connected correctly to database.");

			var cursor = db.collection(topic).find({
				"Word": preword
			});


			cursor.toArray(function(err, docs) {
				socket.emit('follower', docs)

				db.close();
			});

		});


	});

	socket.on('summarize', function(html) {

		var content = htmlToText.fromString(html);
		// console.log(content);
		// console.log(JSON.stringify(content));
		var keyWords;

		retext()
			.use(keywords)
			.process(content, function(err, file) {
				if (err) throw err;

				keyWords = file.data.keyphrases.map(function(phrase) {
					return phrase.matches[0].nodes.map(nlcstToString).join('');

				});



			});


		SummaryTool.summarize('', content, function(err, summary) {
			if (err) console.log("Something went wrong man!");

			// console.log(summary);
			var data = {
				summary: summary,
				contentLength: content.length,
				summaryLength: summary.length,
				summaryRatio: (100 - (100 * (summary.length / content.length))),
				keyWords: keyWords

			}
			socket.emit('summarize', data)
		});

	});
});