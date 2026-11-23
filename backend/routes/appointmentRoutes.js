
const express = require("express");
const router = express.Router();

const {
  addAppointment,
  getAppointments,
  deleteAppointment,
} = require("../controllers/appointmentController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getAppointments);
router.post("/", protect, addAppointment);
router.delete("/:id", protect, deleteAppointment);

module.exports = router;
