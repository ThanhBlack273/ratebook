// import { Sequelize } from 'sequelize';
import User from './user.model';
import Book from './book.model';
import Review from './review.model';
import LikeBook from './likeBook.model';
import LikeReview from './likeReview.model';
import HideReview from './hideReview.model';
import Notification from './notification.model';

//user sub book
User.hasMany(Book, { sourceKey: 'id', foreignKey: 'userId', as: 'subcribedListBook' });
Book.belongsTo(User, { targetKey: 'id', foreignKey: 'userId' });
// ////////////////

// //user like sách
User.hasMany(LikeBook, { sourceKey: 'id', foreignKey: 'userId', as: 'likedListBook' });
LikeBook.belongsTo(User, {
    targetKey: 'id',
    foreignKey: 'userId',
});

Book.hasMany(LikeBook, { sourceKey: 'id', foreignKey: 'bookId', as: 'likedListUser' });
LikeBook.belongsTo(Book, {
    targetKey: 'id',
    foreignKey: 'bookId',
});
// ////////////////

// user liên quan review
User.hasMany(Review, { sourceKey: 'id', foreignKey: 'userId', as: 'reviewedListBook' });
Review.belongsTo(User, { targetKey: 'id', foreignKey: 'userId' });

//book liên quan review
Review.belongsTo(Book, { targetKey: 'id', foreignKey: 'bookId' });
Book.hasMany(Review, { sourceKey: 'id', foreignKey: 'bookId', as: 'reviewedListUser' });

// ////////////////

User.hasMany(LikeReview, { sourceKey: 'id', foreignKey: 'userId', as: 'likedReviewListReview' });
LikeReview.belongsTo(User, {
    targetKey: 'id',
    foreignKey: 'userId',
});

Review.hasMany(LikeReview, { sourceKey: 'id', foreignKey: 'reviewId', as: 'likedReviewListUser' });
LikeReview.belongsTo(Review, {
    targetKey: 'id',
    foreignKey: 'reviewId',
});

// ////////////////

User.hasMany(HideReview, { sourceKey: 'id', foreignKey: 'userId', as: 'hidedReviewListReview' });
HideReview.belongsTo(User, {
    targetKey: 'id',
    foreignKey: 'userId',
});

Review.hasMany(HideReview, { sourceKey: 'id', foreignKey: 'reviewId', as: 'hidedReviewListUser' });
HideReview.belongsTo(Review, {
    targetKey: 'id',
    foreignKey: 'reviewId',
});

///////////////
User.hasMany(Notification, { sourceKey: 'id', foreignKey: 'fromUserId', as: 'notiFromUser' });
Notification.belongsTo(User, { targetKey: 'id', foreignKey: 'fromUserId', as: 'fromUser' });

User.hasMany(Notification, { sourceKey: 'id', foreignKey: 'toUserId', as: 'notiToUser' });
Notification.belongsTo(User, { targetKey: 'id', foreignKey: 'toUserId', as: 'toUser' });

Review.hasMany(Notification, { sourceKey: 'id', foreignKey: 'reviewId', as: 'notiReview' });
Notification.belongsTo(Review, { targetKey: 'id', foreignKey: 'reviewId' });

Book.hasMany(Notification, { sourceKey: 'id', foreignKey: 'bookId', as: 'notiBook' });
Notification.belongsTo(Book, { targetKey: 'id', foreignKey: 'bookId' });

///////////////////

//Triger for rate review to star of book
Review.afterCreate(async (review, options) => {
    const book = await Book.findOne({
        where: {
            id: review.dataValues.bookId,
        },
    });
    if (book) {
        book.update({
            star: (
                (Number(book.dataValues.star) * book.dataValues.countRate + review.dataValues.rate) /
                (book.dataValues.countRate + 1)
            ).toFixed(1),

            countRate: book.dataValues.countRate + 1,
        });
    }
});

Review.beforeUpdate(async (review, options) => {
    const book = await Book.findOne({
        where: {
            id: review.dataValues.bookId,
        },
    });
    if (book) {
        book.update({
            star: (
                (Number(book.dataValues.star) * book.dataValues.countRate -
                    review._previousDataValues.rate +
                    review.dataValues.rate) /
                book.countRate
            ).toFixed(1),
        });
    }
});

//////////////////

//Triger for likeReview to countLike of review
LikeReview.afterCreate(async (likeReview, options) => {
    const review = await Review.findOne({
        where: {
            id: likeReview.dataValues.reviewId,
        },
    });
    if (review) {
        review.update({
            countLike: review.dataValues.countLike + 1,
        });
    }
});

LikeReview.beforeDestroy(async (likeReview, options) => {
    const review = await Review.findOne({
        where: {
            id: likeReview.dataValues.reviewId,
        },
    });
    if (review) {
        review.update({
            countLike: review.dataValues.countLike - 1,
        });
    }

    const noti = await Notification.destroy({
        where: {
            reviewId: likeReview.dataValues.reviewId,
            fromUserId: likeReview.dataValues.userId,
            type: 'like',
        },
    });
});

export { User, Book, Review, LikeBook, LikeReview, HideReview, Notification };
