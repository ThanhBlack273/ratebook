/* eslint-disable @typescript-eslint/no-empty-interface */
import { DataTypes, Model, Optional, ForeignKey } from 'sequelize';
import sequelizeConnection from '../config/db.config';
import User from './user.model';

interface NotificationAttributes {
    id: number;
    fromUserId: ForeignKey<number>;
    toUserId: ForeignKey<number>;
    bookId?: ForeignKey<number>;
    reviewId?: ForeignKey<number>;
    isSeen: boolean;
    type: string;

    createdAt?: Date;
    updatedAt?: Date;
    // deletedAt?: Date;
}

export interface NotificationInput extends Optional<NotificationAttributes, 'id'> {}

export interface NotificationOutput extends Required<NotificationAttributes> {}

class Notification extends Model<NotificationAttributes, NotificationInput> implements NotificationAttributes {
    public id!: number;
    public fromUserId!: ForeignKey<User['id']>;
    public toUserId!: ForeignKey<User['id']>;
    public bookId?: ForeignKey<number>;
    public reviewId?: ForeignKey<number>;
    public isSeen!: boolean;
    public type!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    // public readonly deletedAt!: Date;
}

Notification.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        isSeen: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeConnection,
        //paranoid: true,
        tableName: 'notifications',
    },
);

export default Notification;
