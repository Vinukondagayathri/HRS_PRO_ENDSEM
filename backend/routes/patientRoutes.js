
const express = require("express");
const router = express.Router();

const { getPatients } = require("../controllers/patientController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", protect, authorize("admin"), getPatients);

module.exports = router;
