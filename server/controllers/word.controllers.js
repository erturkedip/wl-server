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

};

// Find a single word with a wordId
exports.findOne = (req, res) => {

};

// Update a word identified by the wordId in the request
exports.update = (req, res) => {

};

// Delete a word with the specified wordId in the request
exports.delete = (req, res) => {

};