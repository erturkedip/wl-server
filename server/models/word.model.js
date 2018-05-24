const mongoose = require('mongoose');

const WordSchema = mongoose.Schema({
    source: String,
    target: String,
    origin: String,
    translation: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Word', WordSchema);