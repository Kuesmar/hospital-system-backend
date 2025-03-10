import { DataTypes } from "sequelize";
import sequelize from "../connection";

const Persons = sequelize.define(
    'persons',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'persons',
        underscored: true
    }
);

export default Persons;
