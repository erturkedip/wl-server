const Word = require('../models/word.model.js');

// Create and Save a new Word
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Word content can not be empty"
        });
    }

    const word = new Word({
        source: req.body.source,
        target: req.body.target,
        origin: req.body.origin,
        translation: req.body.translation
    });

    word.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Word."
            });
        });
};

// Retrieve and return all words from the database.
exports.findAll = (req, res) => {
    Word.find()
        .then(words => {
            res.send(words);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving words."
            });
        });
};

// Find a single word with a wordId
exports.findOne = (req, res) => {
    Word.findById(req.params.wordId)
        .then(word => {
            if (!word) {
                return res.status(404).send({
                    message: "Word not found with id " + req.params.wordId
                });
            }
            res.send(word);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Word not found with id " + req.params.wordId
                });
            }
            return res.status(500).send({
                message: "Error retrieving word with id " + req.params.wordId
            });
        });
};

// Update a word identified by the wordId in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Word body can not be empty"
        });
    }

    // Find word and update it with the request body
    Word.findByIdAndUpdate(req.params.wordId, {
        source: req.body.source,
        target: req.body.target,
        origin: req.body.origin,
        translation: req.body.translation
    }, { new: true })
        .then(word => {
            if (!word) {
                return res.status(404).send({
                    message: "Word not found with id " + req.params.wordId
                });
            }
            res.send(word);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Word not found with id " + req.params.wordId
                });
            }
            return res.status(500).send({
                message: "Error updating word with id " + req.params.wordId
            });
        });
};

// Delete a word with the specified wordId in the request
exports.delete = (req, res) => {
    Word.findByIdAndRemove(req.params.wordId)
    .then(word => {
        if(!word) {
            return res.status(404).send({
                message: "Word not found with id " + req.params.wordId
            });
        }
        res.send({message: "Word deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Word not found with id " + req.params.wordId
            });                
        }
        return res.status(500).send({
            message: "Could not delete word with id " + req.params.wordId
        });
    });
};