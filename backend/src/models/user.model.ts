import { Optional } from 'sequelize';
import { Table, Model } from 'sequelize-typescript';

export const User = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        email: {
            type: Sequelize.STRING,
            notNull: true,
            unique: true,
            validate: { isEmail: true },
        },
        password: {
            type: Sequelize.STRING,
            notNull: true,
        },
        userName: {
            type: Sequelize.STRING,
            defaultValue: 'Thanh',
        },
        dateOfBirth: {
            type: Sequelize.DATE,
        },
        phoneNumber: {
            type: Sequelize.STRING,
            notNull: true,
            unique: true,
        },
        secretAsk: {
            type: Sequelize.STRING,
        },
        secretAns: {
            type: Sequelize.STRING,
        },
        avatar: {
            type: Sequelize.STRING,
        },
        device: {
            type: Sequelize.ARRAY(Sequelize.TEXT),
            defaultValue: ['5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25'],
        }, //token thiết bị
    });

    return User;
};
