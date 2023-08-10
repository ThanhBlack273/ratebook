//cloud railway

export default {
    HOST: 'containers-us-west-70.railway.app',
    USER: 'postgres',
    PASSWORD: 'vx3HtNyYKaxngPU6R2T3',
    DB: 'railway',
    dialect: 'postgres',
    port: 6164,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};

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
