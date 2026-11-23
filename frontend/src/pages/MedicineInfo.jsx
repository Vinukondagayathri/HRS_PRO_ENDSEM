
import { useState } from "react";
import { Search, Pill, Info, AlertTriangle } from "lucide-react";

function MedicineInfo() {
  const [medicine, setMedicine] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMedicine = async (e) => {
    e.preventDefault();

    if (!medicine.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const query = encodeURIComponent(medicine.trim());
      const url =
        `https://api.fda.gov/drug/label.json?search=` +
        `(openfda.brand_name:${query}+OR+openfda.generic_name:${query})&limit=1`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Medicine information not found. Try another name.");
      }

      const data = await response.json();
      setResult(data.results[0]);
    } catch (err) {
      setError(err.message || "Unable to connect to medicine database.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Medicine Information</h1>
          <p>Search medicine labels using the openFDA database</p>
        </div>
        <Pill size={30} color="#0877bd" />
      </div>

      <div className="form-card">
        <form onSubmit={searchMedicine}>
          <input
            type="text"
            placeholder="Enter medicine name, e.g. Aspirin"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
            required
          />

          <button className="primary-btn" type="submit" disabled={loading}>
            <Search size={17} />
            {loading ? "Searching..." : "Search Medicine"}
          </button>
        </form>
      </div>

      {error && <p className="error-message">{error}</p>}

      {result && (
        <div className="prescription-card medicine-result">
          <div className="prescription-card-header">
            <Pill size={26} />
            <Info size={22} color="#0877bd" />
          </div>

          <h3>
            {result.openfda?.brand_name?.[0] ||
              result.openfda?.generic_name?.[0] ||
              medicine}
          </h3>

          <p>
            <strong>Generic name:</strong>{" "}
            {result.openfda?.generic_name?.[0] || "Not available"}
          </p>

          <p>
            <strong>Manufacturer:</strong>{" "}
            {result.openfda?.manufacturer_name?.[0] || "Not available"}
          </p>

          <div className="medicine-section">
            <h4>Indications and Usage</h4>
            <p>
              {result.indications_and_usage?.[0] ||
                "Information not available."}
            </p>
          </div>

          <div className="medicine-section">
            <h4><AlertTriangle size={16} /> Warnings</h4>
            <p>
              {result.warnings?.[0] || "No warning information available."}
            </p>
          </div>

          <div className="medicine-section">
            <h4>Dosage and Administration</h4>
            <p>
              {result.dosage_and_administration?.[0] ||
                "Information not available."}
            </p>
          </div>

          <p className="medicine-disclaimer">
            Information retrieved from openFDA drug labels. This is for
            educational purposes only and is not a substitute for medical
            advice. Always consult a qualified healthcare professional.
          </p>
        </div>
      )}
    </div>
  );
}

export default MedicineInfo;
