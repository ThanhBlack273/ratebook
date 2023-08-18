// require('dotenv').config();

import { User, Book, Review } from './models';

// const dbInit = () =>
//     Promise.all([
//         User.sync({ force: true }),
//         Book.sync({ force: true }), Review.sync({ force: true })
//     ]);

const dbInit = () => Promise.all([User.sync({}), Book.sync({}), Review.sync({})]);
export default dbInit;
