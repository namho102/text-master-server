var vfile = require('to-vfile');
var retext = require('retext');
var keywords = require('retext-keywords');
var nlcstToString = require('nlcst-to-string');

retext()
  .use(keywords)
  .process(vfile.readSync('example.txt'), function (err, file) {
    if (err) throw err;

    console.log('Keywords:');

    var keyWords = file.data.keyphrases.map(function (phrase) {
      return phrase.matches[0].nodes.map(nlcstToString).join('');

    });

    console.log(keyWords);

  }
);