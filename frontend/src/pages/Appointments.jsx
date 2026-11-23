
import { useEffect, useState } from "react";
import { CalendarDays, Plus, Trash2, Clock } from "lucide-react";
import API from "../services/api";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    patientName: "",
    doctorName: "",
    date: "",
    time: "",
    reason: "",
  });

  const fetchAppointments = async () => {
    try {
      const response = await API.get("/appointments");
      setAppointments(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/appointments", form);
      setAppointments((prev) => [...prev, response.data.appointment]);
      setForm({
        patientName: "",
        doctorName: "",
        date: "",
        time: "",
        reason: "",
      });
      setShowForm(false);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save appointment");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;

    try {
      await API.delete(`/appointments/${id}`);
      setAppointments((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete appointment");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Appointments</h1>
          <p>Schedule and manage patient appointments</p>
        </div>

        <button className="primary-btn" onClick={() => setShowForm(!showForm)}>
          <Plus size={18} /> Add Appointment
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {showForm && (
        <div className="form-card">
          <div className="form-header">
            <h2>New Appointment</h2>
            <button type="button" onClick={() => setShowForm(false)}>✕</button>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              placeholder="Patient Name"
              value={form.patientName}
              onChange={(e) => setForm({ ...form, patientName: e.target.value })}
              required
            />
            <input
              placeholder="Doctor Name"
              value={form.doctorName}
              onChange={(e) => setForm({ ...form, doctorName: e.target.value })}
              required
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              required
            />
            <input
              placeholder="Reason for visit"
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              required
            />
            <button className="primary-btn" type="submit">
              Save Appointment
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <p>Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <div className="empty-state">
          <CalendarDays size={40} />
          <h3>No appointments yet</h3>
          <p>Add your first appointment to get started.</p>
        </div>
      ) : (
        <div className="prescription-grid">
          {appointments.map((item) => (
            <div className="prescription-card" key={item._id}>
              <div className="prescription-card-header">
                <CalendarDays size={25} />
                <button onClick={() => handleDelete(item._id)} title="Delete">
                  <Trash2 size={17} />
                </button>
              </div>

              <h3>{item.patientName}</h3>
              <p>Doctor: {item.doctorName}</p>
              <p>
                <CalendarDays size={14} />
                {new Date(item.date).toLocaleDateString()}
              </p>
              <p><Clock size={14} /> {item.time}</p>
              <p>Reason: {item.reason}</p>
              <p>Status: {item.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Appointments;
