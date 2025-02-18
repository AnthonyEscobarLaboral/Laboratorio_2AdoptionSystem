import Pet from "../pet/pet.model.js";
import Appointment from "../appointment/appointment.model.js";
import User from "../user/user.model.js"
import { parse } from "date-fns";

export const saveAppointment = async (req, res) => {
  try {
    const data = req.body;

    const isoDate = new Date(data.date);

    if (isNaN(isoDate.getTime())) {
      return res.status(400).json({
        success: false,
        msg: "Fecha inválida",
      });
    }

    const pet = await Pet.findOne({ _id: data.pet });
    if (!pet) {
      return res.status(404).json({
        success: false,
        msg: "No se encontró la mascota"
      });
    }

    const existAppointment = await Appointment.findOne({
      pet: data.pet,
      user: data.user,
      date: {
        $gte: new Date(isoDate).setHours(0, 0, 0, 0),
        $lt: new Date(isoDate).setHours(23, 59, 59, 999),
      },
    });

    if (existAppointment) {
      return res.status(400).json({
        success: false,
        msg: "El usuario y la mascota ya tienen una cita para este día",
      });
    }

    const appointment = new Appointment({ ...data, date: isoDate });
    await appointment.save();

    return res.status(200).json({
      success: true,
      msg: `Cita creada exitosamente en fecha ${data.date}`,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: "Error al crear la cita",
      error
    });
  }
};


export const userAppointments = async (req, res) => {
  try {
    const { uid } = req.params;
    const appointmentsArray = await Appointment.find({ user: uid });

    const user = await User.findById(uid);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found"
      })
    }

    if (appointmentsArray.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No se pudo encontrar las citas de este usuario"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Citas de usuario encontradas exitosamente",
      appointmentsArray
    })

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener las citas del usuario",
      error: err.message
    })
  }
}

export const updateAppointment = async (req, res) => {
  try {
      const { aid } = req.params;
      const  data  = req.body;

      const changedAppointment = await Appointment.findByIdAndUpdate(aid, data, { new: true });

      res.status(200).json({
          success: true,
          msg: 'Cambios de cita Actualizada',
          changedAppointment,
      });
  } catch (err) {
      res.status(500).json({
          success: false,
          msg: 'Error al actualizar la cita',
          error: err.message
      });
  }
}

export const cancelAppointment = async (req, res) => {
  try {
    const { aid } = req.params;

    const appointmentExists = await Appointment.findById(aid);

    if (!appointmentExists) {
      return res.status(404).json({
        success: false,
        msg: "ID de cita no encontrada",
      });
    }

    appointmentExists.status = 'CANCELLED';
    await appointmentExists.save();

    return res.status(200).json({
      success: true,
      msg: "Cita cancelada con exito",
      appointmentExists,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: "Error para cancelar la cita",
      error,
    });
  }
}