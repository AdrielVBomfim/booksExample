const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

beforeEach(async () => {
    await request(app)
        .post('/books')
        .send({
            title : 'Game of Thrones',
            author : 'George R.R Martin',
            genre : 'Fantasy',
            read : false,
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
    })
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
            .get('/books/Livro Null')
            .send()
            .expect(404, done);
    })
});

afterEach(async () => {
    await request(app)
        .delete('/books/Game of Thrones');
});