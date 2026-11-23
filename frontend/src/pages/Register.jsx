
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HeartPulse,
  User,
  Mail,
  Phone,
  Lock,
} from "lucide-react";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post(
        "/auth/register",
        formData
      );

      setSuccess(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed. Check your server connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="brand">
          <HeartPulse size={32} />
          <span>HealthCare+</span>
        </div>

        <div className="login-content">
          <span className="welcome-tag">
            YOUR HEALTH, OUR PRIORITY
          </span>

          <h1>Join Our Healthcare Community</h1>

          <p>
            Create your personal account to securely access
            and manage your healthcare information.
          </p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card register-card">
          <h2>Create Account</h2>

          <p className="subtitle">
            Enter your details to get started.
          </p>

          <form
            className="register-form"
            onSubmit={handleRegister}
          >
            <label>Full Name</label>
            <div className="input-box">
              <User size={18} />
              <input
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <label>Email Address</label>
            <div className="input-box">
              <Mail size={18} />
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <label>Phone Number</label>
            <div className="input-box">
              <Phone size={18} />
              <input
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <label>Date of Birth</label>
            <input
              className="register-input"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />

            <label>Gender</label>
            <select
              className="register-input"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">
                Prefer not to say
              </option>
            </select>

            <label>Blood Group</label>
            <select
              className="register-input"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
            >
              <option value="">Select blood group</option>
              {[
                "A+", "A-", "B+", "B-", "O+", "O-",
                "AB+", "AB-", "Unknown",
              ].map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>

            <label>Password</label>
            <div className="input-box">
              <Lock size={18} />
              <input
                name="password"
                type="password"
                placeholder="Create password (minimum 8 characters)"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                required
              />
            </div>

            <label>Confirm Password</label>
            <div className="input-box">
              <Lock size={18} />
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                minLength={8}
                required
              />
            </div>

            {error && (
              <p style={{ color: "red", marginTop: "12px" }}>
                {error}
              </p>
            )}

            {success && (
              <p style={{ color: "green", marginTop: "12px" }}>
                {success}
              </p>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="register-link">
            Already have an account?{" "}
            <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
