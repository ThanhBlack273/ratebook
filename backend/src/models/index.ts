import config from '../config/db.config';
import { Sequelize } from 'sequelize';
import { User } from './user.model';
import { Book } from './book.model';
import { Review } from './review.model';
import { LikeBook } from './likeBook.model';
import { LikeReview } from './likeReview.model';
import { HideReview } from './hideReview.model';

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: 'postgres',
    port: config.port,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,
    },
});

const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    user: User(sequelize, Sequelize),
    book: Book(sequelize, Sequelize),
    review: Review(sequelize, Sequelize),
    likebook: LikeBook(sequelize, Sequelize),
    likereview: LikeReview(sequelize, Sequelize),
    hidereview: HideReview(sequelize, Sequelize),
};

//user sub book
db.user.hasMany(db.book, { as: 'subcribedListBook' });
db.book.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'subByUser',
});
////////////////

//user like sách
db.user.hasMany(db.likebook, { as: 'likedListBook' });
db.likebook.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'user',
});

db.book.hasMany(db.likebook, { as: 'likedListUser' });
db.likebook.belongsTo(db.book, {
    foreignKey: 'bookId',
    as: 'book',
});
////////////////

//user liên quan review
db.user.hasMany(db.review, { as: 'reviewedListBook' });
db.review.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'user',
});

//book liên quan review
db.review.belongsTo(db.book, {
    foreignKey: 'bookId',
    as: 'book',
});
db.book.hasMany(db.review, { as: 'reviewedListUser' });

////////////////

db.user.hasMany(db.likereview, { as: 'likedReviewListReview' });
db.likereview.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'user',
});

db.review.hasMany(db.likereview, { as: 'likedReviewListUser' });
db.likereview.belongsTo(db.review, {
    foreignKey: 'reviewId',
    as: 'review',
});

////////////////

db.user.hasMany(db.hidereview, { as: 'hidedReviewListReview' });
db.hidereview.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'user',
});

db.review.hasMany(db.hidereview, { as: 'hidedReviewListUser' });
db.hidereview.belongsTo(db.review, {
    foreignKey: 'reviewId',
    as: 'review',
});
////////////////

//Triger for rate review to star of book
db.review.afterCreate(async (review, options) => {
    db.book
        .findOne({
            where: {
                id: review.dataValues.bookId,
            },
        })
        .then((book) => {
            book.update({
                star:
                    (book.dataValues.star * book.dataValues.countRate + review.dataValues.rate) /
                    (book.dataValues.countRate + 1),
                countRate: book.dataValues.countRate + 1,
            });
        });
});

db.review.beforeUpdate(async (review, options) => {
    db.book
        .findOne({
            where: {
                id: review.dataValues.bookId,
            },
        })
        .then((book) => {
            book.update({
                star:
                    (book.dataValues.star * book.dataValues.countRate -
                        review._previousDataValues.rate +
                        review.dataValues.rate) /
                    book.countRate,
            });
        });
});

//////////////////
// Nếu cần thiết thì làm trigger like book => count số lượng user đã like book

//////////////////

//Triger for likeReview to countLike of review
db.likereview.afterCreate(async (likeReview, options) => {
    db.review
        .findOne({
            where: {
                id: likeReview.dataValues.reviewId,
            },
        })
        .then((review) => {
            review.update({
                countLike: review.dataValues.countLike + 1,
            });
        });
});

db.likereview.beforeDestroy(async (likeReview, options) => {
    db.review
        .findOne({
            where: {
                id: likeReview.dataValues.reviewId,
            },
        })
        .then((review) => {
            review.update({
                countLike: review.dataValues.countLike - 1,
            });
        });
});

export default db;
