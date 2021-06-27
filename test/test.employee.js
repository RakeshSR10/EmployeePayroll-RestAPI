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
        let employeeData = userInputData.employeeRegisterPos
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

    it('It should not be able make POST request for registration and throw message for user about first name is empty', (done) => {
        let employeeData = userInputData.employeeRegNeg
        chai.request(server)
            .post('/employeeRegister')
            .send(employeeData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"firstName\" is not allowed to be empty");
                if(error) {
                    return done(error);
                }
                done();
            });
    });

    it('It should not be able make POST request for registration and throw message for user about last name is empty', (done) => {
        let employeeData = userInputData.employeeRegNegLastName
        chai.request(server)
            .post('/employeeRegister')
            .send(employeeData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"lastName\" is not allowed to be empty");
                if(error) {
                    return done(error);
                }
                done();
            });
    });

    it('It should not be able make POST request for registration and throw message for user about emailId is invalid', (done) => {
        let employeeData = userInputData.employeeRegNegEmailId
        chai.request(server)
            .post('/employeeRegister')
            .send(employeeData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"emailId\" must be a valid emailId");
                if(error) {
                    return done(error);
                }
                done();
            });
    });

    it('It should not be able make POST request for registration and throw message for user about password is empty', (done) => {
        let employeeData = userInputData.employeeRegNegPassword
        chai.request(server)
            .post('/employeeRegister')
            .send(employeeData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("message").eql("\"password\" is not allowed to be empty");
                if(error) {
                    return done(error);
                }
                done();
            });
    });
})