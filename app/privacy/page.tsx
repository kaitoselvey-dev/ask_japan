import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy" };
export default function PrivacyPage() {
  return <article className="policy-page container"><p className="section-kicker">POLICIES</p><h1>Privacy Policy</h1><p className="policy-lead">This page explains how personal information may be handled when you contact or use Ask Japan.</p><div className="notice-box">Draft policy: confirm the actual data collection, storage, retention, and third-party services, then revise this page before launch.</div>
    <h2>1. Information we may collect</h2><p>Depending on the features used, we may collect your name, request details, destination and travel information, contact information, and correspondence. Only request information necessary to respond to you.</p>
    <h2>2. How information may be used</h2><p>Information may be used to review and respond to requests, provide agreed services, communicate about pricing and timing, improve the service, and prevent misuse.</p>
    <h2>3. Sharing and service providers</h2><p>Any use of hosting providers, analytics, email services, or other third parties should be described accurately here. Information should not be shared except as disclosed, with your consent, or where required by law.</p>
    <h2>4. Security and retention</h2><p>Appropriate safeguards and a retention period should be established based on the actual systems used. Do not submit sensitive personal information unless it is necessary and specifically requested.</p>
    <h2>5. Your choices and contact</h2><p>Before launch, add a contact method for questions or requests concerning personal information and describe any applicable access, correction, or deletion process.</p><p className="policy-date">Effective date: To be added before launch</p>
  </article>;
}
