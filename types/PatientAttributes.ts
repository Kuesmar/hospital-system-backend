import { PersonAttributes } from "./PersonAttributes";

export interface PatientAttributes {
    id: number;
    personId: number;
    createdAt: Date;
    updatedAt: Date;
    person?: PersonAttributes;
};
