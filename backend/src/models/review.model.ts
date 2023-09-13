/* eslint-disable @typescript-eslint/no-empty-interface */
import { DataTypes, Model, Optional, ForeignKey } from 'sequelize';
import sequelizeConnection from '../config/db.config';
import HideReview from './hideReview.model';
import LikeReview from './likeReview.model';
import Notification from './notification.model';

interface ReviewAttributes {
    id: number;
    userId: ForeignKey<number>;
    bookId: ForeignKey<number>;

    rate: number;
    content: string;
    photoReview?: string[];
    deleted?: boolean;
    countLike?: number;

    createdAt?: Date;
    updatedAt?: Date;
    // deletedAt?: Date;
}
export interface ReviewInput extends Optional<ReviewAttributes, 'id'> {}

export interface ReviewOutput extends Required<ReviewAttributes> {}

class Review extends Model<ReviewAttributes, ReviewInput> implements ReviewAttributes {
    public id!: number;
    public userId!: ForeignKey<number>;
    public bookId!: ForeignKey<number>;

    public rate: number;
    public content: string;
    public photoReview?: string[];
    public deleted?: boolean;
    public countLike?: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    // public readonly deletedAt!: Date;
    _previousDataValues: Review;
}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        // userId: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: User,
        //         key: 'id',
        //     },
        // },
        // bookId: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: Book,
        //         key: 'id',
        //     },
        // },
        rate: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        photoReview: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        countLike: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize: sequelizeConnection,
        //paranoid: true,
        tableName: 'reviews',
    },
);

Review.hasMany(LikeReview, {
    sourceKey: 'id',
    foreignKey: 'reviewId',
    as: 'likedReviewListUser',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
LikeReview.belongsTo(Review, {
    targetKey: 'id',
    foreignKey: 'reviewId',
});
/////////////////////////////
Review.hasMany(HideReview, {
    sourceKey: 'id',
    foreignKey: 'reviewId',
    as: 'hidedReviewListUser',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
HideReview.belongsTo(Review, {
    targetKey: 'id',
    foreignKey: 'reviewId',
});
//////////////////////////
Review.hasMany(Notification, {
    sourceKey: 'id',
    foreignKey: 'reviewId',
    as: 'notiReview',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Notification.belongsTo(Review, { targetKey: 'id', foreignKey: 'reviewId' });
//////////////////////////

// //Triger for likeReview to countLike of review
LikeReview.afterCreate(async (likeReview) => {
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

LikeReview.beforeDestroy(async (likeReview) => {
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

    await Notification.destroy({
        where: {
            reviewId: likeReview.dataValues.reviewId,
            fromUserId: likeReview.dataValues.userId,
            type: 'like',
        },
    });
});
export default Review;
