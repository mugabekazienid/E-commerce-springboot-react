import React, { useState, useEffect } from "react";
import { getRegisterPage, registerUser } from "../api/authService";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchRegisterStatus = async () => {
      try {
        const response = await getRegisterPage();
        setStatus(response);
      } catch (error) {
        console.error("Error fetching register status:", error);
      }
    };

    fetchRegisterStatus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ name, email, password });
      setMessage(response);
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {status && <p>{status}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
