import type { Metadata } from "next";

export const metadata: Metadata = { title: "Legal Notice" };

const rows = [
  [
    "Business name",
    "Ask Japan",
  ],
  [
    "Responsible operator",
    "KAITO SELVEY",
  ],
  [
    "Business address",
    "4-13-10-108, Daiko, Higashi-ku, Nagoya, Aichi 461-0043, Japan",
  ],
  [
    "Telephone number",
    "Available upon request. The telephone number will be provided without undue delay upon request.",
  ],
  [
    "Email address",
    "kaitoselvey@gmail.com",
  ],
  [
    "Service scope",
    "Ask Japan provides information, research, recommendations, and practical support to help customers navigate situations in Japan. Our services do not ordinarily include directly making reservations, bookings, purchases, or applications on behalf of customers. Customers are responsible for completing their own arrangements with the relevant businesses, service providers, or authorities.",
  ],
  [
    "Third-party communication",
    "Ask Japan does not impersonate customers or misrepresent its identity, role, or authority when communicating with third parties. Where third-party contact is part of an agreed support service, we communicate transparently about who we are and the purpose of the contact. Any such communication is subject to the agreed service scope and applicable laws.",
  ],
  [
    "Service prices",
    "All prices are displayed in US dollars (USD). Free service: $0. Phone Research: $10 per facility. Local Recommendations: $10 per day. Transportation Support: $10 per day. Custom Support: quoted individually based on the customer's needs.",
  ],
  [
    "Additional charges",
    "Travel expenses and any agreed rush fees or custom-service charges may apply. Any additional charges will be explained to the customer and agreed upon before the paid service is confirmed.",
  ],
  [
    "Payment methods",
    "Payments are processed securely through Stripe. Available payment methods depend on the customer's location and the payment options supported at checkout.",
  ],
  [
    "Payment timing",
    "Payment timing and any applicable payment deadlines will be communicated before the customer confirms a paid service.",
  ],
  [
    "Service delivery",
    "The service scope and expected delivery time will be communicated to the customer before work begins. Delivery times may vary depending on the nature of the request and the availability of information from third parties.",
  ],
  [
    "Cancellation and refunds",
    "Cancellation and refund conditions are governed by the Terms of Service and will be communicated before payment.",
  ],
  [
    "Service availability",
    "All services are subject to availability and feasibility. Submitting a request does not guarantee acceptance or confirm a booking. Paid work begins only after the service details, price, and applicable conditions have been agreed upon.",
  ],
  [
    "Governing law",
    "These services are governed by the laws of Japan, subject to any mandatory consumer protection laws that may apply.",
  ],
  [
    "Contact",
    "For questions about this notice or Ask Japan's services, please use the Contact page.",
  ],
];

export default function LegalPage() {
  return (
    <article className="policy-page container">
      <p className="section-kicker">POLICIES</p>
      <h1>Legal Notice</h1>

      <p className="policy-lead">
        Information about Ask Japan, its services, pricing, and the
        conditions applicable to paid requests.
      </p>

      <dl className="legal-list">
        {rows.map(([term, description]) => (
          <div className="legal-row" key={term}>
            <dt>{term}</dt>
            <dd>{description}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}