import {Sequelize, DataTypes, Model} from 'sequelize';
/**
* @param voteId
* @param postId
* @param userName
* @param like
* @param dislike
*/
export interface VoteAttributes {
    voteId: number;
    postId: number;
    userName: string;
    like: boolean;
    dislike: boolean;
}
export class Vote extends Model <VoteAttributes> implements VoteAttributes {
    voteId!: number;
    postId!: number;
    userName!: string;
    like!: boolean;
    dislike!: boolean;
/**
* @param sequelize
* initialze the voting counter
*/
    public static initialize(sequelize: Sequelize) {
        Vote.init({
            voteId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            postId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            like: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            dislike: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        }, {
            sequelize,
            tableName: 'votes'
        }
        ); }
}
