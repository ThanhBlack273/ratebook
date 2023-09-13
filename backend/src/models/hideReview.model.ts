/* eslint-disable @typescript-eslint/no-empty-interface */
import { DataTypes, Model, Optional, ForeignKey } from 'sequelize';
import sequelizeConnection from '../config/db.config';
import Review from './review.model';
import User from './user.model';

interface HideReviewAttributes {
    id: number;
    userId: ForeignKey<number>;
    reviewId: ForeignKey<number>;

    createdAt?: Date;
    updatedAt?: Date;
    // deletedAt?: Date;
}

export interface HideReviewInput extends Optional<HideReviewAttributes, 'id'> {}

export interface HideReviewOutput extends Required<HideReviewAttributes> {}

class HideReview extends Model<HideReviewAttributes, HideReviewInput> implements HideReviewAttributes {
    public id!: number;
    public userId!: ForeignKey<number>;
    public reviewId!: ForeignKey<number>;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    // public readonly deletedAt!: Date;
}

HideReview.init(
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
        tableName: 'hide_reviews',
    },
);

export default HideReview;
