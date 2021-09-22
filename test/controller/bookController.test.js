/** dependencies */
import chai from 'chai';
import sinon from 'sinon';
import bookController from 'controller/book';
import bookModel from 'model/book';
import {describe} from "mocha";
import * as errors from 'middleware/errors';
import apiResponseConstant from 'constant/apiresponseconstant';

const expect = chai.expect;
chai.use(require('chai-http'));

process.env.NODE_ENV = 'test';

describe('#Book Controller' , () => {


    describe('getAllBooks', () => {

        it('Should return empty list', (done)  => {
            let getAllBooksStub = sinon.stub(bookModel, 'getAllBooks');
            getAllBooksStub.resolves([]);
            let getAllBooksCountStub = sinon.stub(bookModel,'getAllBooksCount');
            getAllBooksCountStub.resolves({total_count: 0});
            bookController.getAllBooks({})
            .then(result => {
                expect(result.list).to.be.an("Array");
                expect(result.count).to.be.an("Number");
                expect(result.count).to.equal(0);
                done();
            })
            .finally(() => {
                getAllBooksStub.restore();
            })
        });

        it('Should return error response', (done)  => {
            let getAllBooksStub = sinon.stub(bookModel, 'getAllBooks');
            getAllBooksStub.rejects(new errors.ServerError(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
            bookController.getAllBooks({})
            .catch(err => {
                expect(err.message).to.be.an("String");
                expect(err.status).to.be.an("Number");
                expect(err.status).to.equal(500);
                done();
            })
            .finally(() => {
                getAllBooksStub.restore();
            })
        });
    });

    describe('getAggregatedCount', () => {

        it('Should return count value', (done)  => {
            let getAggregatedCountStub = sinon.stub(bookModel, 'getAggregatedCount');
            getAggregatedCountStub.resolves({total_count: 0});
            bookController.getAggregatedCount({})
            .then(result => {
                expect(result.total_count).to.be.an("Number");
                expect(result.total_count).to.equal(0);
                done();
            })
            .finally(() => {
                getAggregatedCountStub.restore();
            })
        });

        it('Should return error response', (done)  => {
            let getAggregatedCountStub = sinon.stub(bookModel, 'getAggregatedCount');
            getAggregatedCountStub.rejects(new errors.ServerError(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
            bookController.getAggregatedCount({})
            .catch(err => {
                expect(err.message).to.be.an("String");
                expect(err.status).to.be.an("Number");
                expect(err.status).to.equal(500);
                done();
            })
            .finally(() => {
                getAggregatedCountStub.restore();
            })
        });
    });

    describe('createBook', () => {

        it('Should return success object', (done)  => {
            let createBookStub = sinon.stub(bookModel, 'createBook');
            createBookStub.resolves({});
            bookController.createBook({})
            .then(result => {
                expect(result).to.be.an("Object");
                done();
            })
            .finally(() => {
                createBookStub.restore();
            })
        });

        it('Should return error response', (done)  => {
            let createBookStub = sinon.stub(bookModel, 'createBook');
            createBookStub.rejects(new errors.ServerError(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
            bookController.createBook({})
            .catch(err => {
                expect(err.message).to.be.an("String");
                expect(err.status).to.be.an("Number");
                expect(err.status).to.equal(500);
                done();
            })
            .finally(() => {
                createBookStub.restore();
            })
        });
    });

    describe('updateBook', () => {

        it('Should return success object', (done)  => {
            let updateBookStub = sinon.stub(bookModel, 'updateBook');
            updateBookStub.resolves({});
            bookController.updateBook({})
            .then(result => {
                expect(result).to.be.an("Object");
                done();
            })
            .finally(() => {
                updateBookStub.restore();
            })
        });

        it('Should return error response', (done)  => {
            let updateBookStub = sinon.stub(bookModel, 'updateBook');
            updateBookStub.rejects(new errors.ServerError(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
            bookController.updateBook({})
            .catch(err => {
                expect(err.message).to.be.an("String");
                expect(err.status).to.be.an("Number");
                expect(err.status).to.equal(500);
                done();
            })
            .finally(() => {
                updateBookStub.restore();
            })
        });
    });

    describe('deleteBook', () => {

        it('Should return success object', (done)  => {
            let deleteBookStub = sinon.stub(bookModel, 'deleteBook');
            deleteBookStub.resolves({});
            bookController.deleteBook({})
            .then(result => {
                expect(result).to.be.an("Object");
                done();
            })
            .finally(() => {
                deleteBookStub.restore();
            })
        });

        it('Should return error response', (done)  => {
            let deleteBookStub = sinon.stub(bookModel, 'deleteBook');
            deleteBookStub.rejects(new errors.ServerError(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
            bookController.deleteBook({})
            .catch(err => {
                expect(err.message).to.be.an("String");
                expect(err.status).to.be.an("Number");
                expect(err.status).to.equal(500);
                done();
            })
            .finally(() => {
                deleteBookStub.restore();
            })
        });
    });

});
