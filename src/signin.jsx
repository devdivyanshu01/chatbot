import React, { useState } from "react";
import { auth, googleProvider, githubProvider, signInWithPopup } from "../chatbot-backend/firebaseConfig";

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
  };


const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("Google Sign-in success:", user);
    alert(`Welcome ${user.displayName}`);
    // Optional: redirect or store user info
  } catch (error) {
    console.error("Google Sign-in error:", error);
    alert("Google Sign-in failed. See console for details.");
  }
};

const handleGithubLogin = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;
    console.log("GitHub Sign-in success:", user);
    alert(`Welcome ${user.displayName}`);
    // Optional: redirect or store user info
  } catch (error) {
    console.error("GitHub Sign-in error:", error);
    alert("GitHub Sign-in failed. See console for details.");
  }
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
          style={{
            padding: "12px 16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px",
            outline: "none",
            transition: "border 0.3s, box-shadow 0.3s",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{
            padding: "12px 16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px",
            outline: "none",
            transition: "border 0.3s, box-shadow 0.3s",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
          }}
        />
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
          required
          style={{
            padding: "12px 16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px",
            outline: "none",
            transition: "border 0.3s, box-shadow 0.3s",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
          }}
        />
        <button type="submit" style={{ padding: "8px 0" }}>
          Sign In
        </button>
      </form>

      <div style={{ margin: "24px 0", textAlign: "center" }}>
        <span>or</span>
      </div>

      <button
        onClick={handleGoogleLogin}
        style={{
          width: "100%",
          marginBottom: 8,
          padding: "8px 12px",
          border: "1px solid #dadce0",
          borderRadius: 4,
          backgroundColor: "#fff",
          color: "#3c4043",
          fontWeight: 500,
          fontSize: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          cursor: "pointer",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
        </svg>
        <span>Sign in with Google</span>
      </button>

      <button
        onClick={handleGithubLogin}
        style={{
          width: "100%",
          marginBottom: 8,
          padding: "8px 12px",
          border: "1px solid #dadce0",
          borderRadius: 4,
          backgroundColor: "#fff",
          color: "#3c4043",
          fontWeight: 500,
          fontSize: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          cursor: "pointer",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
        </svg>
        <span>Sign in with GitHub</span>
      </button>

      <div style={{ margin: "24px 0", textAlign: "center" }}>
        <span>or</span>
      </div>

      <p style={{ textAlign: "center", color: "#666" }}>
        Don't have an account?
        <a href="/signup" style={{ textDecoration: 'underline', color: 'white', cursor: 'pointer' }}>
          {" "}SignUP
        </a>
      </p>

      <p style={{ textAlign: "center", color: "#666", fontSize: "0.9rem" }}>
        By signing in, you agree to our{" "}
        <a href="/terms" style={{ color: "#007bff" }}>Terms of Service</a>{" "}
        and{" "}
        <a href="/privacy" style={{ color: "#007bff" }}>Privacy Policy</a>
      </p>
    </div>
  );
};

export default SignIn;
