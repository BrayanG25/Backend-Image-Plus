import { DataTypes, Model } from "sequelize";
import sequelize from '../sequelize.js';

export class Image extends Model {};

Image.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        image_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        width: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        url_raw: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url_small: {
            type: DataTypes.STRING,
            allowNull: false
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
        modelName: 'image',
        timestamps: false,
        tableName: 'image',
    }
);