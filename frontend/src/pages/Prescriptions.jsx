
import { useState, useEffect } from "react";
import {
  FileText,
  Plus,
  Search,
  Trash2,
  X,
  Pill,
} from "lucide-react";
import API from "../services/api";

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    medicineName: "",
    dosage: "",
    frequency: "",
    duration: "",
    doctor: "",
    date: "",
  });

  // Fetch prescriptions
  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/prescriptions");
      setPrescriptions(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Unable to load prescriptions. Please login again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add prescription
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/prescriptions", formData);

      setPrescriptions([
        response.data.prescription,
        ...prescriptions,
      ]);

      setFormData({
        medicineName: "",
        dosage: "",
        frequency: "",
        duration: "",
        doctor: "",
        date: "",
      });

      setShowForm(false);
      setError("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to add prescription."
      );
    }
  };

  // Delete prescription
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this prescription?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/prescriptions/${id}`);

      setPrescriptions((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Failed to delete prescription."
      );
    }
  };

  const filteredPrescriptions = prescriptions.filter((item) =>
    item.medicineName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Prescriptions</h1>
          <p>Manage your prescribed medicines</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} />
          Add Prescription
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="search-box">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search medicines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {showForm && (
        <div className="form-card">
          <div className="form-header">
            <h2>Add Prescription</h2>
            <button onClick={() => setShowForm(false)}>
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleAdd}>
            <input
              name="medicineName"
              placeholder="Medicine Name"
              value={formData.medicineName}
              onChange={handleChange}
              required
            />

            <input
              name="dosage"
              placeholder="Dosage (e.g. 500 mg)"
              value={formData.dosage}
              onChange={handleChange}
              required
            />

            <input
              name="frequency"
              placeholder="Frequency (e.g. Twice daily)"
              value={formData.frequency}
              onChange={handleChange}
              required
            />

            <input
              name="duration"
              placeholder="Duration (e.g. 5 days)"
              value={formData.duration}
              onChange={handleChange}
              required
            />

            <input
              name="doctor"
              placeholder="Doctor Name"
              value={formData.doctor}
              onChange={handleChange}
              required
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <button type="submit" className="primary-btn">
              Save Prescription
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <p>Loading prescriptions...</p>
      ) : filteredPrescriptions.length === 0 ? (
        <div className="empty-state">
          <Pill size={40} />
          <h3>No prescriptions found</h3>
          <p>Add your first prescription to get started.</p>
        </div>
      ) : (
        <div className="prescription-grid">
          {filteredPrescriptions.map((item) => (
            <div className="prescription-card" key={item._id}>
              <div className="prescription-card-header">
                <Pill size={22} />
                <button
                  onClick={() => handleDelete(item._id)}
                  title="Delete prescription"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <h3>{item.medicineName}</h3>
              <p><strong>Dosage:</strong> {item.dosage}</p>
              <p><strong>Frequency:</strong> {item.frequency}</p>
              <p><strong>Duration:</strong> {item.duration}</p>
              <p><strong>Doctor:</strong> {item.doctor}</p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Prescriptions;
