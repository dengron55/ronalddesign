import { useState, useEffect, useRef } from "react";

const TYPING_WORDS = ["KDP Authors", "Small Businesses", "Your Brand"];

function useTypingEffect(words) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;
    if (!deleting && charIdx < word.length) {
      timeout = setTimeout(() => setCharIdx(i => i + 1), 80);
    } else if (!deleting && charIdx === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(i => i - 1), 45);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
    setDisplay(word.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words]);

  return display;
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(218,222,224,0.97)" : "rgba(218,222,224,0.95)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(0,0,0,0.08)",
      transition: "all 0.3s ease",
      padding: "0 2rem",
      boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.10)" : "0 1px 4px rgba(0,0,0,0.06)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <RDLogo height={44} />
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Services", "Portfolio", "About", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ color: "#1e293b", fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#2563eb"}
              onMouseLeave={e => e.target.style.color = "#1e293b"}
            >{item}</a>
          ))}
          <a href="#contact" style={{
            background: "#2563eb", color: "#fff", padding: "8px 20px",
            borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: "none",
            transition: "background 0.2s"
          }}
            onMouseEnter={e => e.target.style.background = "#1d4ed8"}
            onMouseLeave={e => e.target.style.background = "#2563eb"}
          >Free Quote</a>
        </div>
      </div>
    </nav>
  );
}

function RDLogo({ height = 40, style = {} }) {
  return (
    <img
      src="/RDlogo1.png"
      alt="Ronald Design"
      style={{ height, width: "auto", display: "block", ...style }}
    />
  );
}

