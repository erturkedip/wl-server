module.exports = (app) => {
    const words = require('../controllers/word.controllers.js');

    app.get('/', function(req, res) {
		res.end("WordLine Uygulaması Rest API");
	});

    // Create a new Word
    app.post('/word', words.create);

    // Retrieve all Words
    app.get('/word', words.findAll);

    // Retrieve a single Word with wordId
    app.get('/word/:wordId', words.findOne);

    // Update a Word with wordId
    app.put('/word/:wordId', words.update);

    // Delete a Word with wordId
    app.delete('/word/:wordId', words.delete);
}