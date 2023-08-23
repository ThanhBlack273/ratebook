/* eslint-disable @typescript-eslint/no-empty-interface */
import { DataTypes, Model, Optional, Sequelize, ForeignKey } from 'sequelize';
import sequelizeConnection from '../config/db.config';

interface BookAttributes {
    id: number;
    userId: ForeignKey<number>;
    ISBN_10: string;
    ISBN_13: string;
    title: string;
    subtitle: string;
    author: string[];
    publisher: [];
    publishedDate: Date;
    description: Text;
    smallThumbnail: Text;
    thumbnail: Text;
    small: Text;
    medium: Text;
    large: Text;
    star: string;
    countRate: number;
    createdAt?: Date;
    updatedAt?: Date;
    // deletedAt?: Date;
}
export interface BookrInput extends Optional<BookAttributes, 'id'> {}

export interface BookOutput extends Required<BookAttributes> {}

class Book extends Model<BookAttributes, BookrInput> implements BookAttributes {
    public id!: number;
    public userId!: ForeignKey<number>;
    public ISBN_10: string;
    public ISBN_13: string;
    public title: string;
    public subtitle: string;
    public author: string[];
    public publisher: [];
    public publishedDate: Date;
    public description: Text;
    public smallThumbnail: Text;
    public thumbnail: Text;
    public small: Text;
    public medium: Text;
    public large: Text;
    public star: string;
    public countRate: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    // public readonly deletedAt!: Date;
}

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ISBN_10: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        ISBN_13: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subtitle: {
            type: DataTypes.STRING,
        },
        author: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: ['THANH', 'BẢO'],
        },
        publisher: {
            type: DataTypes.STRING,
        },
        publishedDate: {
            type: DataTypes.DATE,
        },
        description: {
            type: DataTypes.TEXT,
        },
        smallThumbnail: { type: DataTypes.TEXT, defaultValue: 'Không có ảnh' },
        thumbnail: { type: DataTypes.TEXT, defaultValue: 'Không có ảnh' },
        small: { type: DataTypes.TEXT, defaultValue: 'Không có ảnh' },
        medium: { type: DataTypes.TEXT, defaultValue: 'Không có ảnh' },
        large: { type: DataTypes.TEXT, defaultValue: 'Không có ảnh' },
        star: { type: DataTypes.STRING, defaultValue: 0 },
        countRate: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
        sequelize: sequelizeConnection,
        //paranoid: true,
        tableName: 'books',
    },
);

export default Book;
