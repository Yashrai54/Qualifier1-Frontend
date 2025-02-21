import { useState } from "react";
import axios from "axios";
import './App.css';

const API_URL = "https://qualifier1backend.onrender.com/bfhl";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [operationCode, setOperationCode] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const formattedData = input.split(",").map((item) => item.trim());
      const { data } = await axios.post(API_URL, { data: formattedData });
      setResponse(data);
      setError("");
    } catch (err) {
      setError("Invalid input or server error.");
    }
  };

  const fetchOperationCode = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setOperationCode(data.operation_code);
    } catch {
      setOperationCode("Error fetching operation code.");
    }
  };

  return (
    <div className="container">
      <h1>Bajaj Challenge Frontend</h1>

      <input
        type="text"
        className="input-box"
        placeholder="Enter values (e.g., A,B,1,2)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="btn submit-btn" onClick={handleSubmit}>
        Submit
      </button>

      <button className="btn operation-btn" onClick={fetchOperationCode}>
        Get Operation Code
      </button>

      {error && <p className="error">{error}</p>}

      {response && (
        <div className="response-box">
          <h2>Response:</h2>
          <p><strong>User ID:</strong> {response.user_id}</p>
          <p><strong>Email:</strong> {response.email}</p>
          <p><strong>Roll Number:</strong> {response.roll_number}</p>
          <p><strong>Numbers:</strong> {JSON.stringify(response.numbers)}</p>
          <p><strong>Alphabets:</strong> {JSON.stringify(response.alphabets)}</p>
          <p><strong>Highest Alphabet:</strong> {response.highest_alphabet}</p>
        </div>
      )}

      {operationCode !== null && (
        <div className="operation-box">
          <p><strong>Operation Code:</strong> {operationCode}</p>
        </div>
      )}
    </div>
  );
}

export default App;
