
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const medicalRecordRoutes = require("./routes/medicalRecordRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const patientRoutes = require("./routes/patientRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const { protect, authorize } = require("./middleware/authMiddleware");

const app = express();

// Middleware

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
}));


app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Health Records System API is running"
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Medical records routes
app.use("/api/medical-records", medicalRecordRoutes);

// Prescription routes
app.use("/api/prescriptions", prescriptionRoutes);

// Patient routes
app.use("/api/patients", patientRoutes);

// Appointment routes
app.use("/api/appointments", appointmentRoutes);

// Protected test route
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Authentication successful",
    user: req.user,
  });
});

// Admin-only route
app.get("/api/admin", protect, authorize("admin"), (req, res) => {
  res.json({
    message: "Welcome, Admin!"
  });
});

// Start server after database connection
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
