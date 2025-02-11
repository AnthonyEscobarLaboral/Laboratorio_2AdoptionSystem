import { Router } from "express";
import { saveAppointment,userAppointments,updateAppointment,cancelAppointment } from "./appointment.controller.js";
import { createAppointmentValidator,userAppointmentsValidator,updateAppointmentValidator,cancelAppointmentValidator} from "../middlewares/appointment-validators.js";

const router = Router();

router.post("/createAppointment", createAppointmentValidator, saveAppointment);

router.get("/userAppointments/:uid", userAppointmentsValidator, userAppointments);

router.put("/updateAppointment/:aid", updateAppointmentValidator, updateAppointment);

router.delete("/cancelAppointment/:aid", cancelAppointmentValidator,cancelAppointment);

export default router;