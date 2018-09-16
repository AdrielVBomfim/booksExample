const request = require('supertest');
const app = require('../../index');

// observação, caso necessário, alterar auth por authentication no test. Vi que isso foi alterado no index

beforeAll(async () => {
    await request(app)
        .post('/members')
        .send({
            name: 'Fulaninho',
            memberID: '1',
            bithday: '1988-07-04 06:00',
            admissionDate: '2014-07-04 06:00',
            email: 'adrielbomfim@softeam.com.br',
            password: '12345',
            sector: 'Desenvolvedor Back-end'
        });
});

    // authController test
describe('Test POST /auth', () => {

    it('It should response the POST method sending a JWT as response', (done) => {
        request(app)
            .post('/auth')
            .send({
                email: 'adrielbomfim@softeam.com.br',
                password: '12345'
            })
            .expect(200)
            .then((res) => {
                expect(jwt.verify(res.body.token, '_cr4sh_')).toBeTruthy();
                done();
            });
    });

    it('It should not response the POST method without an email' , (done) => {
        request(app)
            .post('/auth')
            .send({
                password: '12345'
            })
            .expect(400, done);
    });

    it('It should not response the POST method without a password' , (done) => {
        request(app)
            .post('/auth')
            .send({
                email: 'adrielbomfim@softeam.com.br'
            })
            .expect(400, done);
    });

    it('It should not response the POST method with a nonexistent email' , (done) => {
        request(app)
            .post('/auth')
            .send({
                email: 'fulaninho@softeam.com.br',
                password: '12345'
            })
            .expect(404, done);
    });

    it('It should not response the POST method with an invalid password' , (done) => {
        request(app)
            .post('/auth')
            .send({
                email: 'adrielbomfim@softeam.com.br',
                password: '12354546987845'
            })
            .expect(401, done);
    });

});

    // changeController test
describe('Test PUT /auth/change-password', () => {

    it('It should response the PUT method' , (done) => {
        request(app)
            .put('/auth/change-password')
            .send({
                resetToken: jwt.sign({
                    memberID: '1',
                    name: 'Fulaninho',
                    access: 'M',
                    photo: ''
                }, '_cr4sh_'),
                newPassword: '56789'
            })
            .expect(200, done);
    });

    it('It should not response the PUT method without a password' , (done) => {
        request(app)
            .put('/auth/change-password')
            .send({
                resetToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o'
            })
            .expect(400, done);
    });

    it('It should not response the PUT method without a token' , (done) => {
        request(app)
            .put('/auth/change-password')
            .send({
                newPassword: '8765'
            })
            .expect(400, done);
    });

    it('It should not response the PUT method with an invalid token' , (done) => {
        request(app)
            .put('/auth/change-password')
            .send({
                resetToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hb3NlaUBzb2Z0ZWFtLmNvbS5iciIsInBhc3N3b3JkIjoiNTY3ODkiLCJhY2VzcyI6IkcifQ.S89mXjyWqjFcdbiASnP2_w_2IRLO93Y-ppchoT74G_g',
                newPassword: '56789'
            })
            .expect(401, done);
    });

    it('It should not response the PUT method with a nonexistent email' , (done) => {
        request(app)
            .put('/auth/change-password')
            .send({
                resetToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hb3NlaUBzb2Z0ZWFtLmNvbS5iciIsInBhc3N3b3JkIjoiNTY3ODkiLCJhY2VzcyI6IkcifQ.uzsjXOGxK7t-Cl7n8wQCKGwboNfeLyRzd63PUkZKyMQ',
                newPassword: '56789'
            })
            .expect(404, done);
    });
});

    // resetController test
describe('Test POST /auth/reset-password', () => {

    it('It should response the POST method' , (done) => {
        request(app)
            .post('/auth/reset-password')
            .send({
                email: 'adrielbomfim@softeam.com.br',
            })
            .expect(200, done);
    });

    it('It should not response the POST method without an email' , (done) => {
        request(app)
            .post('/auth/reset-password')
            .send({})
            .expect(400, done);
    });

    it('It should not response the POST method with a nonexistent email' , (done) => {
        request(app)
            .post('/auth/reset-password')
            .send({
                email: 'email-inexistente@softeam.com.br',
            })
            .expect(404, done);
    });
});

afterAll(async () => {
    await request(app)
        .delete('/members/1');
});