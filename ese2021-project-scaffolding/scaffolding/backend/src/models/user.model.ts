import { TodoItem, TodoItemAttributes, TodoItemCreationAttributes } from './todoitem.model';
import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface UserAttributes {
    userId: number;
    userName: string;
    password: string;
    admin: boolean;
    firstName: string;
    lastName: string;
    email: string;
    adress: string;
    streetAndHousNmbr: number;
    zip: string;
    city: string;
    birthday: number; // ddmmyyyy
    phone: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    firstName: string;
    lastName: string;
    email: string;
    adress: string;
    streetAndHousNmbr: number;
    zip: string;
    city: string;
    birthday: number;
    phone: string;
    userId!: number;
    userName!: string;
    password!: string;
    admin!: boolean;

    public static initialize(sequelize: Sequelize) {
        User.init({
            userId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            admin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            adress: {
                type: DataTypes.STRING,
                allowNull: false
            },
            streetAndHousNmbr: {
                type: DataTypes.STRING,
                allowNull: false
            },
            zip: {
                type: DataTypes.STRING,
                allowNull: false
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false
            },
            birthday: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
            {
                sequelize,
                tableName: 'users'
            }
        );
    }
}
