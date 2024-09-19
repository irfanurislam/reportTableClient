import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GenerateReport = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/generate-report");
      alert("Report generated successfully!");
      navigate("/"); // Navigate back to home page
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Failed to generate report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Generate Report</h1>
      <button
        onClick={handleGenerateReport}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Report"}
      </button>
    </div>
  );
};
export default GenerateReport;
