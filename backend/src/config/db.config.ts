//cloud railway

// export default {
//     HOST: 'containers-us-west-70.railway.app',
//     USER: 'postgres',
//     PASSWORD: 'vx3HtNyYKaxngPU6R2T3',
//     DB: 'railway',
//     dialect: 'postgres',
//     port: 6164,
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000,
//     },
// };

// export default {
//     HOST: 'localhost',
//     USER: 'postgres',
//     PASSWORD: 'Thanh!@2703201',
//     DB: 'ratebooks',
//     dialect: 'postgres',
//     port: 5432,
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000,
//     },
// };

// require('dotenv').config();
import { Sequelize } from 'sequelize';

// const dbName = 'railway'; //process.env.DB_NAME;
// const dbUser = 'postgres'; //process.env.DB_USER;
// const dbHost = 'containers-us-west-70.railway.app'; //process.env.DB_HOST;
// const dbDriver = 'postgres'; //process.env.DB_DRIVER;
// const dbPassword = 'vx3HtNyYKaxngPU6R2T3'; //process.env.DB_PASSWORD;
// const dbPort = 6164;

const dbName = 'te'; //process.env.DB_NAME;
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
