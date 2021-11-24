import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface PostAttributes {
    id: number;
    title: string;
    text: string;
    image: string; // just a reference to the place that the images is stored (in /uploads)
    category: string; // will be a comma separated string containing labels
    userName: string;
}

export interface PostCreationAttributes extends Optional<PostAttributes, 'text'| 'image'> { }

export class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
    id: number;
    title: string;
    text: string;
    image: string;
    category: string;
    userName: string;

    public static initialize(sequelize: Sequelize) {
        Post.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            text: {
                type: DataTypes.STRING,
                allowNull: true
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true
            },
            category: {
                type: DataTypes.STRING,
                allowNull: true
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false
            }
            },
            {
                sequelize,
                tableName: 'posts'
            }
        ); }
}
