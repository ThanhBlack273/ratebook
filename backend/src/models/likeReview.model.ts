/* eslint-disable @typescript-eslint/no-empty-interface */
import { DataTypes, Model, Optional, ForeignKey } from 'sequelize';
import sequelizeConnection from '../config/db.config';

interface LikeReviewAttributes {
    id: number;
    userId: ForeignKey<number>;
    reviewId: ForeignKey<number>;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface LikeReviewInput extends Optional<LikeReviewAttributes, 'id'> {}

export interface LikeReviewOutput extends Required<LikeReviewAttributes> {}

class LikeReview extends Model<LikeReviewAttributes, LikeReviewInput> implements LikeReviewAttributes {
    public id!: number;
    public userId!: ForeignKey<number>;
    public reviewId!: ForeignKey<number>;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    // public readonly deletedAt!: Date;
}

LikeReview.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    },
    {
        sequelize: sequelizeConnection,
        //paranoid: true,
        tableName: 'like_reviews',
    },
);

export default LikeReview;
