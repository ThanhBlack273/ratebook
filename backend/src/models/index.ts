// import User from './user.model';
// import Book from './book.model';
// import Review from './review.model';
// import LikeBook from './likeBook.model';
// import LikeReview from './likeReview.model';
// import HideReview from './hideReview.model';
// import Notification from './notification.model';

// // //user sub book
// User.hasMany(Book, {
//     sourceKey: 'id',
//     foreignKey: 'userId',
//     as: 'subcribedListBook',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });
// Book.belongsTo(User, { targetKey: 'id', foreignKey: 'userId' });
// // // ////////////////

// // //user like sách
// User.hasMany(LikeBook, {
//     sourceKey: 'id',
//     foreignKey: 'userId',
//     as: 'likedListBook',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });
// LikeBook.belongsTo(User, {
//     targetKey: 'id',
//     foreignKey: 'userId',
// });

// Book.hasMany(LikeBook, {
//     sourceKey: 'id',
//     foreignKey: 'bookId',
//     as: 'likedListUser',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });
// LikeBook.belongsTo(Book, {
//     targetKey: 'id',
//     foreignKey: 'bookId',
// });
// // ////////////////

// // user liên quan review
// User.hasMany(Review, {
//     sourceKey: 'id',
//     foreignKey: 'userId',
//     as: 'reviewedListBook',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });
// Review.belongsTo(User, { targetKey: 'id', foreignKey: 'userId' });

// //book liên quan review
// Book.hasMany(Review, {
//     sourceKey: 'id',
//     foreignKey: 'bookId',
//     as: 'reviewedListUser',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });
// Review.belongsTo(Book, { targetKey: 'id', foreignKey: 'bookId' });

// // ////////////////

// User.hasMany(LikeReview, {
//     sourceKey: 'id',
//     foreignKey: 'userId',
//     as: 'likedReviewListReview',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });
// LikeReview.belongsTo(User, {
//     targetKey: 'id',
//     foreignKey: 'userId',
// });

// Review.hasMany(LikeReview, {
//     sourceKey: 'id',
//     foreignKey: 'reviewId',
//     as: 'likedReviewListUser',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });
// LikeReview.belongsTo(Review, {
//     targetKey: 'id',
//     foreignKey: 'reviewId',
// });

// // ////////////////

// User.hasMany(HideReview, {
//     sourceKey: 'id',
//     foreignKey: 'userId',
//     as: 'hidedReviewListReview',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });
// HideReview.belongsTo(User, {
//     targetKey: 'id',
//     foreignKey: 'userId',
// });

// Review.hasMany(HideReview, {
//     sourceKey: 'id',
//     foreignKey: 'reviewId',
//     as: 'hidedReviewListUser',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });
// HideReview.belongsTo(Review, {
//     targetKey: 'id',
//     foreignKey: 'reviewId',
// });

// ///////////////
// User.hasMany(Notification, {
//     sourceKey: 'id',
//     foreignKey: 'fromUserId',
//     as: 'notiFromUser',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });
// Notification.belongsTo(User, { targetKey: 'id', foreignKey: 'fromUserId', as: 'fromUser' });

// User.hasMany(Notification, {
//     sourceKey: 'id',
//     foreignKey: 'toUserId',
//     as: 'notiToUser',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });
// Notification.belongsTo(User, { targetKey: 'id', foreignKey: 'toUserId', as: 'toUser' });

// Review.hasMany(Notification, {
//     sourceKey: 'id',
//     foreignKey: 'reviewId',
//     as: 'notiReview',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });
// Notification.belongsTo(Review, { targetKey: 'id', foreignKey: 'reviewId' });

// Book.hasMany(Notification, {
//     sourceKey: 'id',
//     foreignKey: 'bookId',
//     as: 'notiBook',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });
// Notification.belongsTo(Book, { targetKey: 'id', foreignKey: 'bookId' });

// ///////////////////

// // Triger for rate review to star of book
// Review.afterCreate(async (review, options) => {
//     const book = await Book.findOne({
//         where: {
//             id: review.dataValues.bookId,
//         },
//     });
//     if (book) {
//         book.update({
//             star: (
//                 (Number(book.dataValues.star) * book.dataValues.countRate + review.dataValues.rate) /
//                 (book.dataValues.countRate + 1)
//             ).toFixed(1),

//             countRate: book.dataValues.countRate + 1,
//         });
//     }
// });

// Review.beforeUpdate(async (review, options) => {
//     const book = await Book.findOne({
//         where: {
//             id: review.dataValues.bookId,
//         },
//     });
//     if (book) {
//         book.update({
//             star: (
//                 (Number(book.dataValues.star) * book.dataValues.countRate -
//                     review._previousDataValues.rate +
//                     review.dataValues.rate) /
//                 book.countRate
//             ).toFixed(1),
//         });
//     }
// });

// //////////////////

// //Triger for likeReview to countLike of review
// LikeReview.afterCreate(async (likeReview, options) => {
//     const review = await Review.findOne({
//         where: {
//             id: likeReview.dataValues.reviewId,
//         },
//     });
//     if (review) {
//         review.update({
//             countLike: review.dataValues.countLike + 1,
//         });
//     }
// });

// LikeReview.beforeDestroy(async (likeReview, options) => {
//     const review = await Review.findOne({
//         where: {
//             id: likeReview.dataValues.reviewId,
//         },
//     });
//     if (review) {
//         review.update({
//             countLike: review.dataValues.countLike - 1,
//         });
//     }

//     const noti = await Notification.destroy({
//         where: {
//             reviewId: likeReview.dataValues.reviewId,
//             fromUserId: likeReview.dataValues.userId,
//             type: 'like',
//         },
//     });
// });

// export { User, Book, Review, LikeBook, LikeReview, HideReview, Notification };

export { default as User } from './user.model';
export { default as Book } from './book.model';
export { default as Review } from './review.model';
export { default as LikeBook } from './likeBook.model';
export { default as LikeReview } from './likeReview.model';
export { default as HideReview } from './hideReview.model';
export { default as Notification } from './notification.model';
