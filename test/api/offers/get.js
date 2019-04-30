process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../routes/offers.js');
//const conn = require('../../../app.js');

describe('GET /notes', () => {
    // before((done) => {
    //     conn.connect()
    //         .then(() => done())
    //         .catch((err) => done(err));
    // })
    // after((done) => {
    //     conn.connect()
    //         .then(() => done())
    //         .catch((err) => done(err));
    // })

    it('OK, getting a new offer works', (done) => {
        request(app).get('/offers/')
            .then((res) => {
                const body = res.body;
                expect (body.length).to.equal(0);
                done();
            })
            .catch((err) => done(err));
    })

//     it('Fail offer post request', (done) => {
//         request(app).post('/offers')
//             .send({
//                 seatsLeft: 2,
//                 publisher: "5cc799ccfcb85f12d4a525cf"
//             })
//             .then((res) => {
//                 const body = res.body;
//                 console.log(body);
//                 expect(body.errors.text.name).to.equal('Validate edifdddddtor');
//                 done();
//             })
//             .catch((err) => done(err));
    //        });
});
//
