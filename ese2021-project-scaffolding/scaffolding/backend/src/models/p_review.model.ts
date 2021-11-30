import {Model, Sequelize, DataTypes, Optional} from 'sequelize';

export interface PReviewProperties {
    p_reviewId: number; // used for the database
    productId: number;
    title: string;
    image: string;
    text: string;
    stars: number;
    pros: string;
    cons: string;
    reported: boolean;
}

export interface  PReviewCreationProperties extends Optional<PReviewProperties, 'text' | 'pros' | 'cons' | 'image'> {}

export class PReview extends Model<PReviewProperties, PReviewCreationProperties> implements PReviewProperties {
    p_reviewId: number; // used for the database
    productId: number;
    title: string;
    image: string;
    text: string;
    stars: number;
    pros: string;
    cons: string;
    reported: boolean;

    public static initialize(sequelize: Sequelize) {
        PReview.init({
                p_reviewId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    defaultValue: 0
                },
                productId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                image: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                text: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                stars: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                pros: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                cons: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                reported: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false,
                    allowNull: false
                }
            },
            {
                sequelize,
                tableName: 'PReviews'
            }
        ); }
}
