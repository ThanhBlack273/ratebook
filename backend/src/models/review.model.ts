/* eslint-disable @typescript-eslint/no-empty-interface */
import { DataTypes, Model, Optional, ForeignKey } from 'sequelize';
import sequelizeConnection from '../config/db.config';

interface ReviewAttributes {
    id: number;
    userId: ForeignKey<number>;
    bookId: ForeignKey<number>;
    // userId: {
    //     type: number;
    //     references: {
    //         model: User;
    //         key: 'id';
    //     };
    // };
    // bookId: {
    //     type: number;
    //     references: {
    //         model: Book;
    //         key: 'id';
    //     };
    // };
    rate: number;
    content: string;
    photoReview?: string[];
    deleted?: boolean;
    countLike?: number;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export interface ReviewInput extends Optional<ReviewAttributes, 'id'> {}

export interface ReviewOutput extends Required<ReviewAttributes> {}

class Review extends Model<ReviewAttributes, ReviewInput> implements ReviewAttributes {
    public id!: number;
    public userId!: ForeignKey<number>;
    public bookId!: ForeignKey<number>;
    // public userId!: {
    //     type: number;
    //     references: {
    //         model: User;
    //         key: 'id';
    //     };
    // };
    // public bookId!: {
    //     type: number;
    //     references: {
    //         model: Book;
    //         key: 'id';
    //     };
    // };
    public rate: number;
    public content: string;
    public photoReview?: string[];
    public deleted?: boolean;
    public countLike?: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
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
        paranoid: true,
    },
);

export default Review;
