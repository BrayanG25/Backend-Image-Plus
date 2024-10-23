import { DataTypes, Model } from "sequelize";
import sequelize from '../sequelize.js';

export class Favorite extends Model {};

Favorite.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fk_user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fk_image_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        like: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        }
    },
    {
        sequelize,
        modelName: 'favorite',
        timestamps: false,
        tableName: 'favorite',
    }
);