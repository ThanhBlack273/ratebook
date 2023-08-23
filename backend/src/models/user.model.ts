/* eslint-disable @typescript-eslint/no-empty-interface */
import { DataTypes, Model, ModelStatic, Optional } from 'sequelize';
import sequelizeConnection from '../config/db.config';

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

export default User;
