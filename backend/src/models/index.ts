// import { Sequelize } from 'sequelize';
import User from './user.model';
import Book from './book.model';
import Review from './review.model';
import LikeBook from './likeBook.model';
import LikeReview from './likeReview.model';
import HideReview from './hideReview.model';

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
// Book.belongsTo(User, { targetKey: 'id' });
// ////////////////

// //user like sách
User.hasMany(LikeBook, { sourceKey: 'id', foreignKey: 'userId', as: 'likedListBook' });
// LikeBook.belongsTo(User, {
//     foreignKey: 'userId',
//     as: 'user',
// });

Book.hasMany(LikeBook, { sourceKey: 'id', foreignKey: 'bookId', as: 'likedListUser' });
// LikeBook.belongsTo(Book, {
//     foreignKey: 'bookId',
//     as: 'book',
// });
// ////////////////

// user liên quan review
User.hasMany(Review, { sourceKey: 'id', foreignKey: 'userId', as: 'reviewedListBook' });
// Review.belongsTo(User, { targetKey: 'id' });

//book liên quan review
// Review.belongsTo(Book, { targetKey: 'id' });
Book.hasMany(Review, { sourceKey: 'id', foreignKey: 'bookId', as: 'reviewedListUser' });

// ////////////////

User.hasMany(LikeReview, { sourceKey: 'id', foreignKey: 'userId', as: 'likedReviewListReview' });
// LikeReview.belongsTo(User, {
//     foreignKey: 'userId',
//     as: 'user',
// });

Review.hasMany(LikeReview, { sourceKey: 'id', foreignKey: 'reviewId', as: 'likedReviewListUser' });
// LikeReview.belongsTo(Review, {
//     foreignKey: 'reviewId',
//     as: 'review',
// });

// ////////////////

User.hasMany(HideReview, { sourceKey: 'id', foreignKey: 'userId', as: 'hidedReviewListReview' });
// HideReview.belongsTo(User, {
//     foreignKey: 'userId',
//     as: 'user',
// });

Review.hasMany(HideReview, { sourceKey: 'id', foreignKey: 'reviewId', as: 'hidedReviewListUser' });
// HideReview.belongsTo(Review, {
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

export { User, Book, Review, LikeBook, LikeReview, HideReview };
