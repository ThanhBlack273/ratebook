import { Sequelize } from 'sequelize';
import User from './user.model';
import Book from './book.model';
import Review from './review.model';
import { LikeBook } from './likeBook.model';
import { LikeReview } from './likeReview.model';
import { HideReview } from './hideReview.model';

// //user sub book
// User.hasMany(Book, { as: 'subcribedListBook' });
// Book.belongsTo(User);
// Review.belongsTo(Book);
// Book.hasMany(Review, { as: 'reviewedListUser' });
// Review.belongsTo(User);

// //user liên quan review
// User.hasMany(Review, { as: 'reviewedListBook' });\

//user sub book
User.hasMany(Book, { sourceKey: 'id', foreignKey: 'userId', as: 'subcribedListBook' });
Book.belongsTo(User, { targetKey: 'id' });
// ////////////////

// //user like sách
// User.hasMany(db.likebook, { as: 'likedListBook' });
// db.likebook.belongsTo(User, {
//     foreignKey: 'userId',
//     as: 'user',
// });

// Book.hasMany(db.likebook, { as: 'likedListUser' });
// db.likebook.belongsTo(Book, {
//     foreignKey: 'bookId',
//     as: 'book',
// });
// ////////////////

// user liên quan review
User.hasMany(Review, { sourceKey: 'id', foreignKey: 'userId', as: 'reviewedListBook' });
Review.belongsTo(User, { targetKey: 'id' });

//book liên quan review
Review.belongsTo(Book, { targetKey: 'id' });
Book.hasMany(Review, { sourceKey: 'id', foreignKey: 'bookId', as: 'reviewedListUser' });

// ////////////////

// User.hasMany(db.likereview, { as: 'likedReviewListReview' });
// db.likereview.belongsTo(User, {
//     foreignKey: 'userId',
//     as: 'user',
// });

// Review.hasMany(db.likereview, { as: 'likedReviewListUser' });
// db.likereview.belongsTo(Review, {
//     foreignKey: 'reviewId',
//     as: 'review',
// });

// ////////////////

// User.hasMany(db.hidereview, { as: 'hidedReviewListReview' });
// db.hidereview.belongsTo(User, {
//     foreignKey: 'userId',
//     as: 'user',
// });

// Review.hasMany(db.hidereview, { as: 'hidedReviewListUser' });
// db.hidereview.belongsTo(Review, {
//     foreignKey: 'reviewId',
//     as: 'review',
// });

// ///////////////////
// Review.afterCreate(async (review, options) => {
//     Book
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

export { User, Book, Review };
