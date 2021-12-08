import {Model, Sequelize, DataTypes, Optional} from 'sequelize';

/**
* @param id
* @param title
* @param image
* @param description
* @param category
* @param available
* @param price
* @param discount
* @param deleted
*/
export interface ProductProperties {
    id: number; // used for the database
    title: string;
    image: string;
    description: string;
    category: string; // separated by a comma
    available: boolean;
    price: number;
    discount: number;
    deleted: boolean;
}

export interface  ProductCreationProperties extends Optional<ProductProperties, 'discount'> {}

export class Product extends Model<ProductProperties, ProductCreationProperties> implements ProductProperties {
    id!: number;
    title: string;
    image: string;
    description: string;
    category: string;
    available: boolean;
    price: number;
    discount: number;
    deleted: boolean;

    public static initialize(sequelize: Sequelize) {
        Product.init({
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                image: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                description: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                category: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                available: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false
                },
                price: {
                        type: DataTypes.FLOAT,
                        allowNull: false
                },
                discount: {
                        type: DataTypes.FLOAT,
                        defaultValue: 1,
                        allowNull: false
                },
                deleted: {
                        type: DataTypes.BOOLEAN,
                        defaultValue: false,
                        allowNull: false
                }
            },
            {
                sequelize,
                tableName: 'products'
            }
        ); }
}
