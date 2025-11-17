// emails/WaitlistWelcome.tsx
import * as React from "react";

export default function WaitlistWelcome({ email }: { email: string }) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#0b0f19",
        color: "#ffffff",
        padding: "40px",
        borderRadius: "12px",
        textAlign: "center",
      }}
    >
      <img
        src="https://aurlink.io/logo.png"
        alt="Aurlink Logo"
        width="120"
        style={{ marginBottom: "24px" }}
      />

      <h1 style={{ color: "#14f1d9", fontSize: "24px", marginBottom: "12px" }}>
        Welcome to Aurlink 🚀
      </h1>

      <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#cccccc" }}>
        Hi {email},
        <br />
        You’ve successfully joined the Aurlink Waitlist.
        <br />
        We’re building <strong>The Cognitive Blockchain</strong> — redefining
        how intelligence powers decentralization.
      </p>

      <p style={{ marginTop: "20px", color: "#aaaaaa" }}>
        Stay tuned for early access and special rewards for our earliest
        supporters.
      </p>

      <div
        style={{
          marginTop: "30px",
          padding: "12px 24px",
          backgroundColor: "#14f1d9",
          color: "#000",
          borderRadius: "8px",
          display: "inline-block",
        }}
      >
        <strong>Thank you for joining Aurlink</strong>
      </div>

      <footer
        style={{
          marginTop: "40px",
          fontSize: "12px",
          color: "#777777",
        }}
      >
        © {new Date().getFullYear()} Aurlink. All rights reserved.
      </footer>
    </div>
  );
}
