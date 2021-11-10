import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import {Product} from './product.model';

export interface OrderAttributes {
    orderId: number;
    userId: number;
    products: Product[];
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
    products: Product[];
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
                    primaryKey: true
                },
                userId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true
                },
                products: {
                    type: DataTypes.ARRAY,
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
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            {
                sequelize,
                tableName: 'orders'
            }
        ); }
}
