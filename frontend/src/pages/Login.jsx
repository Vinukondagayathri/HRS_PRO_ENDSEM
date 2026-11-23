
import { useState } from "react";
import {
  HeartPulse,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("Patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // Verify selected role matches account role
      if (user.role !== role.toLowerCase()) {
        setError("Selected role does not match your account.");
        setLoading(false);
        return;
      }

      // Store authentication details
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Navigate after successful login
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed. Please check your server connection."
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
          <span className="welcome-tag">YOUR HEALTH, OUR PRIORITY</span>
          <h1>Welcome Back!</h1>
          <p>
            Access your medical records, prescriptions and
            healthcare information securely in one place.
          </p>

          <div className="trust-info">
            <ShieldCheck size={22} />
            <span>Secure and confidential health records</span>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Sign In</h2>
          <p className="subtitle">
            Please enter your account details.
          </p>

          <label>Login as</label>

          <div className="role-selector">
            <button
              type="button"
              className={role === "Patient" ? "active" : ""}
              onClick={() => setRole("Patient")}
            >
              Patient
            </button>

            <button
              type="button"
              className={role === "Admin" ? "active" : ""}
              onClick={() => setRole("Admin")}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleLogin}>
            <label>Email Address</label>

            <div className="input-box">
              <Mail size={19} />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <label>Password</label>

            <div className="input-box">
              <Lock size={19} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="eye-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>

            {error && (
              <p style={{ color: "red", marginTop: "12px" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="register-link">
            Don't have an account?{" "}
            <Link to="/register">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
