
import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
/**
* @param firstName
* @param lastName
* @param email
* @param homeAddress
* @param streetNumber
* @param zipCode
* @param city
* @param birthday
* @param phoneNumber
* @param userId
*/

export interface UserAttributes {
     firstName: string;
     lastName: string;
     email: string;
     homeAddress: string;
     streetNumber: number;
     zipCode: number;
     city: string;
     birthday: string;
     phoneNumber: string;
     userId: number;
     userName: string;
     password: string;
     admin: boolean;
     image: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
        firstName: string;
        lastName: string;
        email: string;
        homeAddress: string;
        streetNumber: number;
        zipCode: number;
        city: string;
        birthday: string;
        phoneNumber: string;
        userId!: number;
        userName!: string;
        password!: string;
        admin!: boolean;
        image!: string; // path to image in /uploads

    public static initialize(sequelize: Sequelize) {
        User.init({
            userId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
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
                unique: true
            },
            homeAddress: {
                type: DataTypes.STRING,
                allowNull: false
            },
            streetNumber: {
                type: DataTypes.STRING,
                allowNull: false
            },
            zipCode: {
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
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: false
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
            {
                sequelize,
                tableName: 'users'
            }
        ); }
}
