import express, { Request, Response, Application } from 'express';
import { auth } from './connection';
import appointments from './models/appointments';
import patients from './models/patients';
import doctors from './models/doctors';
import { AppointmentAttributes } from "./types/AppointmentAttributes";
import { asyncHandler } from './middleware/asyncHandler';
import { errorHandler } from './middleware/errorHandler';
import { DoctorNotFound } from './errors/DoctorNotFound';
import { AppointmentNotFound } from './errors/AppointmentNotFound';
import { PatientNotFound } from './errors/PatientNotFound';
import { UserNotFound } from './errors/UserNotFound';
import { BadRequest } from './errors/BadRequest';
import cors from 'cors';
import persons from './models/persons';

const app: Application = express();
const port = 3000;
auth();
app.use(cors({
    origin: 'http://localhost:5173', // Permite solo el frontend
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type,Authorization' // Headers permitidos
}));

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Welcome to Hospital Manager');
});

app.get('/patients/', asyncHandler(async (req: Request, res: Response) => {
    const allPatients = await patients.findAll({
        include: [{ model: persons, as:'person' ,attributes: ["firstName", "lastName", "email", "phone"] }]
    });
    res.status(200).json(allPatients);
}));

app.get('/patients/:id', asyncHandler (async (req: Request, res: Response) => {
    const patientId = parseInt(req.params.id);

    if (isNaN(patientId)) {
        throw new BadRequest('Invalid patient ID');
    }

    const patientFinded = await patients.findOne({ where: { id: patientId } });

    if (!patientFinded) {
        throw new PatientNotFound('Patient not found');
    }

    res.status(200).json(patientFinded);
}));

app.get('/doctors/', asyncHandler(async (req: Request, res: Response) => {
    const allDoctors = await doctors.findAll({
        include: [{ model: persons, as:'person' ,attributes: ["firstName", "lastName", "email", "phone"] }]
    });
    res.status(200).json(allDoctors);
}));

app.get('/doctors/:id', asyncHandler(async (req: Request, res: Response) => {
    const doctorId = parseInt(req.params.id);

    if (isNaN(doctorId)) {
        throw new BadRequest('Invalid doctor ID');
    }

    const doctorFinded = await doctors.findOne({ where: { id: doctorId } });

    if (!doctorFinded) {
        throw new DoctorNotFound('Doctor not found');
    }

    res.status(200).json(doctorFinded);
}));

app.get('/appointments/', asyncHandler(async (req: Request, res: Response) => {
    const { status, date } = req.query;
    const param: any = {}; 
    
    if (status) {
        param.appointment_status = status;
    }

    if (date) {
        param.appointment_date = date;
    }

    const filteredAppointments = (await appointments.findAll({
        include: [
            {
                model: patients,
                as: "patient",
                include: [{ model: persons, as: "person" }]
            },
            {
                model: doctors,
                as: "doctor",
                include: [{ model: persons, as: "person" }]
            }
        ],
        where: param
    })).map((appointment) => appointment.toJSON());

    const formattedAppointments = filteredAppointments.map((appointment) => ({
        id: appointment.id,
        patientName: `${appointment.patient?.person?.firstName || "N/A"} ${appointment.patient?.person?.lastName || "N/A"}`,
        doctorName: `${appointment.doctor?.person?.firstName || "N/A"} ${appointment.doctor?.person?.lastName || "N/A"}`,
        appointmentDate: appointment.appointmentDate,
        appointmentTime: appointment.appointmentTime,
        appointmentStatus: appointment.appointmentStatus
    }));
    console.log('FormatedAppointments: ', formattedAppointments);
    res.status(200).json(formattedAppointments);
}));

app.get('*', (req: Request, res: Response) => {
    res.status(404).send('404 not found');
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listen on port ${port}`);
});
