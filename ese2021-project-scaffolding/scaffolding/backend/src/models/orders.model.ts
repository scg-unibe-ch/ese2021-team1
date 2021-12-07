import {Optional, Model, Sequelize, DataTypes, INTEGER} from 'sequelize';

/**
* @param orderId
* @param userId
* @param products
* @param paymentMethod
* @param homeAddress
* @param streetNumber
* @param zipCode
* @param city
* @param processingStatus
* @param purchaseDate
*/
export interface OrderAttributes {
    orderId: number;
    userId: number;
    products: string; // product ids separated by comma
    paymentMethod: string;
    homeAddress: string;
    streetNumber: number;
    zipCode: number;
    city: string;
    processingStatus: string;
    purchaseDate: string;
}


export class Orders extends Model<OrderAttributes> implements OrderAttributes {
    orderId: number;
    userId: number;
    products: string;
    paymentMethod: string;
    homeAddress: string;
    streetNumber: number;
    zipCode: number;
    city: string;
    processingStatus: string;
    purchaseDate: string;

    public static initialize(sequelize: Sequelize) {
        Orders.init({
                orderId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                products: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                paymentMethod: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                homeAddress: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                streetNumber: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                zipCode: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                city: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                processingStatus: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    defaultValue: 'Pending'
                },
                purchaseDate: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            {
                sequelize,
                tableName: 'orders'
            }
        ); }
}
