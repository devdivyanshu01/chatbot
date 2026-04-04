import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signed in with details:", form);
    alert("Sign In Successful!");
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 700,
        margin: "auto",
        padding: 24,
        borderRadius: 8,
      }}
    >
      <h2>Sign In to Chatbot</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Sign In
        </button>
      </form>

      <div style={{ margin: "24px 0", textAlign: "center" }}>
        <span>or</span>
      </div>

      <p style={{ textAlign: "center", color: "#666" }}>
        Don't have an account?
        <Link
          to="/signup"
          style={{
            textDecoration: "underline",
            color: "blue",
            cursor: "pointer",
            marginLeft: "5px",
          }}
        >
          Sign Up
        </Link>
      </p>

      <p style={{ textAlign: "center", color: "#666", fontSize: "0.9rem" }}>
        By signing in, you agree to our{" "}
        <Link to="/terms" style={{ color: "#007bff" }}>
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link to="/privacy" style={{ color: "#007bff" }}>
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

// 🔹 Reusable Styles
const inputStyle = {
  padding: "12px 16px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
  outline: "none",
};

const buttonStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#28a745",
  color: "#fff",
  fontSize: "15px",
  cursor: "pointer",
};

export default SignIn;