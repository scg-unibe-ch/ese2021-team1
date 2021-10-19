import { TodoItem, TodoItemAttributes, TodoItemCreationAttributes } from './todoitem.model';
import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface PostAttributes {
    title: string;
    text: string;
    image;
    category: string;
    upvotes: number;
    downvote: number;
    created_at;
    userId: number;
}

export interface PostCreationAttributes extends Optional<PostAttributes, 'text'| 'image'> { }

export class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {

    title: string;
    text: string;
    image;
    category: string;
    upvotes: number;
    downvote: number;
    created_at;
    userId: number;
    public static creatPost(sequelize: Sequelize) {
        Post.init({
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            text: {
                type: DataTypes.STRING,
                allowNull: true
            },
            image: {
                type: DataTypes.BLOB,
                allowNull: true
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false
            },
            upvotes: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            downvote: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false
            },
                userId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true
                }
            },
            {
                sequelize,
                tableName: 'posts'
            }
        ); }
}
