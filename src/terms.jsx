import React from "react";

const TermsOfService = () => {
  return (
    <div style={{
      maxWidth: 800,
      margin: "40px auto",
      padding: "24px",
      backgroundColor: "none",
      overflow: "hidden"  // disables scrollbar
    }}>
      <h2>Terms of Service</h2>
      <p><strong>Effective Date:</strong> July 27, 2025</p>

      <h4>1. Acceptance of Terms</h4>
      <p>By using this chatbot, you agree to these Terms of Service and any future updates or modifications.</p>

      <h4>2. User Accounts</h4>
      <p>You may be required to provide personal information or authenticate via Google/GitHub. You agree that all information is accurate.</p>

      <h4>3. Usage Guidelines</h4>
      <ul>
        <li>No harassment or illegal use.</li>
        <li>No unauthorized access attempts.</li>
        <li>No viruses or harmful content.</li>
      </ul>

      <h4>4. Termination</h4>
      <p>We may terminate access at any time without notice for violation of terms.</p>

      <h4>5. Modifications to Service</h4>
      <p>We may update or suspend features at any time without notice.</p>

      <h4>6. Disclaimer</h4>
      <p>This chatbot is provided "as is" without warranties of any kind.</p>

      <h4>7. Limitation of Liability</h4>
      <p>We are not liable for indirect or consequential damages from usage.</p>

      <h4>8. Contact</h4>
      <p>Email: your-email@example.com</p>
    </div>
  );
};

export default TermsOfService;
