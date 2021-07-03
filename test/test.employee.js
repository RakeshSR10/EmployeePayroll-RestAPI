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
        let employeeRegData = userInputData.employeeRegister
        chai.request(server)
            .post('/employeeRegister')
            .send(employeeRegData)
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
        let employeeRegData = userInputData.employeeRegNeg
        chai.request(server)
            .post('/employeeRegister')
            .send(employeeRegData)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property("success").eql(false);
                res.body.should.have.property("message").eql("Email already in use");
                res.body.should.have.property("data").eql(null);
                if(error) {
                    return done(error);
                }
                done();
            });
    });

    it("It should not able to post request for registration details without firstName", (done) => {
        const employeeRegDataNoFirstName = userInputData.registerWithoutFirstName
        chai.request(server)
            .post("/employeeRegister")
            .send(employeeRegDataNoFirstName)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property("message").eql('\"firstName\" is not allowed to be empty')
                if(error){
                    return done(error);
                }
                done();
        })
    })

    it("It should not able to post request for registration details without lastName", (done) => {
        const employeeRegDataNoLastName = userInputData.registerWithoutLastName
        chai.request(server)
            .post("/employeeRegister")
            .send(employeeRegDataNoLastName)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property("message").eql('\"lastName\" is not allowed to be empty')
                if(error){
                    return done(error);
                }
            done();
        })
    })

    it("It should not able to post request for registration details without emailId", (done) => {
        const employeeRegDataNoEmail = userInputData.registerWithoutEmail
        chai.request(server)
            .post("/employeeRegister")
            .send(employeeRegDataNoEmail)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property("message").eql('\"emailId\" is not allowed to be empty')
                if(error){
                    return done(error);
                }
            done();
        })
    })

    it("It should not able to post request for registration details without password", (done) => {
        const employeeRegDataNoPassword = userInputData.registerWithoutPassword
        chai.request(server)
            .post("/employeeRegister")
            .send(employeeRegDataNoPassword)
            .end((error, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property("message").eql('\"password\" is not allowed to be empty')
                if(error){
                    return done(error);
                }
            done();
        })
    })

});

/**
 * GET API test for retrieve all employees
 */
 describe('Employee Payroll API', () => {

    let token = '';

    beforeEach(done => {
        chai.request(server)
            .post('/employeeLogin')
            .send(userInputData.employeeLoginPos)
            .end((error, res) => {
                token = res.body.token;
                res.should.have.status(200);
                if(error) {
                    return done(error);
                }
                done();
            });
    });

    /**
    * /GET request test- Get all employee data from database Test 
    */
    describe('GET /employees', () => {
        it("It should get all the employees details from database", (done) => {
            chai.request(server)
                .get('/employees')
                .set('token', token)
                .end((error, res) => {
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
    /**
    * /GET request test - Get single employee details from database Test 
    */
    describe('GET /employees/:_id', () =>{
        it("It should retrieve single employee details using valid token and id", (done) =>{
           chai.request(server)
                .get('/employees/60d87c7512a0432878b18e42')
                .set('token', token)
                .end((error, res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Successfully retrieving single employee details");
                    res.body.should.have.property("data").should.be.a('object');
                    if(error) {
                        return done(error);
                    }
                    done();
                });
        });
    });

    describe('GET /employees/:_id', () =>{
        it("It should not retrieve single employee details using valid token and invalid id", (done) =>{
           chai.request(server)
                .get('/employees/60d87c7512a0432878b18')
                .set('token', token)
                .end((error, res) =>{
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(false);
                    res.body.should.have.property("message").eql("Error while retrieving single employee details");
                    res.body.should.have.property("data").should.be.a('object');
                    if(error) {
                        return done(error);
                    }
                    done();
                });
        });
    });
    /**
     * /PUT request test
     * Update employee details into database for existing employee test
     */
    describe('PUT /update/:_id', () =>{
        it("It should able to update existing employee details using id", (done) =>{
            chai.request(server)
                .put('/update/60d87c7512a0432878b18e42')
                .send(userInputData.employeeUpdate)
                .set('token', token)
                .end((error, res) =>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Employee details updating successfully");
                    res.body.should.have.property("data").should.be.a('object');
                    if(error) {
                        return done(error);
                    }
                    done();
                });
        });

        it("It should not able update without firstName empty", (done) => {
            chai.request(server)
                .put('/update/60d87c7512a0432878b18e42')
                .send(userInputData.employeeUpdateNeg)
                .set('token', token)
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
    })

    /**
     * /DELETE request test - Deleting employee details from database using their Id
     */
    describe('DELETE /delete/:_id', () => {
        it("It should able to delete employee details using valid token and Id successfully", (done) =>{
            chai.request(server)
                .delete('/delete/60d88e7804ab6633e8b09d61')
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql('Successfully deleted employee details');
                    res.body.should.have.property("data").should.be.a('object');
                    if(error) {
                        return done(error);
                    }
                    done();
                });
        });

        it("It should not able to delete with invalid id", (done) => {
            chai.request(server)
                .delete('/delete/60e0114336026b35082294')
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(false);
                    res.body.should.have.property("message").eql("Given Employee not found");
                    if(error) {
                        return done(error);
                    }
                    done();
                });
        });
    })
});   