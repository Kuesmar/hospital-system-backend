export class AppointmentNotFound extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AppointmentNotFound";
    }
}
