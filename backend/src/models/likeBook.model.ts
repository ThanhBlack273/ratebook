/* eslint-disable @typescript-eslint/no-empty-interface */
import { DataTypes, Model, Optional, ForeignKey } from 'sequelize';
import sequelizeConnection from '../config/db.config';
import User from './user.model';
import Book from './book.model';

interface LikeBookAttributes {
    id: number;
    userId: ForeignKey<number>;
    bookId: ForeignKey<number>;

    createdAt?: Date;
    updatedAt?: Date;
    // deletedAt?: Date;
}

export interface LikeBookInput extends Optional<LikeBookAttributes, 'id'> {}

export interface LikeBookOutput extends Required<LikeBookAttributes> {}

class LikeBook extends Model<LikeBookAttributes, LikeBookInput> implements LikeBookAttributes {
    public id!: number;
    public userId!: ForeignKey<number>;
    public bookId!: ForeignKey<number>;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    // public readonly deletedAt!: Date;
}

LikeBook.init(
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
        tableName: 'like_books',
    },
);

export default LikeBook;
