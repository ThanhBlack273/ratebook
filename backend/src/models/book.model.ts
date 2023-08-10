import { DataTypes } from 'sequelize';

export const Book = (sequelize, Sequelize) => {
    const Book = sequelize.define('book', {
        ISBN_10: {
            type: Sequelize.STRING,
            notNull: true,
            unique: true,
        },
        ISBN_13: {
            type: Sequelize.STRING,
            notNull: true,
            unique: true,
        },
        title: {
            type: Sequelize.STRING,
            notNull: true,
        },
        subtitle: {
            type: Sequelize.STRING,
        },
        author: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            defaultValue: ['THANH', 'BẢO'],
        },
        publisher: {
            type: Sequelize.STRING,
        },
        publishedDate: {
            type: Sequelize.DATE,
        },
        description: {
            type: Sequelize.TEXT,
        },
        smallThumbnail: { type: Sequelize.TEXT, defaultValue: 'Không có ảnh' },
        thumbnail: { type: Sequelize.TEXT, defaultValue: 'Không có ảnh' },
        small: { type: Sequelize.TEXT, defaultValue: 'Không có ảnh' },
        medium: { type: Sequelize.TEXT, defaultValue: 'Không có ảnh' },
        large: { type: Sequelize.TEXT, defaultValue: 'Không có ảnh' },
        star: { type: DataTypes.FLOAT, defaultValue: 0 },
        countRate: { type: DataTypes.INTEGER, defaultValue: 0 },
    });

    return Book;
};
