import { DataTypes, Model } from "sequelize";
import sequelize from "../connection";
import persons from "./persons";
import { PatientAttributes } from "../types/PatientAttributes";

interface PatientInstance extends Model<PatientAttributes>, PatientAttributes {};

const Patients = sequelize.define(
    'patients',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        personId: {
            type: DataTypes.INTEGER,
            references: { model: persons, key: 'id' } 
        }
    },
    {
        tableName: 'patients',
        underscored: true
    }
);

// Definir relación
Patients.belongsTo(persons, { foreignKey: "personId", as: 'person' });

export default Patients;
