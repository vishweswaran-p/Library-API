/** dependencies */
import mysql from 'mysql';
import mysqlUtilities from 'mysql-utilities';
import config from 'config';
import logger from 'services/log'
import CommonConstant from 'constant/commonconstant';

class mysqlService {

    constructor() {
        this.checkConnectionRelease = CommonConstant.CHECK_CONNECTION_RELEASE;
        this.connectionPoolEnabled = false;
        if (this.checkConnectionRelease) {
            this.request_name = "";
            this.connectionObject = {};
        }
        this.connectionPool = null;
    }

    createConnectionPool() {
        this.connectionPool = mysql.createPool({
            connectionLimit: 100, //important
            host: config.DB_HOST,
            user: config.DB_USER,
            password: config.DB_PASS,
            database: config.DB_NAME,
            debug: false,
            multipleStatements: true
        });
        this.connectionPoolEnabled = true;

        this.connectionPool.on('connection', (connection) => {
            mysqlUtilities.upgrade(connection);
            mysqlUtilities.introspection(connection);
        });

        if (this.checkConnectionRelease) {
            this.connectionPool.on('acquire', (connection) => {
                this.connectionObject[connection.threadId] = this.request_name;
                logger.info('Connection %d acquired : Total : %d, Free : %d', connection.threadId, this.connectionPool._allConnections.length,
                    this.connectionPool._freeConnections.length, this.connectionObject);
            });

            this.connectionPool.on('release', (connection) => {
                this.connectionObject[connection.threadId] = "";
                logger.info('Connection %d released : Total : %d, Free : %d', connection.threadId, this.connectionPool._allConnections.length,
                    this.connectionPool._freeConnections.length, this.connectionObject);
            });
        }
    }

    /**
     * @description Function to get sql connection object
     * @param transaction {Boolean}
     * @param callback
     * @returns {connection}
     */
    getConnection(transaction, callback) {

        if (!this.connectionPoolEnabled) {
            this.createConnectionPool();
        }

        if (typeof transaction == 'function') {
            callback = transaction;
            transaction = false;
        }

        if (this.checkConnectionRelease) {
            this.request_name = ((new Error().stack).split("at ")[2]).trim();
        }

        this.connectionPool.getConnection((err, connection) => {
            if (err) {
                if (connection) {
                    connection.release();
                }
                logger.error(err);
                return callback(err, connection);
            } else {
                connection.connect();
                if (transaction) {
                    connection.beginTransaction((err) => {
                        if (err) {
                            connection.release();
                            logger.error(err);
                            return callback(err, connection);
                        } else {
                            callback(null, connection);
                        }
                    });
                } else {
                    callback(null, connection);
                }
            }
        });
    }
}

export default new mysqlService();

