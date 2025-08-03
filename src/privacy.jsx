import React from "react";

const PrivacyPolicy = () => {
  return (
    <div style={{
      maxWidth: 800,
      margin: "40px auto",
      padding: "24px",
      backgroundColor: "none",
      overflow: "hidden"  // disables scrollbar
    }}>
      <h2>Privacy Policy</h2>
      <p><strong>Effective Date:</strong> July 27, 2025</p>

      <h4>1. Information We Collect</h4>
      <ul>
        <li>Personal info: name, email, phone number.</li>
        <li>OAuth profile data from Google/GitHub.</li>
        <li>Chat logs and usage data for improvement.</li>
      </ul>

      <h4>2. How We Use Your Data</h4>
      <ul>
        <li>Authentication and personalization.</li>
        <li>Improve chatbot functionality.</li>
        <li>Communicate with users.</li>
      </ul>

      <h4>3. Data Sharing</h4>
      <p>No selling or sharing unless required by law or for authentication.</p>

      <h4>4. Cookies & Tracking</h4>
      <p>Cookies may be used for analytics and session tracking.</p>

      <h4>5. Data Security</h4>
      <p>We use reasonable security measures, but no system is completely secure.</p>

      <h4>6. Data Retention</h4>
      <p>Data is kept as long as necessary or as required by law.</p>

      <h4>7. Your Rights</h4>
      <p>You can request, correct, or delete your data.</p>

      <h4>8. Children’s Privacy</h4>
      <p>Not intended for users under 13. We do not knowingly collect children's data.</p>

      <h4>9. Updates</h4>
      <p>Policy may change. Continued use means acceptance of changes.</p>

      <h4>10. Contact</h4>
      <p>Email: divyanshudhiman51@example.com</p>
    </div>
  );
};

export default PrivacyPolicy;
