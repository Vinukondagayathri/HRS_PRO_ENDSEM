
const express = require("express");
const router = express.Router();

const {
  addPrescription,
  getPrescriptions,
  deletePrescription,
} = require("../controllers/prescriptionController");

const { protect } = require("../middleware/authMiddleware");

// Get all prescriptions
router.get("/", protect, getPrescriptions);

// Add a prescription
router.post("/", protect, addPrescription);

// Delete a prescription
router.delete("/:id", protect, deletePrescription);

module.exports = router;
