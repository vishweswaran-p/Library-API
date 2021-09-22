/**
 * @module services/utility
 * @file This file has supportive utility methods
 */

/** dependencies */
import moment from 'moment-timezone';
import errorConstant from 'constant/errorconstant';
import uuid from  'uuid/v1';
import commonConstant from 'constant/commonconstant';

moment.tz.setDefault('Asia/Kolkata');

/**
 * @class utilityService
 * @description This class has utility methods for the api
 */
class utilityService {

     /**
      * @method buildResponse
      * @description To build response object with failure status type
      * @param api_response_code {String}
      * @param optional_msg {String}
      * @param setOptionalMsgOnly {Boolean}
      * @returns {Object} response
      */
    buildResponse (api_response_code, optional_msg='', setOptionalMsgOnly = false) {
        let message;
        if(!setOptionalMsgOnly) {
            message = errorConstant[api_response_code]
        } else {
            message = optional_msg;
        }
         return {
            code: api_response_code,
            status: commonConstant.RESPONSE_TYPE_FAILURE,
            message: message
        };
    }

    /**
     * @method current_datetime
     * @description Function to get current date with time
     * @returns {Object} Date object
     */
    current_datetime () {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    }

    /**
     * @method getHashToken
     * @description Function to get the uuid
     * @returns {String} uuid
     */
    getHashToken() {
        return uuid();
    }

    /**
     * @method isApplicationError
     * @description Check error type is Application error or Custom error
     * @param error {Object}
     * @returns {boolean}
     */
    isApplicationError(error) {
        return error instanceof Error;
    }
}

export default new utilityService();
