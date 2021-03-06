const Book = require('../models/book.server.model');

const getAll = async(req, res) => {
    try{
        const books = await Book.find({}).select({_id: 0, _v: 0});
        return res.status(200).send(books);
    }
    catch (err) {
        return res.status(500).send({error: err, message: 'Erro interno do servidor'});
    }
};

const getOne = async(req, res) => {
    try{
        const book = await Book.findOne({title: req.params.title.toUpperCase()}).select({_id: 0, _v: 0});

        if(!book) return res.status(404).send({message: 'Livro não encontrado'});

        return res.status(200).send(book);
    }
    catch (err) {
        return res.status(500).send({error: err, message: 'Erro interno do servidor'});
    }
};

const create = async(req, res) => {
    try{
        const newBook = new Book(req.body);

        if(!newBook.title) return res.status(400).send({message: 'Titulo do livro não foi mandado'});

        await newBook.save(function (err) {
            if(!err){
                return res.status(201).send({message: 'Livro cadastrado com sucesso'});
            }
            else if(err.code === 11000){
                console.log(err);
                return res.status(400).send({message: 'Livro já está cadastrado'});
            }
            else{
                return res.status(500).send({error: err, message: 'Erro interno do servidor'});
            }
        });

    }
    catch (err){
        return res.status(500).send({error: err, message: 'Erro interno do servidor'});
    }
};

const update = async(req, res) => {
    try{
        const book = await Book.findOne({title: req.params.title.toUpperCase()});

        if(!book) return res.status(404).send({message: 'Livro não encontrado'});

        if(req.body.title) delete req.body.title;

        await Object.assign(book, req.body).save();
        return res.status(200).send({message: 'Livro atualizado'});
    }
    catch (err) {
        return res.status(500).send({error: err, message: 'Erro interno do servidor'});
    }
};

const remove = async(req, res) => {
    try{
        const book = await Book.findOneAndRemove({title: req.params.title.toUpperCase()}).select({_id: 0, _v: 0});

        if(!book) return res.status(404).send({message: 'Livro não encontrado'});

        return res.status(200).send({message: 'Livro deletado com sucesso'});
    }
    catch (err) {
        return res.status(500).send({error: err, message: 'Erro interno do servidor'});
    }
};


module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
};