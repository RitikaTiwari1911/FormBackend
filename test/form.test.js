const chai = require('chai');
const chaiHttp = require('chai-http');
const {response} = require('express');
const server = require('../server');
const testData = require('./testData.json')

chai.should();

chai.use(chaiHttp);
let userToken = '';

describe('Test for form', () => {
    it('givenProperRegisterInput_should_registerUser', (done) => {
        const userDetails = testData.registerUserData;
        chai.request(server)
            .post('/registerUser')
            .send(userDetails)
            .end((error, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success').eq(true)
                res.body.should.have.property('message').eq('You have been registered successfully!')
                res.body.should.have.property('data');
                done();
            })
    })

    it('givenAlreadyRegisteredEmail_shouldNot_registerUser', (done) => {
        const userDetails = testData.registerUserDataNeg;
        chai.request(server)
            .post('/registerUser')
            .send(userDetails)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.have.property('success').eq(false)
                res.body.should.have.property('message').eq('Email id already exists!')
                done();
            })
    })

    it('givenWrongURL_shouldNot_registerUser', (done) => {
        const userDetails = testData.registerUserData;
        chai.request(server)
            .post('/register')
            .send(userDetails)
            .end((error, res) => {
                res.should.have.status(404);
                done();
            })
    })

    it('givenWrongHttpMethod_shouldNot_registerUser', (done) => {
        const userDetails = testData.registerUserData;
        chai.request(server)
            .get('/registerUser')
            .send(userDetails)
            .end((error, res) => {
                res.should.have.status(404);
                done();
            })
    })

    it('givenInvalidFirstName_shouldNot_registerUser', (done) => {
        const userDetails = testData.invalidFirstName;
        chai.request(server)
            .post('/registerUser')
            .send(userDetails)
            .end((error, res) => {
                res.should.have.status(400);
                res.body.should.have.property('message').eq( "\"firstName\" length must be at least 3 characters long")
                done();
            })
    })
})
