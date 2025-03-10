import { PersonAttributes } from "./PersonAttributes";

export interface DoctorAttributes {
    id: number;
    personId: number;
    createdAt: Date;
    updatedAt: Date;
    person?: PersonAttributes; // Relación con Person
};
