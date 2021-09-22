/** dependencies */
import chai from 'chai';
import sinon from 'sinon';
import server from '../../bin/www';
import bookController from 'controller/book';
import validationService from 'services/validation';
import {describe} from "mocha";
import * as errors from 'middleware/errors';
import apiResponseConstant from 'constant/apiresponseconstant';


const expect = chai.expect;
chai.use(require('chai-http'));

process.env.NODE_ENV = 'test';

describe('#Book Router' , () => {

    let validationQueryStub;
    let validateBodyStub;
    let validateParamsStub;

    beforeEach(() => {
        validationQueryStub = sinon.stub(validationService,'validateRequestBody').resolves(true);
        validateBodyStub = sinon.stub(validationService,'validateRequestQueryParams').resolves(true);
        validateParamsStub = sinon.stub(validationService,'validateRequestParams').resolves(true);
    });

    afterEach(() => {
        validationQueryStub.restore();
        validateBodyStub.restore();
        validateParamsStub.restore();
    });

    describe('GET /book' , () => {

        it('Should return 200 success response', (done)  => {
            let getAllUsersStub = sinon.stub(bookController,'getAllBooks');
            getAllUsersStub.resolves({});
            chai.request(server)
            .get('/api/v1/book')
            .end((err, res) => {
                expect(res.body.code).to.equal("0000");
                expect(res.body.status).to.equal("success");
                expect(res.body.data).to.be.an("Object");
                expect(res.statusCode).to.equal(200);
                getAllUsersStub.restore();
                done();
            });
        });

        it('Should return 500 failure response', (done)  => {
            let getAllUsersStub = sinon.stub(bookController,'getAllBooks');
            getAllUsersStub.rejects(new errors.ServerError(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
            chai.request(server)
            .get('/api/v1/book')
            .end((err, res) => {
                expect(res.body.code).to.equal("1001");
                expect(res.body.status).to.equal("failure");
                expect(res.body.message).to.be.an("String");
                expect(res.statusCode).to.equal(500);
                getAllUsersStub.restore();
                done();
            });
        });
    });

    describe('GET /book/count/:key/:value' , () => {

        it('Should return 200 success response', (done)  => {
            let getAllUsersStub = sinon.stub(bookController,'getAggregatedCount');
            getAllUsersStub.resolves({});
            chai.request(server)
                .get('/api/v1/book/count/PUBLISHED_DATE/2019')
                .end((err, res) => {
                    expect(res.body.code).to.equal("0000");
                    expect(res.body.status).to.equal("success");
                    expect(res.body.data).to.be.an("Object");
                    expect(res.statusCode).to.equal(200);
                    getAllUsersStub.restore();
                    done();
                });
        });

        it('Should return 500 failure response', (done)  => {
            let getAllUsersStub = sinon.stub(bookController,'getAggregatedCount');
            getAllUsersStub.rejects(new errors.ServerError(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
            chai.request(server)
                .get('/api/v1/book/count/PUBLISHED_DATE/2019')
                .end((err, res) => {
                    expect(res.body.code).to.equal("1001");
                    expect(res.body.status).to.equal("failure");
                    expect(res.body.message).to.be.an("String");
                    expect(res.statusCode).to.equal(500);
                    getAllUsersStub.restore();
                    done();
                });
        });
    });

    describe('POST /book' , () => {

        it('Should return 200 success response', (done)  => {
            let getAllUsersStub = sinon.stub(bookController,'createBook');
            getAllUsersStub.resolves({});
            chai.request(server)
                .post('/api/v1/book')
                .send({})
                .end((err, res) => {
                    expect(res.body.code).to.equal("0000");
                    expect(res.body.status).to.equal("success");
                    expect(res.body.data).to.be.an("Object");
                    expect(res.statusCode).to.equal(200);
                    getAllUsersStub.restore();
                    done();
                });
        });

        it('Should return 500 failure response', (done)  => {
            let getAllUsersStub = sinon.stub(bookController,'createBook');
            getAllUsersStub.rejects(new errors.ServerError(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
            chai.request(server)
                .post('/api/v1/book')
                .send({})
                .end((err, res) => {
                    expect(res.body.code).to.equal("1001");
                    expect(res.body.status).to.equal("failure");
                    expect(res.body.message).to.be.an("String");
                    expect(res.statusCode).to.equal(500);
                    getAllUsersStub.restore();
                    done();
                });
        });
    });

    describe('PUT /book/book_identifier_value' , () => {

        it('Should return 200 success response', (done)  => {
            let getAllUsersStub = sinon.stub(bookController,'updateBook');
            getAllUsersStub.resolves({});
            chai.request(server)
                .put('/api/v1/book/book_identifier_value')
                .send({})
                .end((err, res) => {
                    expect(res.body.code).to.equal("0000");
                    expect(res.body.status).to.equal("success");
                    expect(res.body.data).to.be.an("Object");
                    expect(res.statusCode).to.equal(200);
                    getAllUsersStub.restore();
                    done();
                });
        });

        it('Should return 500 failure response', (done)  => {
            let getAllUsersStub = sinon.stub(bookController,'updateBook');
            getAllUsersStub.rejects(new errors.ServerError(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
            chai.request(server)
                .put('/api/v1/book/book_identifier_value')
                .send({})
                .end((err, res) => {
                    expect(res.body.code).to.equal("1001");
                    expect(res.body.status).to.equal("failure");
                    expect(res.body.message).to.be.an("String");
                    expect(res.statusCode).to.equal(500);
                    getAllUsersStub.restore();
                    done();
                });
        });
    });

    describe('DELETE /book/book_identifier_value' , () => {

        it('Should return 200 success response', (done)  => {
            let getAllUsersStub = sinon.stub(bookController,'updateBook');
            getAllUsersStub.resolves({});
            chai.request(server)
                .put('/api/v1/book/book_identifier_value')
                .send({})
                .end((err, res) => {
                    expect(res.body.code).to.equal("0000");
                    expect(res.body.status).to.equal("success");
                    expect(res.body.data).to.be.an("Object");
                    expect(res.statusCode).to.equal(200);
                    getAllUsersStub.restore();
                    done();
                });
        });

        it('Should return 500 failure response', (done)  => {
            let getAllUsersStub = sinon.stub(bookController,'updateBook');
            getAllUsersStub.rejects(new errors.ServerError(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
            chai.request(server)
                .put('/api/v1/book/book_identifier_value')
                .send({})
                .end((err, res) => {
                    expect(res.body.code).to.equal("1001");
                    expect(res.body.status).to.equal("failure");
                    expect(res.body.message).to.be.an("String");
                    expect(res.statusCode).to.equal(500);
                    getAllUsersStub.restore();
                    done();
                });
        });
    });
});
