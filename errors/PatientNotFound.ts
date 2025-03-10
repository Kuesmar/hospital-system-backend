export class PatientNotFound extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PatientNotFound";
    }
}
