import { InferAttributes, InferCreationAttributes, Model, NonAttribute } from "sequelize";
import { PatientAttributes } from "./PatientAttributes";
import { DoctorAttributes } from "./DoctorAttributes";

export interface AppointmentAttributes {
    id: number;
    patientId: number;
    doctorId: number;
    appointmentDate: string;
    appointmentTime: string;
    appointmentStatus: string;
    patient?: NonAttribute<PatientAttributes> | null;
    doctor?: NonAttribute<DoctorAttributes> | null;
    createdAt: Date;
    updatedAt: Date;
};
