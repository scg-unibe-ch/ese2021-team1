import {DataTypes, Model, Optional, Sequelize} from 'sequelize';

export interface CommentAttributes {
    postID: number;
    commentID: number;
    text: string;
    reported: number;
    userID: number;
}

export interface CommentCreationAttributes extends Optional<CommentAttributes, 'reported'> { }
export class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
    postID: number;
    commentID: number;
    text: string;
    reported: number;
    userID: number;

    public static initialize(sequelize: Sequelize) {
        Comment.init({
                postID: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                commentID: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                text: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                reported: {
                    type: DataTypes.INTEGER,
                    allowNull: true
                },
                userID: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
                {
                sequelize,
                tableName: 'comments'
            }
        ); }
}
