/**
 * @module model/book
 * @file This file has DB methods for book related operations
 * @author vishnu
 */

/** dependencies */
import q from 'q'
import config from 'config';
import logger from 'services/log';
import utility from 'services/utility';
import * as errors from 'middleware/errors';
import apiResponseConstant from 'constant/apiresponseconstant';

/**
 * @class book Model
 * @description This class has methods for book related operations
 */
class bookModel {

    /**
     * @method getAllBooks
     * @description To get the list of books
     * @param connection
     * @param filterOptions
     * @param book_identifier
     * @returns {*}
     */
    getAllBooks(connection, filterOptions, book_identifier = false) {
        let deferred = q.defer();
        let selectSql = "SELECT b.book_identifier, "
            + "       b.book_name, "
            + "       b.published_date, "
            + "       b.author_name "
            + "FROM `book` b WHERE b.`is_deleted` = 0 ";
        if(book_identifier) {
            selectSql += " AND b.`book_identifier` = "+connection.escape(book_identifier)+" ";
        }

        if(Object.keys(filterOptions).length !== 0) {
            selectSql += "ORDER BY "+filterOptions.sortBy+" "+filterOptions.sortOrder+" ";
            if(!filterOptions.skipPaginate) {
                selectSql += " LIMIT "+filterOptions.offset+","+filterOptions.limit+" ";
            }
        }

        connection.query(selectSql, (err, result) => {
            if (err) {
                logger.error('bookModel::getAllBooks',err);
                deferred.reject(new errors.ServerError(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
            } else {
                if(book_identifier) {
                    deferred.resolve(result.length !== 0 ? result[0] : {});
                } else {
                    deferred.resolve(result);
                }
            }
        });
        return deferred.promise;
    }


    /**
     * @method getAllBooksCount
     * @description To get the count of books
     * @param connection
     * @param filterOptions
     * @param book_identifier
     * @returns {*}
     */
    getAllBooksCount(connection, filterOptions, book_identifier = false) {
        let deferred = q.defer();
        let selectSql = "SELECT COUNT(*) AS total_count FROM `book` b WHERE b.`is_deleted` = 0  ";

        connection.query(selectSql, (err, result) => {
            if (err) {
                logger.error('bookModel::getAllBooksCount',err);
                deferred.reject(new errors.ServerError(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
            } else {
                deferred.resolve(result[0]);
            }
        });
        return deferred.promise;
    }

    /**
     * @method getAggregatedCount
     * @description To get the aggregated count of books based on a attribute
     * @param connection
     * @param data
     * @returns {*}
     */
    getAggregatedCount(connection, data) {
        let deferred = q.defer();
        let selectSql = "SELECT COUNT(*) AS total_count FROM `book` b WHERE ";

        if(data.key === 'AUTHOR_NAME') {
            selectSql += " author_name LIKE '%"+data.value+"%' ";
        } else {
            selectSql += " YEAR(published_date) = '"+data.value+"' ";
        }

        connection.query(selectSql, (err, result) => {
            if (err) {
                logger.error('bookModel::getAggregatedCount',err);
                deferred.reject(new errors.ServerError(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
            } else {
                deferred.resolve(result[0]);
            }
        });
        return deferred.promise;
    }

    /**
     * @method createBook
     * @description To create a new book record
     * @param connection {Object} MySQL connection object
     * @param data {Object}
     * @returns {*}
     */
    createBook(connection, data) {
        let deferred = q.defer();
        let current_time = utility.current_datetime();
        let insertSql = "INSERT INTO `book` ( "
            + "  `book_identifier`, "
            + "  `book_name`, "
            + "  `published_date`, "
            + "  `author_name`, "
            + "  `created_at`, "
            + "  `updated_at` "
            + ") "
            + "VALUES (?, ?, ?, ?, ?, ?) ";

        connection.query(insertSql, [data.book_identifier, data.book_name, data.published_date,
                                     data.author_name, current_time, current_time], (err, result) => {
            if (err) {
                logger.error('bookModel::createBook',err);
                deferred.reject(new errors.ServerError(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
            } else {
                deferred.resolve(result);
            }
        });
        return deferred.promise;
    }

    /**
     * @method updateBook
     * @description To update a book record with book identifier
     * @param connection {Object} MySQL connection object
     * @param data {Object}
     * @returns {*}
     */
    updateBook(connection, data) {
        let deferred = q.defer();
        let current_time  = utility.current_datetime();
        let params = [current_time];
        let updateSql = "UPDATE `book` SET `updated_at` = ? ";

        if(data.hasOwnProperty('book_name')) {
            updateSql += " , book_name = "+connection.escape(data.book_name)+" ";
            params.push(data.book_name);
        }
        if(data.hasOwnProperty('published_date')) {
            updateSql += " , published_date = "+connection.escape(data.published_date)+" ";
            params.push(data.published_date);
        }
        if(data.hasOwnProperty('author_name')) {
            updateSql += " ,author_name = "+connection.escape(data.author_name)+" ";
            params.push(data.author_name);
        }

        updateSql += " WHERE `book_identifier` = "+connection.escape(data.book_identifier)+" " ;

        connection.query(updateSql, params, (err, result) => {
            if(err) {
                logger.error('bookModel::updateBook',err);
                deferred.reject(new errors.ServerError(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
            } else {
                deferred.resolve(result);
            }
        });
        return deferred.promise;
    }

    /**
     * @method deleteBook
     * @description To delete a book record with book identifier
     * @param connection {Object} MySQL connection object
     * @param book_identifier {String}
     * @returns {*}
     */
    deleteBook(connection, {book_identifier}) {
        let deferred = q.defer();
        let current_time  = utility.current_datetime();
        let deleteSql = "";
        let params = [];

        if(config.IS_HARD_DELETE_ENABLED) {
            deleteSql += " DELETE FROM `book` WHERE `book_identifier` = ? ";
            params = [book_identifier];
        } else {
            deleteSql += " UPDATE `book` SET `is_deleted` = ?, `updated_at` = ? WHERE `book_identifier` = ? ";
            params = [1, current_time, book_identifier];
        }

        connection.query(deleteSql, params, (err, result) => {
            if(err) {
                logger.error('bookModel::deleteBook',err);
                deferred.reject(new errors.ServerError(apiResponseConstant.UNKNOWN_ERROR_OCCURRED));
            } else {
                deferred.resolve(result);
            }
        });
        return deferred.promise;
    }

}

export default new bookModel();
