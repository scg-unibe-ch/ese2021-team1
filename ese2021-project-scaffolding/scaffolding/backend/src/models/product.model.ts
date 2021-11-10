import {Model, Sequelize, DataTypes, Optional} from 'sequelize';

export interface ProductProperties {
    id: number; // used for the database
    title: string;
    image: Blob;
    description: string;
    category: string; // separated by a comma
    available: boolean;
    price: number;
    discount: number;
}

export interface  ProductCreationProperties extends Optional<ProductProperties, 'discount'> {}

export class Product extends Model<ProductProperties, ProductCreationProperties> implements ProductProperties {
    id: number;
    title: string;
    image: Blob;
    description: string;
    category: string;
    available: boolean;
    price: number;
    discount: number;

    public static initialize(sequelize: Sequelize) {
        Product.init({
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    defaultValue: 0
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false
                },

                image: {
                    type: DataTypes.BLOB,
                    allowNull: false
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
                    defaultValue: 1
            }
            },
            {
                sequelize,
                tableName: 'products'
            }
        ); }
}
