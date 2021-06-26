let chai = require('chai');
let chaiHttp = require('chai-http');
require('superagent');
let server = require('../server');
let userInputData = require('./employeeData.json');

//assertion style
let should = chai.should()
chai.use(chaiHttp);
/**
 * POST request test
 * POST Employee Login with Positive and Negative Test
 */
describe('POST /employeeLogin', () => {
    it('It should POST Employee Login Details ', (done) => {
        const employeeData = userInputData.employeeLoginPos
        chai.request(server)
            .post('/employeeLogin')
            .send(employeeData)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("Login Successfully...");
                res.body.should.have.property("token");
                if(err) {
                    return done(err);
                }
                done();
            });
    });

    it('It should POST Invalid password and fails to generate token', (done) => {
        const employeeData = userInputData.employeeLoginNeg
        chai.request(server)
            .post('/employeeLogin')
            .send(employeeData)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property("message").eql("Please enter your correct password...!");
                if(err) {
                    return done(err);
                }
                done();
            });
    });
});