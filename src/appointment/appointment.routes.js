import { Router } from "express";
import { saveAppointment,userAppointments } from "./appointment.controller.js";
import { createAppointmentValidator,userAppointmentsValidator } from "../middlewares/appointment-validators.js";

const router = Router();

router.post("/createAppointment", createAppointmentValidator, saveAppointment);

router.get("/userAppointments/:uid", userAppointmentsValidator, userAppointments);

export default router;