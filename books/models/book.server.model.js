const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookModel = new Schema({
    bookId: {
        type: String,
        required: true,
        uppercase: true,
        unique: true
    },
    title: {
        type: String,
    },
    author: {
        type: String
    },
    genre: {
        type: String
    },
    read: {
        type: Boolean
    }
});

module.exports= mongoose.model('Book', bookModel);