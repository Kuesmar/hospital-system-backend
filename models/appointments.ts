import { Attributes, DataTypes, Model } from "sequelize";
import sequelize from "../connection";
import patients from "./patients";
import doctors from "./doctors";
import { AppointmentAttributes } from "../types/AppointmentAttributes";

interface AppointmentInstance extends Model<AppointmentAttributes>, AppointmentAttributes {};

const Appointments = sequelize.define<AppointmentInstance>(
    'appointments',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        patientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: patients, key: 'id' }
        },
        doctorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: doctors, key: 'id' }
        },
        appointmentDate: {
            type: DataTypes.DATE
        },
        appointmentTime: {
            type: DataTypes.TIME
        },
        appointmentStatus: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        underscored: true,
        tableName: "appointments"
    }
);

// 🔹 Definir relaciones
Appointments.belongsTo(patients, { foreignKey: 'patientId', as: 'patient' });
Appointments.belongsTo(doctors, { foreignKey: 'doctorId', as: 'doctor' });

export default Appointments;