function Hero() {
  const typed = useTypingEffect(TYPING_WORDS);
  return (
    <section style={{
      minHeight: "100vh", background: "linear-gradient(160deg, #0f172a 60%, #1e3a5f 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "120px 2rem 80px", position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", inset: 0, backgroundImage:
          "radial-gradient(circle at 20% 50%, rgba(37,99,235,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(37,99,235,0.08) 0%, transparent 40%)",
        pointerEvents: "none"
      }} />
      <div style={{ maxWidth: 780, textAlign: "center", position: "relative" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)", borderRadius: 99, padding: "6px 16px", marginBottom: 32 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />
          <span style={{ color: "#93c5fd", fontSize: 13, fontWeight: 500 }}>Available for new projects</span>
        </div>
        <h1 style={{ color: "#f8fafc", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 700, lineHeight: 1.15, margin: "0 0 16px" }}>
          Landing Pages That Sell<br />
          <span style={{ color: "#2563eb" }}>Your Book Online</span>
        </h1>
        <div style={{ fontSize: "clamp(20px, 3vw, 28px)", color: "rgba(248,250,252,0.6)", fontWeight: 400, margin: "0 0 12px", minHeight: 40 }}>
          Built for{" "}
          <span style={{ color: "#60a5fa", fontWeight: 600, borderBottom: "2px solid #2563eb" }}>
            {typed}<span style={{ opacity: Math.floor(Date.now() / 500) % 2 === 0 ? 1 : 0 }}>|</span>
          </span>
        </div>
        <p style={{ color: "rgba(248,250,252,0.5)", fontSize: 16, lineHeight: 1.7, maxWidth: 560, margin: "0 auto 40px" }}>
          React-powered, Vercel-deployed, conversion-focused. I help KDP authors and small businesses
          launch a professional web presence — fast and affordable.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#portfolio" style={{
            background: "#2563eb", color: "#fff", padding: "13px 28px",
            borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none",
            transition: "background 0.2s, transform 0.15s"
          }}
            onMouseEnter={e => { e.target.style.background = "#1d4ed8"; e.target.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.target.style.background = "#2563eb"; e.target.style.transform = "translateY(0)"; }}
          >See Our Work</a>
          <a href="#contact" style={{
            background: "transparent", color: "#f8fafc", padding: "13px 28px",
            borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none",
            border: "1px solid rgba(248,250,252,0.2)", transition: "border-color 0.2s, transform 0.15s"
          }}
            onMouseEnter={e => { e.target.style.borderColor = "rgba(248,250,252,0.5)"; e.target.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(248,250,252,0.2)"; e.target.style.transform = "translateY(0)"; }}
          >Get a Free Quote →</a>
        </div>
        <div style={{ marginTop: 60, display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap" }}>
          {[["React + Vite", "ti-brand-react"], ["Vercel Deploy", "ti-rocket"], ["KDP Specialist", "ti-book"], ["Fast Delivery", "ti-bolt"]].map(([label, icon]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(248,250,252,0.4)", fontSize: 13 }}>
              <i className={`ti ${icon}`} style={{ fontSize: 16, color: "#60a5fa" }} aria-hidden="true" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyLandingPage() {
  const benefits = [
    {
      icon: "ti-target",
      title: "Own Your Sales Page",
      desc: "Amazon's product page is cluttered with ads, competitor suggestions, and distractions. A dedicated landing page keeps readers focused on one thing — buying your book."
    },
    {
      icon: "ti-chart-line",
      title: "Boost Conversion Rates",
      desc: "A well-structured landing page with a compelling hook, benefits, and social proof consistently converts better than sending readers directly to Amazon."
    },
    {
      icon: "ti-mail",
      title: "Build Your Email List",
      desc: "Amazon never shares buyer data with you. A landing page lets you capture emails — turning one-time readers into a loyal audience for your next launch."
    },
    {
      icon: "ti-award",
      title: "Look Like a Pro",
      desc: "A professional web presence builds instant credibility. Readers, media, and event organizers judge authors by their online presence before they open a single page."
    },
    {
      icon: "ti-share",
      title: "Easier to Promote",
      desc: "Share one clean URL across social media, newsletters, and ads. A branded link like yourbook.com is far more compelling than a long Amazon product URL."
    },
    {
      icon: "ti-search",
      title: "Get Found on Google",
      desc: "Amazon listings rarely rank well for author or book searches. Your own landing page can be SEO-optimized to bring in organic traffic that Amazon simply can't capture."
    },
  ];

  return (
    <section style={{ background: "#0f172a", padding: "100px 2rem" }}>
      <div style={{ maxWidth: 1050, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ color: "#60a5fa", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Why it matters</span>
          <h2 style={{ color: "#f8fafc", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, margin: "12px 0 16px" }}>
            Why Every KDP Author Needs<br />a Landing Page
          </h2>
          <p style={{ color: "#94a3b8", fontSize: 16, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            Listing on Amazon is just the beginning. A dedicated landing page is the single most effective tool to grow your readership, boost sales, and build a lasting author brand.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 20, marginBottom: 56 }}>
          {benefits.map(({ icon, title, desc }) => (
            <div key={title} style={{
              background: "rgba(248,250,252,0.04)",
              border: "1px solid rgba(248,250,252,0.08)",
              borderRadius: 14, padding: "24px 22px",
              transition: "border-color 0.2s, transform 0.2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(37,99,235,0.45)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(248,250,252,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ width: 44, height: 44, background: "rgba(37,99,235,0.15)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <i className={`ti ${icon}`} style={{ fontSize: 22, color: "#60a5fa" }} aria-hidden="true" />
              </div>
              <h3 style={{ color: "#f8fafc", fontSize: 16, fontWeight: 600, margin: "0 0 8px" }}>{title}</h3>
              <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>

        <div style={{
          background: "linear-gradient(135deg, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0.06) 100%)",
          border: "1px solid rgba(37,99,235,0.3)",
          borderRadius: 16, padding: "32px 36px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 24
        }}>
          <div>
            <h3 style={{ color: "#f8fafc", fontSize: 20, fontWeight: 700, margin: "0 0 8px" }}>
              Ready to give your book its own home online?
            </h3>
            <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>
              I'll build your landing page in 5–7 days. Starting from $299.
            </p>
          </div>
          <a href="#contact" style={{
            background: "#2563eb", color: "#fff", padding: "12px 28px",
            borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none",
            whiteSpace: "nowrap", transition: "background 0.2s, transform 0.15s"
          }}
            onMouseEnter={e => { e.target.style.background = "#1d4ed8"; e.target.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.target.style.background = "#2563eb"; e.target.style.transform = "translateY(0)"; }}
          >Get Started →</a>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { icon: "ti-book-2", title: "KDP Landing Page", price: "From $299", desc: "A conversion-focused page for your Amazon book. Hero, benefits, reviews, and a clear call-to-action — everything a reader needs to click Buy.", badge: "Most popular" },
    { icon: "ti-building-store", title: "Business Website", price: "From $499", desc: "Clean, professional multi-section website for your small business. Services, about, testimonials, and contact — fully responsive.", badge: null },
    { icon: "ti-refresh", title: "Site Maintenance", price: "From $49/mo", desc: "Keep your site updated, fast, and secure. Monthly content updates, performance checks, and priority support.", badge: null },
  ];
  return (
    <section id="services" style={{ background: "#f8fafc", padding: "100px 2rem" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ color: "#2563eb", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>What I offer</span>
          <h2 style={{ color: "#0f172a", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, margin: "12px 0 16px" }}>Services</h2>
          <p style={{ color: "#64748b", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>Straightforward packages. No surprises. Delivered in days, not months.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {services.map(({ icon, title, price, desc, badge }) => (
            <div key={title} style={{
              background: "#fff", borderRadius: 14, border: badge ? "2px solid #2563eb" : "1px solid #e2e8f0",
              padding: "28px 24px", position: "relative", transition: "transform 0.2s, box-shadow 0.2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(15,23,42,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              {badge && <div style={{ position: "absolute", top: -13, left: 24, background: "#2563eb", color: "#fff", fontSize: 12, fontWeight: 600, padding: "3px 12px", borderRadius: 99 }}>{badge}</div>}
              <div style={{ width: 48, height: 48, background: "#eff6ff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <i className={`ti ${icon}`} style={{ fontSize: 24, color: "#2563eb" }} aria-hidden="true" />
              </div>
              <h3 style={{ color: "#0f172a", fontSize: 18, fontWeight: 600, margin: "0 0 6px" }}>{title}</h3>
              <div style={{ color: "#2563eb", fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{price}</div>
              <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const projects = [
    {
      title: "The Digital Stress Protocol",
      client: "Rodin East — KDP Author",
      tags: ["React", "Vite", "Vercel"],
      url: "https://tdspen.vercel.app",
      desc: "Full landing page for an Amazon KDP non-fiction book. Conversion-optimized layout with hero, benefits, author bio, and buy CTA.",
      live: true
    },
    {
      title: "KDP Author Template",
      client: "Demo project",
      tags: ["React", "Tailwind"],
      url: "#",
      desc: "A reusable landing page template built for self-published authors promoting their books on Amazon.",
      live: false
    },
    {
      title: "Small Business One-Pager",
      client: "Demo project",
      tags: ["React", "Vite", "Vercel"],
      url: "#",
      desc: "Clean business website with services, testimonials, and a contact form — designed for local businesses.",
      live: false
    },
  ];
  return (
    <section id="portfolio" style={{ background: "#0f172a", padding: "100px 2rem" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ color: "#60a5fa", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Recent work</span>
          <h2 style={{ color: "#f8fafc", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, margin: "12px 0 16px" }}>Portfolio</h2>
          <p style={{ color: "#94a3b8", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>Real projects and demo builds — same quality, same code.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {projects.map(({ title, client, tags, url, desc, live }) => (
            <div key={title} style={{
              background: "rgba(248,250,252,0.04)", border: "1px solid rgba(248,250,252,0.08)",
              borderRadius: 14, padding: "24px", transition: "border-color 0.2s, transform 0.2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(37,99,235,0.4)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(248,250,252,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {tags.map(t => <span key={t} style={{ background: "rgba(37,99,235,0.2)", color: "#93c5fd", fontSize: 11, fontWeight: 500, padding: "2px 8px", borderRadius: 99 }}>{t}</span>)}
                </div>
                {live && <span style={{ background: "rgba(34,197,94,0.15)", color: "#4ade80", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99 }}>Live</span>}
              </div>
              <h3 style={{ color: "#f8fafc", fontSize: 17, fontWeight: 600, margin: "0 0 4px" }}>{title}</h3>
              <div style={{ color: "#60a5fa", fontSize: 12, marginBottom: 10 }}>{client}</div>
              <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6, margin: "0 0 16px" }}>{desc}</p>
              {live && (
                <a href={url} target="_blank" rel="noreferrer" style={{ color: "#60a5fa", fontSize: 13, fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                  View live site <i className="ti ti-external-link" style={{ fontSize: 14 }} aria-hidden="true" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const stack = ["React", "Vite", "Vercel", "GitHub", "VS Code", "Tailwind CSS"];
  return (
    <section id="about" style={{ background: "#f8fafc", padding: "100px 2rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 56, alignItems: "center" }}>
        <div>
          <span style={{ color: "#2563eb", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Who I am</span>
          <h2 style={{ color: "#0f172a", fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 700, margin: "12px 0 20px", lineHeight: 1.25 }}>Technology meets marketing</h2>
          <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
            I'm Ronald, a web designer and developer with a background in IT and over a decade of experience in marketing and sales. I combine technical skills with an understanding of what actually converts visitors into buyers.
          </p>
          <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>
            My focus is on KDP authors and small businesses who need a professional online presence without the complexity or cost of a large agency.
          </p>
          <a href="#contact" style={{
            display: "inline-block", background: "#0f172a", color: "#fff", padding: "11px 24px",
            borderRadius: 9, fontSize: 14, fontWeight: 600, textDecoration: "none"
          }}>Let's work together →</a>
        </div>
        <div>
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: 28 }}>
            <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 14, fontWeight: 500 }}>Tech stack</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {stack.map(s => (
                <span key={s} style={{ background: "#eff6ff", color: "#1d4ed8", fontSize: 13, fontWeight: 500, padding: "6px 14px", borderRadius: 8 }}>{s}</span>
              ))}
            </div>
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #f1f5f9" }}>
              {[["Projects delivered", "3+"], ["Avg. delivery time", "5–7 days"], ["Client satisfaction", "100%"]].map(([label, val]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f8fafc" }}>
                  <span style={{ color: "#64748b", fontSize: 14 }}>{label}</span>
                  <span style={{ color: "#0f172a", fontWeight: 700, fontSize: 15 }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" style={{ background: "#0f172a", padding: "100px 2rem" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ color: "#60a5fa", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Get in touch</span>
          <h2 style={{ color: "#f8fafc", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, margin: "12px 0 14px" }}>Ready to launch your page?</h2>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>Tell me about your project — I'll get back to you within 24 hours.</p>
        </div>
        {sent ? (
          <div style={{ textAlign: "center", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 14, padding: "48px 32px" }}>
            <i className="ti ti-circle-check" style={{ fontSize: 48, color: "#4ade80" }} aria-hidden="true" />
            <h3 style={{ color: "#f8fafc", marginTop: 16, fontSize: 20, fontWeight: 600 }}>Message sent!</h3>
            <p style={{ color: "#94a3b8", marginTop: 8 }}>I'll be in touch within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
            {[["name", "Your name", "text"], ["email", "Email address", "email"]].map(([name, ph, type]) => (
              <input key={name} name={name} type={type} placeholder={ph} value={form[name]} onChange={handleChange} required style={{
                background: "rgba(248,250,252,0.06)", border: "1px solid rgba(248,250,252,0.12)",
                borderRadius: 10, padding: "13px 16px", color: "#f8fafc", fontSize: 15,
                outline: "none", width: "100%", boxSizing: "border-box"
              }}
                onFocus={e => e.target.style.borderColor = "#2563eb"}
                onBlur={e => e.target.style.borderColor = "rgba(248,250,252,0.12)"}
              />
            ))}
            <select name="type" value={form.type} onChange={handleChange} required style={{
              background: "rgba(248,250,252,0.06)", border: "1px solid rgba(248,250,252,0.12)",
              borderRadius: 10, padding: "13px 16px", color: form.type ? "#f8fafc" : "#64748b", fontSize: 15,
              outline: "none", width: "100%", boxSizing: "border-box"
            }}>
              <option value="" disabled>Project type</option>
              <option value="kdp">KDP Landing Page</option>
              <option value="business">Business Website</option>
              <option value="maintenance">Site Maintenance</option>
              <option value="other">Other</option>
            </select>
            <textarea name="message" placeholder="Tell me about your book or project..." value={form.message} onChange={handleChange} required rows={5} style={{
              background: "rgba(248,250,252,0.06)", border: "1px solid rgba(248,250,252,0.12)",
              borderRadius: 10, padding: "13px 16px", color: "#f8fafc", fontSize: 15,
              outline: "none", width: "100%", boxSizing: "border-box", resize: "vertical", fontFamily: "inherit"
            }}
              onFocus={e => e.target.style.borderColor = "#2563eb"}
              onBlur={e => e.target.style.borderColor = "rgba(248,250,252,0.12)"}
            />
            <button type="submit" style={{
              background: "#2563eb", color: "#fff", border: "none", borderRadius: 10,
              padding: "14px", fontSize: 16, fontWeight: 600, cursor: "pointer",
              transition: "background 0.2s, transform 0.15s"
            }}
              onMouseEnter={e => { e.target.style.background = "#1d4ed8"; e.target.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.target.style.background = "#2563eb"; e.target.style.transform = "translateY(0)"; }}
            >Send Message →</button>
          </form>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#020617", padding: "28px 2rem", borderTop: "1px solid rgba(248,250,252,0.06)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <RDLogo height={28} style={{ opacity: 0.75, filter: "brightness(1.3)" }} />
          <span style={{ color: "rgba(248,250,252,0.4)", fontSize: 13 }}>© 2026 Ronald Design</span>
        </div>
        <span style={{ color: "rgba(248,250,252,0.25)", fontSize: 12 }}>Built with React · Deployed on Vercel</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <Nav />
      <Hero />
      <WhyLandingPage />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
