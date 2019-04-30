process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const request = require('supertest');

const app= require('../../../routes/offers.js');
const conn = require('../../../app.js');

describe('POST /notes', () => {
    before ((done)=> {
        conn.connect()
        .then(() => done()) 
        .catch((err) => done(err));
    })
    after((done) => {
        conn.connect()
            .then(() => done())
            .catch((err) => done(err));
    })

    it('OK, creating a new offer works', (done) =>{
        request(app).post('/offers/')
            .send({ 
                departureDate: "2019-04-30T12:57:32.489Z",
                arrivalDate: "2019-04-30T12:57:32.489Z",
                cityFrom: "Zakopane",
                cityTo: "Wrocław",
                seatsLeft: 2,
                publisher: "5cc799ccfcb85f12d4a525cf"
            })
            .then((res)=> {
             const body = res.body; 
             expect(body).to.constain.property(_id);
             expect(body).to.constain.property(departureDate);
             expect(body).to.constain.property(arrivalDate);
             expect(body).to.constain.property(cityFrom);
             expect(body).to.constain.property(cityTo);
             expect(body).to.constain.property(seatsLeft);
             expect(body).to.constain.property(publisher);
             done();
    })
    .catch((err)=> done(err));
    });

    it('Fail offer post request', (done) => {
        request(app).post('/offers')
            .send({
                seatsLeft: 2,
                publisher: "5cc799ccfcb85f12d4a525cf"
            })
            .then((res) => {
                const body = res.body;
                console.log(body);
                expect(body.errors.text.name).to.equal('Validate edifdddddtor')
                done();
            })
            .catch((err) => done(err));
    });
})