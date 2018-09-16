const express = require('express');
const bookController = require('../controllers/book.server.controller');

module.exports = (booksRouter) => {
    booksRouter.route('/')
        .get(bookController.getAll)
        .post(bookController.create);
    booksRouter.route('/:id')
        .get(bookController.getOne)
        .put(bookController.update)
        .delete(bookController.remove);
    return booksRouter;
};