import { NextFunction, Request, Response } from "express";
import { DoctorNotFound } from "../errors/DoctorNotFound";
import { AppointmentNotFound } from "../errors/AppointmentNotFound";
import { PatientNotFound } from "../errors/PatientNotFound";
import { UserNotFound } from "../errors/UserNotFound";
import { BadRequest } from "../errors/BadRequest";

// const INTERNAL_SERVER_ERROR = 'Internal Server Error';
// const BAD_REQUEST = 'Bad Request';

enum ErrorMessage {
    INTERNAL_SERVER_ERROR = 'Internal Server Error',
    BAD_REQUEST = 'Bad Request'
};

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if(err instanceof DoctorNotFound) {
        res.status(404).json({ error: err.message });
    };

    if(err instanceof AppointmentNotFound) {
        res.status(404).json({ error: err.message });
    };

    if(err instanceof PatientNotFound) {
        res.status(404).json({ error: err.message });
    };

    if(err instanceof UserNotFound) {
        res.status(404).json({ error: err.message });
    };

    if(err instanceof BadRequest) {
        res.status(400).json({ error: err.message });
    };

    res.status(500).json({ error: ErrorMessage.INTERNAL_SERVER_ERROR });
};
