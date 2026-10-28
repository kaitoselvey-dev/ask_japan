import type { Metadata } from "next";
import FreeQuestionForm from "../../../components/FreeQuestionForm";

export const metadata: Metadata = { title: "Ask a Free Question", description: "Send a simple question about Japan to Ask Japan." };

export default function AskServicePage() {
  return <div className="subpage">
    <section className="subpage-hero"><div className="container"><p className="section-kicker">FREE EMAIL SERVICE</p><h1>Ask us about Japan.</h1><p>For simple questions, general research, or questions about our services. Replies are sent by email only.</p><span className="subpage-decoration" aria-hidden="true">問</span></div></section>
    <section className="section"><div className="container form-layout"><div><p className="section-kicker">HOW IT WORKS</p><h2>A simple question.<br />A helpful reply.</h2><ol className="steps-list"><li><span>01</span><div><strong>Tell us your name and question</strong><p>Keep it simple and include the details we need to understand your question.</p></div></li><li><span>02</span><div><strong>Receive your case number</strong><p>After confirming your submission, you will see a case number for reference.</p></div></li><li><span>03</span><div><strong>We reply by email</strong><p>Our usual response time is within 2 days.</p></div></li></ol><p className="notice-box">Free service is limited to email replies. Requests involving phone calls, direct contact, or in-person visits may require a paid service.</p></div><FreeQuestionForm /></div></section>
  </div>;
}
