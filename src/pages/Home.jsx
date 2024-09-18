import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [report, setReport] = useState([]);
  const [grossTotal, setGrossTotal] = useState(0);
  const [grossQuantity, setGrossQuantity] = useState(0);
  const [grossPrice, setGrossPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get("http://localhost:5000/report");
        const reportData = response.data;
        setReport(reportData);

        // Calculate the gross total, quantity, and price
        const totals = reportData.reduce(
          (acc, item) => {
            acc.quantity += parseInt(item.quantity);
            acc.price += parseFloat(item.price);
            acc.total += parseFloat(item.total);
            return acc;
          },
          { quantity: 0, price: 0, total: 0 }
        );

        setGrossQuantity(totals.quantity);
        setGrossPrice(totals.price);
        setGrossTotal(totals.total);
      } catch (err) {
        setError("Failed to load report.");
        console.error("Error fetching report:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Purchase Report</h1>
      <Link to="/allReports" className="text-blue-500 hover:underline">
        View Full Report
      </Link>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {report.length > 0 && (
        <table className="min-w-full mt-4 border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Customer Name</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {report.slice(0, 10).map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">
                  {item.productName}
                </td>
                <td className="border border-gray-300 p-2">
                  {item.customerName}
                </td>
                <td className="border border-gray-300 p-2">{item.quantity}</td>
                <td className="border border-gray-300 p-2">{item.price}</td>
                <td className="border border-gray-300 p-2">{item.total}</td>
              </tr>
            ))}
            {/* Gross Totals Row */}
            <tr>
              <td colSpan="2" className="border border-gray-300 p-2 font-bold">
                Gross Totals
              </td>
              <td className="border border-gray-300 p-2 font-bold">
                {grossQuantity}
              </td>
              <td className="border border-gray-300 p-2 font-bold">
                {grossPrice.toFixed(2)}
              </td>
              <td className="border border-gray-300 p-2 font-bold">
                {grossTotal.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
