//assertion library
let chai = require('chai');
let chaiHttp = require('chai-http');
//test http request
require('superagent')
let server = require('../server');
let userInputData = require('./employeeData.json');

//assertion style
chai.should()
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

/**
 * POST request test
 * Positive and Negative - Registration Test 
 */
describe('POST /employeeRegister', () => {
    it('It should POST New Employee registered successfully', (done) => {
        let employeeData = userInputData.employeeRegister
        chai.request(server)
            .post('/employeeRegister')
            .send(employeeData)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(true);
                res.body.should.have.property("message").eql("Employee registered successfully.");
                res.body.should.have.property("data").should.be.a('object');
                if(err) {
                    return done(err);
                }
                done();
            });
    });  
})