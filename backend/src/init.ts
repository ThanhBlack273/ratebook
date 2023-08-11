// require('dotenv').config();

import { User, Book } from './models';

const dbInit = () => Promise.all([User.sync(), Book.sync()]);

export default dbInit;
