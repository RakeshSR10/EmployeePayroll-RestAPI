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
     
    it('It should not be able make POST request for registration details', (done) => {
        let employeeData = userInputData.employeeRegNeg
        chai.request(server)
            .post('/employeeRegister')
            .send(employeeData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(false);
                res.body.should.have.property("message").eql("Email exists");
                res.body.should.have.property("data").eql(null);
                done();
            });
    });

});

/**
 * GET API test for retrieve all the employees
 */
describe('Employees Payroll API', () => {
    let token = '';
    beforeEach(done => {
        chai.request(server)
            .post('employeeLogin')
            .send(userInputData.employeeLoginPos)
            .end((error, res) =>{
                token = res.body.token;
                res.should.have.status(200)
                if(error) {
                    return done(error);
                }
                done();
            });
    });

    /**
     * GET request test
     * Positive and Negative test for retrieving employee data from database
     */
    describe('GET /employees', () =>{
        it('It should retrieve all Employee details from database', (done) => {
            chai.request(server)
                .get('employees')
                .set('token', token)
                .end((error, res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Details of all the Employees");
                    res.body.should.have.property("data").should.be.a('object');
                    if(error) {
                        return done(error);
                    }
                    done();
                });
        });        
    });   
    
})