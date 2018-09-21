const request = require('supertest');
const app = require('../../app');

beforeEach(async () => {
    await request(app)
        .post('/books')
        .send({
            title : 'Game of Thrones',
            author : 'George R.R Martin',
            genre : 'Fantasy',
            read : false
        });
});

    // authController test
describe('Test GET /books', () => {
    it('It should respond the GET method sending back an array', (done) =>{
        request(app)
            .get('/books')
            .send()
            .expect(200)
            .then((res) => {
                expect(Array.isArray(res.body)).toBeTruthy();
                done();
            });
    });
});

describe('Test GET /books/:title', () => {
    it('It should respond the GET method sending back an object', (done) =>{
        request(app)
            .get('/books/Game of Thrones')
            .send()
            .expect(200)
            .then((res) => {
                expect(res.body).toBeTruthy();
                done();
            });
    });

    it('It should not respond the GET method with a nonexistent book', (done) =>{
        request(app)
            .get('/books/Monogatari')
            .send()
            .expect(404, done);
    });
});

describe('Test POST /books', () => {
    it('It should respond the POST method with a nonexistent book', (done) =>{
        request(app)
            .post('/books')
            .send({
                title : 'Harry Potter',
                author : 'J.K Rowling',
                genre : 'Fantasy',
                read : false
            }).expect(201, done);
    });

    it('It should not respond the POST method with a titleless book', (done) =>{
        request(app)
            .post('/books')
            .send({
                author : 'J.K Rowling',
                genre : 'Fantasy',
                read : false
            }).expect(400, done);
    });

    it('It not should respond the POST method with an existent book', (done) =>{
        request(app)
            .post('/books')
            .send({
                title : 'Game of Thrones',
                author : 'George R.R Martin',
                genre : 'Fantasy',
                read : false
            }).expect(400, done);
    });

    afterAll(async () => {
       await request(app)
           .delete('/books/Harry Potter');
    });
});

describe('Test PUT /books/:title', () => {
    it('It should respond the PUT method with a book atributte', (done) =>{
        request(app)
            .put('/books/Game of Thrones')
            .send({
                read: true
            }).expect(200, done);
    });

    it('It should not respond the PUT method with a nonexistent title', (done) =>{
        request(app)
            .put('/books/Crime e Castigo')
            .send()
            .expect(404, done);
    });
});

describe('Test DELETE /books/:title', () => {
    it('It should respond the DELETE method with a existent title', (done) =>{
        request(app)
            .delete('/books/Game of Thrones')
            .send()
            .expect(200, done);
    });

    it('It should not respond the DELETE method with a nonexistent title', (done) =>{
        request(app)
            .delete('/books/Quincas Borba')
            .send()
            .expect(404, done);
    });
});

afterEach(async () => {
    await request(app)
        .delete('/books/Game of Thrones');
});