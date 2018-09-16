const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const Router1 = express.Router();

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//server
app.get('/', function(req,res){
  	res.send('Hello World!');
});
app.listen(6969, function(err){
  	console.log('listening on port 6969!');
});

mongoose.connect('mongodb://localhost:27017/exemploBooks', {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;

const bookRouter = require('./books/routes/book.server.router');
app.use('/books', bookRouter(Router1));

module.exports = app;