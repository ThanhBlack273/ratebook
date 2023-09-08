import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';

let dbName, dbUser, dbHost, dbPassword, dbPort;

if (process.env.NODE_ENV === 'TEST') {
    dbName = process.env.DB_TEST_DEFAULT as string;
    dbUser = process.env.USER_DEFAULT as string;
    dbHost = process.env.HOST_DEFAULT as string;
    dbPassword = process.env.PASSWORD_DEFAULT as string;
    dbPort = Number(process.env.PORT_DEFAULT);
} else if (process.env.NODE_ENV === 'RW') {
    dbName = process.env.DB_RAILWAY as string;
    dbUser = process.env.USER_RAILWAY as string;
    dbHost = process.env.HOST_RAILWAY as string;
    dbPassword = process.env.PASSWORD_RAILWAY;
    dbPort = Number(process.env.PORT_RAILWAY);
} else if (process.env.NODE_ENV === 'Local') {
    dbName = process.env.DB_DEFAULT as string;
    dbUser = process.env.USER_DEFAULT as string;
    dbHost = process.env.HOST_DEFAULT as string;
    dbPassword = process.env.PASSWORD_DEFAULT as string;
    dbPort = Number(process.env.PORT_DEFAULT);
}

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'postgres',
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
