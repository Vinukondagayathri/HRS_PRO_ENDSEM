
import { useState, useEffect } from "react";
import {
  FileText, Plus, Search, Trash2, Eye, X
} from "lucide-react";
import API from "../services/api";

function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    type: "Laboratory Report",
    doctor: "",
    date: ""
  });

  // Fetch records from MongoDB
  const fetchRecords = async () => {
    try {
      setError("");
      const response = await API.get("/medical-records");
      setRecords(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load medical records. Please login again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Add new record
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/medical-records", form);

      setRecords((previous) => [
        response.data.record,
        ...previous
      ]);

      setForm({
        title: "",
        type: "Laboratory Report",
        doctor: "",
        date: ""
      });

      setShowForm(false);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to save medical record."
      );
    }
  };

  // Delete record
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) {
      return;
    }

    try {
      await API.delete(`/medical-records/${id}`);

      setRecords((previous) =>
        previous.filter((record) => record._id !== id)
      );

      setSelectedRecord(null);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to delete medical record."
      );
    }
  };

  // Search records
  const filteredRecords = records.filter((record) =>
    record.title.toLowerCase().includes(search.toLowerCase()) ||
    record.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="module-page">

      <header className="module-header">
        <div>
          <h1>Medical Records</h1>
          <p>Manage and access your medical history.</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setShowForm(true)}
        >
          <Plus size={18} /> Add Record
        </button>
      </header>

      {error && (
        <p style={{ color: "red", marginBottom: "15px" }}>
          {error}
        </p>
      )}

      <div className="module-summary">
        <FileText size={28} />
        <div>
          <h2>{records.length}</h2>
          <p>Total Medical Records</p>
        </div>
      </div>

      <div className="records-container">

        <div className="records-toolbar">
          <h3>All Records</h3>

          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search records..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="records-table">
            <thead>
              <tr>
                <th>Record Name</th>
                <th>Record Type</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="empty-message">
                    Loading medical records...
                  </td>
                </tr>
              ) : filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-message">
                    No medical records found.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((record) => (
                  <tr key={record._id}>
                    <td>{record.title}</td>
                    <td>
                      <span className="record-badge">
                        {record.type}
                      </span>
                    </td>
                    <td>{record.doctor}</td>
                    <td>
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="view-btn"
                          title="View record"
                          onClick={() => setSelectedRecord(record)}
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          className="delete-btn"
                          title="Delete record"
                          onClick={() => handleDelete(record._id)}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-heading">
              <h2>Add Medical Record</h2>
              <button onClick={() => setShowForm(false)}>
                <X />
              </button>
            </div>

            <form onSubmit={handleAdd}>
              <label>Record Name</label>
              <input
                required
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                placeholder="Enter record name"
              />

              <label>Record Type</label>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value })
                }
              >
                <option>Laboratory Report</option>
                <option>Diagnostic Report</option>
                <option>Consultation</option>
                <option>Imaging Report</option>
                <option>Other</option>
              </select>

              <label>Doctor Name</label>
              <input
                required
                value={form.doctor}
                onChange={(e) =>
                  setForm({ ...form, doctor: e.target.value })
                }
                placeholder="Enter doctor name"
              />

              <label>Record Date</label>
              <input
                required
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
              />

              <button type="submit" className="primary-btn modal-submit">
                Save Record
              </button>
            </form>
          </div>
        </div>
      )}

      {selectedRecord && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-heading">
              <h2>Record Details</h2>
              <button onClick={() => setSelectedRecord(null)}>
                <X />
              </button>
            </div>

            <p><strong>Name:</strong> {selectedRecord.title}</p>
            <p><strong>Type:</strong> {selectedRecord.type}</p>
            <p><strong>Doctor:</strong> {selectedRecord.doctor}</p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedRecord.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

export default MedicalRecords;
