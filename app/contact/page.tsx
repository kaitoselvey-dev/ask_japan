import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <div className="subpage"><section className="subpage-hero"><div className="container"><p className="section-kicker">CONTACT</p><h1>Get in touch.</h1><p>Have a question about Ask Japan or want to discuss a custom request?</p><span className="subpage-decoration" aria-hidden="true">文</span></div></section>
    <section className="section"><div className="container contact-panel"><div className="contact-icon" aria-hidden="true">文</div><h2>Choose the right request form</h2><p>For a simple question or a question about our services, use the free email form. For travel planning, phone research, in-person research, or other tailored support, send a paid-service request.</p><div className="form-actions"><Link className="button button-primary" href="/services/ask">Free question</Link><Link className="button button-outline" href="/services/request">Paid support</Link></div></div></section></div>;
}
