
const Appointment = require("../models/Appointment");

const addAppointment = async (req, res) => {
  try {
    const { patientName, doctorName, date, time, reason } = req.body;

    if (!patientName || !doctorName || !date || !time || !reason) {
      return res.status(400).json({
        message: "Please fill all appointment fields",
      });
    }

    const appointment = await Appointment.create({
      patientName,
      doctorName,
      date,
      time,
      reason,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to create appointment",
      error: error.message,
    });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      user: req.user.id,
    }).sort({ date: 1 });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch appointments",
    });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete appointment",
    });
  }
};

module.exports = {
  addAppointment,
  getAppointments,
  deleteAppointment,
};
