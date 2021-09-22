/** dependencies */
import dotenv from 'dotenv';
dotenv.config();

//common configurations for all the environments
let commonConfig = {
    enableClusterMode: false,
    IS_HARD_DELETE_ENABLED: true
};

let config = {};

switch(process.env.NODE_ENV) {
    case 'dev' : {
        config = {
            DB_HOST:'localhost',
            DB_USER:'root',
            DB_PASS:'password',
            DB_NAME:'library',
            PORT:8000
        };
        break;
    }
    case 'production' : {
        config = {
            DB_HOST:'sql6.freesqldatabase.com',
            DB_USER:'sql6438905',
            DB_PASS:'mIVWPsP5nh',
            DB_NAME:'sql6438905',
            PORT:3000,
        };
        break;
    }
    case 'test' : {
        config = {
            DB_HOST:'sql6.freesqldatabase.com',
            DB_USER:'sql6438905',
            DB_PASS:'mIVWPsP5nh',
            DB_NAME:'flowchart_system',
            PORT:7000
        };
        break;
    }
    default : {
        config = {
            DB_HOST:'sql6.freesqldatabase.com   ',
            DB_USER:'sql6438905',
            DB_PASS:'mIVWPsP5nh',
            DB_NAME:'sql6438905',
            PORT:8000
        }
    }
}

//Copy the common configurations to the export variable
Object.assign(config, commonConfig);

export default config;
