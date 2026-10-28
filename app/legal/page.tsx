import type { Metadata } from "next";
export const metadata: Metadata = { title: "Legal Notice" };
const rows = [
  ["Business name", "To be published before paid services launch"],
  ["Responsible operator", "To be published before paid services launch"],
  ["Address", "To be published before paid services launch"],
  ["Telephone number", "To be published before paid services launch"],
  ["Email address", "To be published before paid services launch"],
  ["Prices", "Free service: $0. Phone research: $10. Itinerary planning and support: $20 per day. In-person research: $100 plus travel expenses. Real-time travel support: $30 per case or $50 per day. Early response request: +$10. Custom support quoted individually."],
  ["Additional charges", "Travel expenses and any agreed rush or custom-service fees may apply. Any additional charge should be confirmed before the customer agrees to proceed."],
  ["Payment method and timing", "To be specified before paid services launch"],
  ["Service delivery", "Timing and scope will be agreed with the customer before work begins"],
  ["Cancellation and refunds", "To be specified in accordance with the final service and payment process"],
];
export default function LegalPage() {
  return <article className="policy-page container"><p className="section-kicker">POLICIES</p><h1>Legal Notice</h1><p className="policy-lead">Important information about the operator and paid services.</p><div className="notice-box">This notice is incomplete until the operator details, payment terms, and cancellation policy have been confirmed. Complete all required details before accepting payments.</div><dl className="legal-list">{rows.map(([term, description]) => <div className="legal-row" key={term}><dt>{term}</dt><dd>{description}</dd></div>)}</dl></article>;
}
