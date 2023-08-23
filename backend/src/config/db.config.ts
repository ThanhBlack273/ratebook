// require('dotenv').config();
import { Sequelize } from 'sequelize';

// const dbName = 'railway'; //process.env.DB_NAME;
// const dbUser = 'postgres'; //process.env.DB_USER;
// const dbHost = 'containers-us-west-192.railway.app'; //process.env.DB_HOST;
// const dbDriver = 'postgres'; //process.env.DB_DRIVER;
// const dbPassword = '5wzAKl4vI1WSE6DYl3BF'; //process.env.DB_PASSWORD;
// const dbPort = 5918;

const dbName = 'formatcode'; //process.env.DB_NAME;
const dbUser = 'postgres'; //process.env.DB_USER;
const dbHost = 'localhost'; //process.env.DB_HOST;
const dbDriver = 'postgres'; //process.env.DB_DRIVER;
const dbPassword = 'abc123'; //process.env.DB_PASSWORD;
const dbPort = 5432;

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    logging: false,
    port: dbPort,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    // define: { hooks },
});

export default sequelizeConnection;
