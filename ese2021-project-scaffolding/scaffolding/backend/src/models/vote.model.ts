import {Sequelize, DataTypes, Model} from 'sequelize';

export interface VoteAttributes {
    postId: number;
    userName: string;
    like: boolean;
    dislike: boolean;
}
export class Vote extends Model <VoteAttributes> implements VoteAttributes {
    postId!: number;
    userName!: string;
    like!: boolean;
    dislike!: boolean;

    public static initialize(sequelize: Sequelize) {
        Vote.init({
            postId: {
                type: DataTypes.INTEGER,
                primaryKey: true
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
