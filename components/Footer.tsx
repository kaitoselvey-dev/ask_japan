import Link from "next/link";

const links = [
  { href: "/services/ask", label: "Free Question" },
  { href: "/services/request", label: "Paid Support" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/legal", label: "Legal Notice" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return <footer className="site-footer"><div className="footer-inner">
    <div className="footer-brand-block"><Link className="brand footer-brand" href="/"><span className="brand-mark" aria-hidden="true">和</span><span className="brand-name">Ask Japan</span></Link><p>Discover Japan, one question at a time.</p><p className="footer-description">Practical answers about life, culture, and travel in Japan — with tailored research and travel support when you need it.</p></div>
    <nav className="footer-links" aria-label="Footer navigation">{links.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
    <div className="footer-bottom"><span>© 2026 Ask Japan</span><span>Made with care in Japan</span></div>
  </div></footer>;
}
