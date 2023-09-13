/* eslint-disable @typescript-eslint/no-empty-interface */
import { DataTypes, Model, ModelStatic, Optional } from 'sequelize';
import sequelizeConnection from '../config/db.config';
import HideReview from './hideReview.model';
import LikeReview from './likeReview.model';
import Review from './review.model';
import LikeBook from './likeBook.model';
import Book from './book.model';
import Notification from './notification.model';

interface UserAttributes {
    id: number;
    email: string;
    password: string;
    userName: string;
    dateOfBirth: Date;
    phoneNumber: number;
    secretAsk: string;
    secretAns: string;
    avatar: string;
    device?: string;
    createdAt?: Date;
    updatedAt?: Date;
    // deletedAt?: Date;
}
export interface UserInput extends Optional<UserAttributes, 'id'> {}

export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number;
    public email!: string;
    public password!: string;
    public userName!: string;
    public dateOfBirth!: Date;
    public phoneNumber!: number;
    public secretAsk!: string;
    public secretAns!: string;
    public avatar!: string;
    public device!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    // public readonly deletedAt!: Date;

    // static associate() {
    //     User.hasMany(Book, {
    //         sourceKey: 'id',
    //         foreignKey: 'userId',
    //         as: 'subcribedListBook',
    //         onDelete: 'CASCADE',
    //         onUpdate: 'CASCADE',
    //     });
    // }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: { isEmail: true },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userName: {
            type: DataTypes.STRING,
            defaultValue: 'Thanh',
            allowNull: false,
        },
        dateOfBirth: {
            type: DataTypes.DATE,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        secretAsk: {
            type: DataTypes.STRING,
        },
        secretAns: {
            type: DataTypes.STRING,
        },
        avatar: {
            type: DataTypes.STRING,
        },
        device: {
            // type: DataTypes.ARRAY(DataTypes.TEXT),
            type: DataTypes.TEXT,
        }, //token thiết bị
    },
    {
        sequelize: sequelizeConnection,
        //paranoid: true,
        tableName: 'users',
    },
);

User.hasMany(Book, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'subcribedListBook',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Book.belongsTo(User, { targetKey: 'id', foreignKey: 'userId' });
/////////////////////////
User.hasMany(LikeBook, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'likedListBook',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
LikeBook.belongsTo(User, {
    targetKey: 'id',
    foreignKey: 'userId',
});
//////////////////////////
User.hasMany(Review, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'reviewedListBook',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Review.belongsTo(User, { targetKey: 'id', foreignKey: 'userId' });
//////////////////////////
User.hasMany(LikeReview, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'likedReviewListReview',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
LikeReview.belongsTo(User, {
    targetKey: 'id',
    foreignKey: 'userId',
});
////////////////////////////
User.hasMany(HideReview, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'hidedReviewListReview',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
HideReview.belongsTo(User, {
    targetKey: 'id',
    foreignKey: 'userId',
});
////////////////////////////
User.hasMany(Notification, {
    sourceKey: 'id',
    foreignKey: 'fromUserId',
    as: 'notiFromUser',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Notification.belongsTo(User, { targetKey: 'id', foreignKey: 'fromUserId', as: 'fromUser' });

User.hasMany(Notification, {
    sourceKey: 'id',
    foreignKey: 'toUserId',
    as: 'notiToUser',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Notification.belongsTo(User, { targetKey: 'id', foreignKey: 'toUserId', as: 'toUser' });
///////////////////////////
export default User;
