import Link from "next/link";

const paidServices = [
  { name: "Phone Research", price: "$10", detail: "Research that requires phone calls or direct inquiries." },
  { name: "Itinerary Planning & Support", price: "$20 / day", detail: "A tailored itinerary and practical travel guidance." },
  { name: "In-Person Research", price: "$100 + travel expenses", detail: "On-site research or visits carried out on your behalf." },
  { name: "Real-Time Travel Support", price: "$30 / case or $50 / day", detail: "Help while you are travelling in Japan." },
  { name: "Custom Support", price: "Quote on request", detail: "Tell us what you need and we will discuss a suitable plan." },
];

const topics = [
  { number: "01", title: "Culture & Etiquette", text: "Understand customs, social expectations, and everyday manners." },
  { number: "02", title: "Daily Life", text: "Get help with local rules, shopping, transport, and practical questions." },
  { number: "03", title: "Travel & Local Areas", text: "Explore destinations, local highlights, and ways to make the most of your trip." },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-pattern" aria-hidden="true" />
        <div className="container hero-content">
          <p className="eyebrow"><span /> DISCOVER JAPAN, ONE QUESTION AT A TIME</p>
          <h1>Make Japan feel<br /><span>closer to you.</span></h1>
          <p className="hero-copy">Culture, daily life, and travel. Ask us what you want to know about Japan.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/services/ask">Ask a free question <span aria-hidden="true">↗</span></Link>
            <a className="text-link" href="#pricing">Explore our services <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-stamp" aria-hidden="true"><span>日本</span><small>DISCOVER</small></div>
        </div>
        <div className="hero-bottom-line"></div>
      </section>

      <section className="section intro-section" id="about">
        <div className="container intro-grid">
          <div><p className="section-kicker">ABOUT ASK JAPAN</p><h2>Start with a question.<br />Discover more of Japan.</h2></div>
          <div className="intro-copy">
            <p>Whether you live in Japan or are planning your first visit, we help you explore the things you may not find easy to look up yourself.</p>
            <p>Ask Japan offers friendly, practical answers about Japan, with optional research and travel support when you need more than an email reply.</p>
          </div>
        </div>
      </section>

      <section className="section topics-section">
        <div className="container">
          <div className="section-heading"><div><p className="section-kicker">WHAT YOU CAN EXPLORE</p><h2>What would you like to know?</h2></div><span className="heading-note">Curiosity starts here.</span></div>
          <div className="topic-grid">
            {topics.map((topic) => <article className="topic-card" key={topic.number}><span className="topic-number">{topic.number}</span><div className="topic-symbol" aria-hidden="true">{topic.number === "01" ? "結" : topic.number === "02" ? "日" : "旅"}</div><h3>{topic.title}</h3><p>{topic.text}</p><Link href="/services/ask">Ask a question <span aria-hidden="true">↗</span></Link></article>)}
          </div>
        </div>
      </section>

      <section className="section pricing-section" id="pricing">
        <div className="container">
          <div className="section-heading pricing-heading"><div><h2>Free questions or tailored support</h2></div><p className="pricing-disclaimer">Prices are listed in USD. Travel expenses and any custom scope will be confirmed before work begins.</p></div>
          <div className="pricing-grid">
            <article className="price-card">
              <p className="plan-label">START HERE</p><h3>Free</h3><p className="plan-price">$0</p><p className="plan-detail">For simple questions that can be answered by email.</p><div className="price-rule" />
              <ul><li><span>✓</span>Simple questions about Japan</li><li><span>✓</span>Research that does not involve direct contact or visits</li><li><span>✓</span>Questions about our paid services</li><li><span>✓</span>Email replies only</li></ul>
              <Link className="button button-primary" href="/services/ask">Request a free question <span aria-hidden="true">↗</span></Link>
            </article>
            <article className="price-card price-card-featured">
              <p className="plan-label">GO FURTHER</p><h3>Paid Services</h3><p className="plan-price">From $10</p><p className="plan-detail">For deeper research, planning, and support on the ground.</p><div className="price-rule" />
              <ul>{paidServices.map((service) => (
                <li key={service.name}>
                  <span>✓</span>
                  <span><strong>{service.name} — {service.price}</strong>
                  <small className="price-feature-detail">{service.detail}</small>
                  </span></li>)
                )}</ul>
              <p className="pricing-note">Need more than one service? Discounts may be available for combined requests. Rush fees may apply to urgent requests and will be confirmed before you commit.</p>
              <Link className="button button-primary" href="/services/request">Request paid support <span aria-hidden="true">↗</span></Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
