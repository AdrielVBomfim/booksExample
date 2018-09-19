const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookModel = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
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