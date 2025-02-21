import { useState } from "react";
import axios from "axios";

const API_URL = "https://your-app.onrender.com/bfhl";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Bajaj Challenge Frontend</h1>

      <input
        type="text"
        className="border p-2 mb-2 rounded w-80"
        placeholder="Enter values (e.g., A,B,1,2)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
        Submit
      </button>

      <button className="mt-3 bg-green-500 text-white px-4 py-2 rounded" onClick={fetchOperationCode}>
        Get Operation Code
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {response && (
        <div className="mt-4 p-4 bg-white shadow rounded w-80">
          <h2 className="text-lg font-semibold">Response:</h2>
          <p><strong>User ID:</strong> {response.user_id}</p>
          <p><strong>Email:</strong> {response.email}</p>
          <p><strong>Roll Number:</strong> {response.roll_number}</p>
          <p><strong>Numbers:</strong> {JSON.stringify(response.numbers)}</p>
          <p><strong>Alphabets:</strong> {JSON.stringify(response.alphabets)}</p>
          <p><strong>Highest Alphabet:</strong> {response.highest_alphabet}</p>
        </div>
      )}

      {operationCode !== null && (
        <div className="mt-4 p-4 bg-white shadow rounded">
          <p><strong>Operation Code:</strong> {operationCode}</p>
        </div>
      )}
    </div>
  );
}

export default App;
