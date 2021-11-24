import {Sequelize, DataTypes, Model} from 'sequelize';

export interface VoteAttributes {
    postId: number;
    userId: number;
    like: boolean;
    dislike: boolean;
}
export class Vote extends Model <VoteAttributes> implements VoteAttributes {
    postId!: number;
    userId!: number;
    like!: boolean;
    dislike!: boolean;

    public static initialize(sequelize: Sequelize) {
        Vote.init({
            postId: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            userId: {
                type: DataTypes.INTEGER,
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
