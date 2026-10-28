import type { Metadata } from "next";
import PaidRequestForm from "../../../components/PaidRequestForm";

export const metadata: Metadata = { title: "Request Paid Support", description: "Tell us about your Japan trip and request tailored research or travel support." };

export default function RequestPage() {
  return <div className="subpage">
    <section className="subpage-hero"><div className="container"><p className="section-kicker">TAILORED SUPPORT</p><h1>Tell us what you need.</h1><p>Share your destination, travel details, and preferred services. We will review your request and clarify the scope and final price before confirming paid work.</p><span className="subpage-decoration" aria-hidden="true">旅</span></div></section>
    <section className="section"><div className="container request-wrap"><div className="request-intro"><p className="section-kicker">YOUR REQUEST</p><h2>Support designed around your trip.</h2><p>Choose one or more services below. Combined-service discounts may be available. Rush fees may apply to urgent requests; we will confirm any additional fee before you agree.</p><p className="notice-box">This is a request for a quote, not an immediate purchase. Prices are in USD. Travel expenses for in-person research are additional.</p></div><PaidRequestForm /></div></section>
  </div>;
}
