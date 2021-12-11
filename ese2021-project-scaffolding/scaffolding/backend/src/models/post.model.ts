import {Optional, Model, Sequelize, DataTypes, INTEGER} from 'sequelize';

/**
* @param id
* @param title
* @param text
* @param image
* @param category
* @param userName
* @param dislike
* @param like
* @param communityScore
 * @param reported
*/
export interface PostAttributes {
    id: number;
    title: string;
    text: string;
    image: string; // just a reference to the place that the images is stored (in /uploads)
    category: string; // will be a comma separated string containing labels
    userName: string;
    dislike: number;
    like: number;
    communityScore: number;
    reported: number;
    userID: number;
}

export interface PostCreationAttributes extends Optional<PostAttributes, 'text'| 'image' | 'reported'> { }

export class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
    id: number;
    title: string;
    text: string;
    image: string;
    category: string;
    userName: string;
    dislike: number;
    like: number;
    communityScore: number;
    reported: number;
    userID: number;

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
            },
            like: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            dislike: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            communityScore: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            reported: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            userID: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
            },
            {
                sequelize,
                tableName: 'posts'
            }
        ); }
}
