import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

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
     communityScore: number;

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
        communityScore: number;

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
            communityScore: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
            {
                sequelize,
                tableName: 'users'
            }
        ); }
}
