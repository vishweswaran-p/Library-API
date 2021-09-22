/**
 * @module controller/book
 * @file This file is the controller for book related operations
 * @author vishnu
 */

/** dependencies */
import q from 'q';
import dbConnection from 'services/mysql';
import utility from 'services/utility';
import apiResponseConstant from 'constant/apiresponseconstant';
import bookModel from 'model/book';
import logger from 'services/log';
import * as errors from 'middleware/errors';

/**
 * @class bookController
 * @description This class has controller methods for book related operations
 */
class bookController {

    /**
     * @method getAllBooks
     * @description To get list of books
     * @param filterOptions
     * @returns {*}
     */
    getAllBooks(filterOptions) {
        let deferred = q.defer();
        let response = {
            list :[],
            count: 0
        };
        dbConnection.getConnection(false, (err, connection) => {
            if(err) {
                deferred.reject(new errors.ServerError(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
            } else {
                bookModel.getAllBooks(connection, filterOptions).then(books => {
                    response.list = books;
                    return bookModel.getAllBooksCount(connection, filterOptions);
                })
                .then(count => {
                    response.count = count.total_count;
                    deferred.resolve(response);
                })
                .catch(err => {
                    if (utility.isApplicationError(err)) {
                        logger.error('bookController::getAllBooks',err);
                        deferred.reject(utility.buildResponse(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
                    } else {
                        deferred.reject(err);
                    }
                })
                .finally(() => {
                    connection.release();
                })
            }
        });
        return deferred.promise;
    }

    /**
     * @method getAggregatedCount
     * @description To get aggregated count based on the given key
     * @param data
     * @returns {*}
     */
    getAggregatedCount(data) {
        let deferred = q.defer();
        dbConnection.getConnection(false, (err, connection) => {
            if(err) {
                deferred.reject(new errors.ServerError(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
            } else {
                bookModel.getAggregatedCount(connection, data).then(result => {
                    deferred.resolve(result);
                })
                .catch(err => {
                    if (utility.isApplicationError(err)) {
                        logger.error('bookController::getAggregatedCount',err);
                        deferred.reject(utility.buildResponse(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
                    } else {
                        deferred.reject(err);
                    }
                })
                .finally(() => {
                    connection.release();
                })
            }
        });
        return deferred.promise;
    }

    /**
     * @method createBook
     * @description To create a new book
     * @param {Object} book
     * @returns {*}
     */
    createBook(book) {
        let deferred = q.defer();
        dbConnection.getConnection(true, (err, connection) => {
            if(err) {
                deferred.reject(new errors.ServerError(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
            } else {
                book.book_identifier = utility.getHashToken();
                bookModel.createBook(connection, book).then(result => {
                    connection.commit();
                    deferred.resolve(book);
                })
                .catch(err => {
                    connection.rollback();
                    if (utility.isApplicationError(err)) {
                        logger.error('bookController::createBook',err);
                        deferred.reject(utility.buildResponse(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
                    } else {
                        deferred.reject(err);
                    }
                })
                .finally(() => {
                    connection.release();
                })
            }
        });
        return deferred.promise;
    }

    /**
     * @method updateBook
     * @description To update a book details
     * @param {Object} book
     * @returns {*}
     */
    updateBook(book) {
        let deferred = q.defer();
        dbConnection.getConnection(true, (err, connection) => {
            if(err) {
                deferred.reject(new errors.ServerError(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
            } else {
                bookModel.updateBook(connection, book).then(result => {
                    connection.commit();
                    deferred.resolve(book);
                })
                .catch(err => {
                    connection.rollback();
                    if (utility.isApplicationError(err)) {
                        logger.error('bookController::updateBook',err);
                        deferred.reject(utility.buildResponse(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
                    } else {
                        deferred.reject(err);
                    }
                })
                .finally(() => {
                    connection.release();
                })
            }
        });
        return deferred.promise;
    }

    /**
     * @method deleteBook
     * @description To delete a book
     * @param {Object} book
     * @returns {*}
     */
    deleteBook(book) {
        let deferred = q.defer();
        dbConnection.getConnection(true, (err, connection) => {
            if(err) {
                deferred.reject(new errors.ServerError(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
            } else {
                bookModel.deleteBook(connection, book).then(result => {
                    connection.commit();
                    deferred.resolve({});
                })
                .catch(err => {
                    connection.rollback();
                    if (utility.isApplicationError(err)) {
                        logger.error('bookController::deleteBook',err);
                        deferred.reject(utility.buildResponse(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
                    } else {
                        deferred.reject(err);
                    }
                })
                .finally(() => {
                    connection.release();
                })
            }
        });
        return deferred.promise;
    }
}

export default new bookController();
