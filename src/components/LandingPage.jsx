// src/components/LandingPage.jsx
import React from "react";

export default function LandingPage() {
  const handleLogin = () => {
    // Redirect to Django OIDC login
    window.location.href = "http://127.0.0.1:8000/oidc/authenticate/";
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: "100vh",
        color: "black",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: "700", marginBottom: "20px" }}>
        Welcome to Customer Order App
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "40px" }}>
        Sign in or sign up with Google to get started.
      </p>
      <div className="d-flex gap-3">
        <button
          type="button"
          onClick={handleLogin}
          className="btn btn-primary"
          style={{
            padding: "12px 30px",
            fontSize: "1.1rem",
            fontWeight: "500",
            borderRadius: "8px",
          }}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={handleLogin}
          className="btn btn-success"
          style={{
            padding: "12px 30px",
            fontSize: "1.1rem",
            fontWeight: "500",
            borderRadius: "8px",
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
