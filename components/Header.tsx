"use client";

import Link from "next/link";
import { useState } from "react";

const policyLinks = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/legal", label: "Legal Notice" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  function closeMenu() { setMenuOpen(false); }
  return <header className="site-header"><div className="header-inner">
    <Link className="brand" href="/" aria-label="Ask Japan home" onClick={closeMenu}><span className="brand-mark" aria-hidden="true">和</span><span className="brand-name">Ask Japan</span></Link>
    <nav className="desktop-nav" aria-label="Main navigation"><Link href="/">Home</Link><Link href="/services/ask">Free Question</Link><Link href="/services/request">Paid Support</Link><Link href="/terms">Terms</Link><Link href="/contact" className="nav-contact">Contact</Link></nav>
    <button className={`menu-toggle${menuOpen ? " is-open" : ""}`} type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="site-menu" onClick={() => setMenuOpen((open) => !open)}><span /><span /><span /></button>
  </div>
  {menuOpen && <div className="menu-backdrop" onClick={closeMenu}><nav id="site-menu" className="mobile-menu" aria-label="Site menu" onClick={(event) => event.stopPropagation()}>
    <p className="menu-eyebrow">MENU</p><Link href="/" onClick={closeMenu}>Home</Link><Link href="/services/ask" onClick={closeMenu}>Ask a Free Question</Link><Link href="/services/request" onClick={closeMenu}>Request Paid Support</Link><div className="menu-section-label">Information</div>{policyLinks.map((item) => <Link key={item.href} href={item.href} onClick={closeMenu}>{item.label}</Link>)}
  </nav></div>}</header>;
}
