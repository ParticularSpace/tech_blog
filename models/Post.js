const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        // define columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            },
        // image: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        //     },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
                },
            },
        },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
        }
    );

module.exports = Post;


