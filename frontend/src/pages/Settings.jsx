
import { useState } from "react";
import { Settings as SettingsIcon, User, Mail, Lock, Save } from "lucide-react";

function Settings() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [name, setName] = useState(user.fullName || "");
  const [email, setEmail] = useState(user.email || "");
  const [message, setMessage] = useState("");

  const handleSave = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      fullName: name,
      email: email,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setMessage("Profile preferences saved on this device.");
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your profile preferences</p>
        </div>
        <SettingsIcon size={30} color="#0877bd" />
      </div>

      <div className="form-card settings-card">
        <div className="form-header">
          <h2>Profile Information</h2>
        </div>

        <form onSubmit={handleSave}>
          <label>Full Name</label>
          <div className="settings-input">
            <User size={18} />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              required
            />
          </div>

          <label>Email Address</label>
          <div className="settings-input">
            <Mail size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
            />
          </div>

          <p className="settings-note">
            These are local profile preferences only. Your database account
            details are not changed by this form.
          </p>

          <button type="submit" className="primary-btn">
            <Save size={17} /> Save Preferences
          </button>

          {message && <p className="success-message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Settings;
