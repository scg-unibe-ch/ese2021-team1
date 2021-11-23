import {Sequelize, DataTypes, Model} from 'sequelize';

export interface VoteAttributes {
    postId: number;
    like: number;
    dislike: number;
    communityScore: number;
}
export class Vote extends Model <VoteAttributes> implements VoteAttributes {
    postId!: number;
    like!: number;
    dislike!: number;
    communityScore!: number;

    public static initialize(sequelize: Sequelize) {
        Vote.init({
            postId: {
                type: DataTypes.INTEGER,
                primaryKey: true
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
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'votes'
        }
        ); }
}
