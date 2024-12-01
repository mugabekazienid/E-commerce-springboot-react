import React, { useState } from "react";
import { validateResetToken, resetPassword } from "../api/passwordService";

const ResetPassword = () => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [error, setError] = useState("");

  const handleTokenValidation = async () => {
    setValidationMessage("");
    setError("");

    try {
      const response = await validateResetToken(token);
      setValidationMessage(response);
    } catch (err) {
      setError(err);
    }
  };

  const handlePasswordReset = async () => {
    setResetMessage("");
    setError("");

    try {
      const response = await resetPassword(token, password);
      setResetMessage(response);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <div>
        <label>
          Token:
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </label>
        <button onClick={handleTokenValidation}>Validate Token</button>
      </div>
      {validationMessage && (
        <p style={{ color: "green" }}>{validationMessage}</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {validationMessage && (
        <div>
          <label>
            New Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button onClick={handlePasswordReset}>Reset Password</button>
        </div>
      )}
      {resetMessage && <p style={{ color: "green" }}>{resetMessage}</p>}
    </div>
  );
};

export default ResetPassword;
