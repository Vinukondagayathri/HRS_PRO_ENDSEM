const express = require("express");
const router = express.Router();

const {
  addRecord,
  getRecords,
  deleteRecord,
} = require("../controllers/medicalRecordController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getRecords);
router.post("/", protect, addRecord);
router.delete("/:id", protect, deleteRecord);

module.exports = router;