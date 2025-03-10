import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";
import persons from "./persons";
import { DoctorAttributes } from "../types/DoctorAttributes";

interface DoctorInstance extends Model<DoctorAttributes>, DoctorAttributes {};

const Doctors = sequelize.define(
    'doctors',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        personId: {
            type: DataTypes.INTEGER,
            references: { model: persons, key: 'id' } 
        },
        specialty: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'doctors',
        underscored: true
    }
);

// Definir relación
Doctors.belongsTo(persons, { foreignKey: "personId", as: 'person' });

export default Doctors;
