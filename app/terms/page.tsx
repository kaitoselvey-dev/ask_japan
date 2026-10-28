import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Service" };
export default function TermsPage() {
  return <article className="policy-page container"><p className="section-kicker">POLICIES</p><h1>Terms of Service</h1><p className="policy-lead">These terms describe the basic conditions for using Ask Japan.</p><div className="notice-box">This is draft website copy. Review and update it to reflect the actual operating entity, service process, and applicable law before launch.</div>
    <h2>1. Scope</h2><p>These terms apply to requests and services provided through Ask Japan. By submitting a request, you agree to use the service lawfully and respectfully.</p>
    <h2>2. Service types</h2><p>Free service is limited to simple questions, research that does not require direct contact or visits, and questions about paid services. Free replies are provided by email only. Paid services may include phone research, itinerary planning, in-person research, real-time travel support, and custom assistance.</p>
    <h2>3. Pricing and confirmation</h2><p>Prices shown on the website are in US dollars. Additional travel expenses, custom work, discounts, or rush fees will be discussed with the customer before paid work is confirmed. Submitting a request is not itself a purchase or guarantee that the requested service can be provided.</p>
    <h2>4. Accuracy and limitations</h2><p>We aim to provide helpful and accurate information, but local conditions, opening hours, rules, and availability may change. Users should verify critical information with the relevant official provider where appropriate.</p>
    <h2>5. Prohibited use</h2><p>Do not use the service for unlawful activity, infringement of others’ rights, harassment, or interference with the operation of the website.</p>
    <h2>6. Changes and contact</h2><p>We may update these terms as the service develops. Material changes and the method of notification should be specified before launch.</p><p className="policy-date">Effective date: To be added before launch</p>
  </article>;
}
