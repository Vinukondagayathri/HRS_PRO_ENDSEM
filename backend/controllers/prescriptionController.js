
const Prescription = require("../models/Prescription");

// Add prescription
const addPrescription = async (req, res) => {
  try {
    const {
      medicineName,
      dosage,
      frequency,
      duration,
      doctor,
      date,
    } = req.body;

    if (!medicineName || !dosage || !frequency || !duration || !doctor || !date) {
      return res.status(400).json({
        message: "Please fill in all fields",
      });
    }

    const prescription = await Prescription.create({
      medicineName,
      dosage,
      frequency,
      duration,
      doctor,
      date,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Prescription added successfully",
      prescription,
    });
  } catch (error) {
    console.error("Add prescription error:", error.message);
    res.status(500).json({
      message: "Failed to add prescription",
    });
  }
};

// Get prescriptions
const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      user: req.user.id,
    }).sort({ date: -1 });

    res.status(200).json(prescriptions);
  } catch (error) {
    console.error("Get prescriptions error:", error.message);
    res.status(500).json({
      message: "Failed to fetch prescriptions",
    });
  }
};

// Delete prescription
const deletePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!prescription) {
      return res.status(404).json({
        message: "Prescription not found",
      });
    }

    res.status(200).json({
      message: "Prescription deleted successfully",
    });
  } catch (error) {
    console.error("Delete prescription error:", error.message);
    res.status(500).json({
      message: "Failed to delete prescription",
    });
  }
};

module.exports = {
  addPrescription,
  getPrescriptions,
  deletePrescription,
};
