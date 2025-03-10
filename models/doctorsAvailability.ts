import { DataTypes } from "sequelize";
import sequelize from "../connection";

const DoctorAvailability = sequelize.define(
    'doctorsAvailability',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        doctorId: {
            type: DataTypes.INTEGER
        },
        availableDay: {
            type: DataTypes.STRING
        },
        availableHour: {
            type: DataTypes.TIME
        }
    },
    {
        underscored: true
    }
);

export default DoctorAvailability;
