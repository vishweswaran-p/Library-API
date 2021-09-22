/**
 * @module router/book
 * @file This file has the endpoints for book related operations
 * @author vishnu
 */

/** dependencies */
import bookController from 'controller/book';
import validationService from 'services/validation';
import * as bookValidators from 'validators/bookValidators';

/**
 * @class bookRouter
 * @description This class has router middleware for book related operations
 */
class bookRouter {

    getAllBooks(req, res) {
        validationService.validateRequestQueryParams(req, "getAllBooks").then(result => {
            return bookController.getAllBooks(req.query);
        })
        .then(res.$end)
        .catch(res.$end)
    }

    getAggregatedCount(req, res) {
        validationService.validateRequestParams(req, bookValidators.aggregationKey).then(result => {
            return bookController.getAggregatedCount(req.params);
        })
        .then(res.$end)
        .catch(res.$end)
    }

    createBook(req, res) {
        validationService.validateRequestBody(req, bookValidators.createBook).then(result => {
            return bookController.createBook(req.body);
        })
        .then(res.$end)
        .catch(res.$end)
    }

    updateBook(req, res) {
        validationService.validateRequestParams(req, bookValidators.bookIdentifier).then(result => {
            return validationService.validateRequestBody(req, bookValidators.updateBook);
        })
        .then(result => {
            req.body.book_identifier = req.params.book_identifier;
            return bookController.updateBook(req.body);
        })
        .then(res.$end)
        .catch(res.$end)
    }

    deleteBook(req, res) {
        validationService.validateRequestParams(req, bookValidators.bookIdentifier).then(result => {
            return bookController.deleteBook(req.params);
        })
        .then(res.$end)
        .catch(res.$end)
    }
}

export default new bookRouter();
