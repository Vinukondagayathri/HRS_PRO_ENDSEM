
import { useEffect, useState } from "react";
import { Users, Search, Mail, Phone, Droplet } from "lucide-react";
import API from "../services/api";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await API.get("/patients");
        setPatients(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Unable to load patients. Admin login may be required."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((patient) =>
    `${patient.fullName} ${patient.email} ${patient.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Patients</h1>
          <p>View and manage registered patients</p>
        </div>
        <div className="patient-total">
          <Users size={20} />
          Total: {patients.length}
        </div>
      </div>

      <div className="search-box">
        <Search size={19} />
        <input
          type="text"
          placeholder="Search patients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading patients...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : filteredPatients.length === 0 ? (
        <div className="empty-state">
          <Users size={40} />
          <h3>No patients found</h3>
          <p>Registered patients will appear here.</p>
        </div>
      ) : (
        <div className="prescription-grid">
          {filteredPatients.map((patient) => (
            <div className="prescription-card" key={patient._id}>
              <div className="prescription-card-header">
                <Users size={25} />
              </div>

              <h3>{patient.fullName}</h3>

              <p><Mail size={14} /> {patient.email}</p>
              <p><Phone size={14} /> {patient.phone}</p>
              <p><Droplet size={14} /> Blood Group: {patient.bloodGroup}</p>
              <p>Gender: {patient.gender}</p>
              <p>
                Date of Birth:{" "}
                {patient.dateOfBirth
                  ? new Date(patient.dateOfBirth).toLocaleDateString()
                  : "Not available"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Patients;
