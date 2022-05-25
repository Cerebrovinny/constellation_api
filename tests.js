const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./app');
const Constellation = require('./models/Constellation');
const mongoose = require('mongoose')

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

before(function (done) {
    mongoose.connection.on('open', done)
  })

describe('API Health status return 200', function() {
    it('Status OK', async function() {
        const { res, err } = await chai.request('http://localhost:3000').get('/');
        expect(res.text).to.equal('{"success":true}');
    });
})

describe('POST /constellation', () => {

    it('/ should insert new constellation', async () => {
        const res = await request('http://localhost:3000').post('/constellation').send({
            name: `Test constellation ${Math.random()}`,
            abbreviation: `TC ${Math.random()}`,
            coordinates: Math.random()
        });
        const constellation = await Constellation.findOne({name: 'Test constellation 2'});
        expect(res.status).to.be.equal(201);
        expect(res.body).to.not.be.null;
        expect(constellation).to.not.be.null;
    });

    it('/ should return error message because constellation already exists', async () => {
        const res = await request('http://localhost:3000').post('/constellation').send({
            name: 'Test constellation 2',
            abbreviation: 'TC2',
            coordinates: 1
        });
        expect(res.status).to.be.equal(500);
        expect(res.body).to.not.be.null;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error[0].msg).to.be.equal('Constellation already exists');
    });



});

describe('GET /constellations', () => {
    it('should return all constellations', async () => {
        const res = await request('http://localhost:3000').get('/constellation');
        expect(res.statusCode).to.be.equal(200);
       // expect(res.body.map(c => c.name)).toEqual(expect.arrayContaining(['Andromeda', 'Aquarius']));
    });
});

describe('/PATCH/:id constellation', () => {
    it('it should UPDATE a constellation given the id', async () => {
        const data = {
            name: `Test ${Math.random()}`,
            abbreviation: `TST${Math.random()}`,
            coordinates: Math.random()
        }
        
        const res =  await request('http://localhost:3000').patch('/constellation/628e6d26df484ce449106e26')
                .send(data)

                console.log()
                    expect(res.body).to.not.be.null;
                    expect(res.body).to.be.an('object');
    });
});

// after(async () => {
//     await Constellation.deleteMany();
// });