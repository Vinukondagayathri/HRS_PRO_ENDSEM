
const MedicalRecord = require("../models/MedicalRecord");

// Add a medical record
const addRecord = async (req, res) => {
  try {
    const { title, type, doctor, date } = req.body;

    if (!title || !type || !doctor || !date) {
      return res.status(400).json({
        message: "Please fill in all fields",
      });
    }

    const record = await MedicalRecord.create({
      title,
      type,
      doctor,
      date,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Medical record added successfully",
      record,
    });
  } catch (error) {
    console.error("Add record error:", error.message);
    res.status(500).json({
      message: "Failed to add medical record",
    });
  }
};

// Get records belonging to logged-in patient
const getRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find({
      user: req.user.id,
    }).sort({ date: -1 });

    res.status(200).json(records);
  } catch (error) {
    console.error("Get records error:", error.message);
    res.status(500).json({
      message: "Failed to fetch medical records",
    });
  }
};

// Delete a medical record belonging to logged-in patient
const deleteRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!record) {
      return res.status(404).json({
        message: "Medical record not found",
      });
    }

    res.status(200).json({
      message: "Medical record deleted successfully",
    });
  } catch (error) {
    console.error("Delete record error:", error.message);
    res.status(500).json({
      message: "Failed to delete medical record",
    });
  }
};

module.exports = {
  addRecord,
  getRecords,
  deleteRecord,
};
