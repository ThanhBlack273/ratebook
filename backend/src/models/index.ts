import config from '../config/db.config';
import { Sequelize } from 'sequelize';
import User from './user.model';
import Book from './book.model';
import { Review } from './review.model';
import { LikeBook } from './likeBook.model';
import { LikeReview } from './likeReview.model';
import { HideReview } from './hideReview.model';

export { User, Book };

// const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
//     host: config.HOST,
//     dialect: 'postgres',
//     port: config.port,
//     pool: {
//         max: config.pool.max,
//         min: config.pool.min,
//         acquire: config.pool.acquire,
//         idle: config.pool.idle,
//     },
// });

// const db = {
//     Sequelize: Sequelize,
//     sequelize: sequelize,
//     user: User(sequelize, Sequelize),
//     book: Book(sequelize, Sequelize),
//     review: Review(sequelize, Sequelize),
//     likebook: LikeBook(sequelize, Sequelize),
//     likereview: LikeReview(sequelize, Sequelize),
//     hidereview: HideReview(sequelize, Sequelize),
// };

// //user sub book
// db.user.hasMany(db.book, { as: 'subcribedListBook' });
// db.book.belongsTo(db.user, {
//     foreignKey: 'userId',
//     as: 'subByUser',
// });
// ////////////////

// //user like sách
// db.user.hasMany(db.likebook, { as: 'likedListBook' });
// db.likebook.belongsTo(db.user, {
//     foreignKey: 'userId',
//     as: 'user',
// });

// db.book.hasMany(db.likebook, { as: 'likedListUser' });
// db.likebook.belongsTo(db.book, {
//     foreignKey: 'bookId',
//     as: 'book',
// });
// ////////////////

// //user liên quan review
// db.user.hasMany(db.review, { as: 'reviewedListBook' });
// db.review.belongsTo(db.user, {
//     foreignKey: 'userId',
//     as: 'user',
// });

// //book liên quan review
// db.review.belongsTo(db.book, {
//     foreignKey: 'bookId',
//     as: 'book',
// });
// db.book.hasMany(db.review, { as: 'reviewedListUser' });

// ////////////////

// db.user.hasMany(db.likereview, { as: 'likedReviewListReview' });
// db.likereview.belongsTo(db.user, {
//     foreignKey: 'userId',
//     as: 'user',
// });

// db.review.hasMany(db.likereview, { as: 'likedReviewListUser' });
// db.likereview.belongsTo(db.review, {
//     foreignKey: 'reviewId',
//     as: 'review',
// });

// ////////////////

// db.user.hasMany(db.hidereview, { as: 'hidedReviewListReview' });
// db.hidereview.belongsTo(db.user, {
//     foreignKey: 'userId',
//     as: 'user',
// });

// db.review.hasMany(db.hidereview, { as: 'hidedReviewListUser' });
// db.hidereview.belongsTo(db.review, {
//     foreignKey: 'reviewId',
//     as: 'review',
// });

// ///////////////////
// db.review.afterCreate(async (review, options) => {
//     db.book
//         .findOne({
//             where: {
//                 id: review.bookId,
//             },
//         })
//         .then((book) => {
//             book.update({
//                 star: (book.star * book.countRate + review.rate) / (book.countRate + 1),
//                 countRate: book.countRate + 1,
//             });
//         });
// });

// export default db;
