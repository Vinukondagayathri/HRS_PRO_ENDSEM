
const User = require("../models/User");

// Get all registered patients
const getPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: "patient" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch patients",
      error: error.message,
    });
  }
};

module.exports = { getPatients };
