import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Send, Flower2, Camera, Music2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "" : "http://localhost:5000");

const memories = [
  { icon: "🌷", title: "The little things", text: "Every small moment with you becomes a favourite memory." },
  { icon: "🌅", title: "Our moments", text: "The laughs, the talks, and all the memories still to come." },
  { icon: "💌", title: "A promise", text: "More kindness, more adventures, and choosing each other every day." },
];

function FloatingHearts() {
  return <div className="floating-hearts" aria-hidden="true">
    {Array.from({ length: 15 }, (_, i) => <span key={i} style={{
      left: `${(i * 37) % 100}%`,
      animationDelay: `${(i % 7) * -2.1}s`,
      animationDuration: `${12 + (i % 5) * 2}s`,
      fontSize: `${12 + (i % 4) * 7}px`
    }}>♥</span>)}
  </div>;
}

export default function App() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  async function saveResponse(choice) {
    setStatus("saving");
    setError("");
    setAnswer(choice);
    try {
      const res = await fetch(`${API_URL}/api/responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response: choice, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save your response.");
      setStatus("saved");
    } catch (err) {
      setStatus("error");
      setError(`${err.message} Please check that the backend and MongoDB are running.`);
    }
  }

  return (
    <main>
      <FloatingHearts />
      <nav className="nav">
        <a href="#home" className="brand"><Heart size={19} fill="currentColor" /> just for you</a>
        <a href="#question" className="nav-link">The question ↓</a>
      </nav>

      <section className="hero section" id="home">
        <motion.div className="hero-content" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
          <div className="eyebrow"><Sparkles size={15} /> A little something from my heart</div>
          <div className="big-heart"><Heart size={54} fill="currentColor" strokeWidth={1.2} /></div>
          <p className="script">Dear Vrinda,</p>
          <h1>You make my<br /><span>world brighter.</span></h1>
          <p className="hero-copy">Some feelings are too special for an ordinary message. So I made you a little corner of the internet.</p>
          <a className="primary-link" href="#letter">Open my heart <Heart size={16} fill="currentColor" /></a>
          <div className="scroll-note">SCROLL A LITTLE <span>↓</span></div>
        </motion.div>
        <motion.div className="hero-art" initial={{ opacity: 0, scale: .88, rotate: 5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, delay: .2 }}>
          <div className="photo-frame">
            <div className="photo-placeholder"><span>♡</span><small>Your favourite photo together</small></div>
            <div className="tape" />
            <p>you + me, always</p>
          </div>
          <span className="sparkle s1">✦</span><span className="sparkle s2">✧</span><span className="sparkle s3">♥</span>
        </motion.div>
      </section>

      <section className="letter-section section" id="letter">
        <motion.div className="letter-card" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Flower2 className="letter-flower" size={30} />
          <p className="script">A note for you</p>
          <h2>My sweetest Vrinda,</h2>
          <p className="letter-text">I don't need a special day to tell you how much you mean to me. Your smile can turn an ordinary day into something beautiful. I love the little moments, the silly laughs, and the comfort of knowing you're in my life.</p>
          <p className="letter-text">I can't promise every day will be perfect, but I can promise to keep showing up with honesty, patience, laughter, and love. I want to make more memories with you, one day at a time.</p>
          <p className="script signature">With all my love, always ♡</p>
        </motion.div>
      </section>

      <section className="memories section">
        <div className="section-heading"><span className="eyebrow"><Camera size={15} /> LITTLE THINGS, BIG FEELINGS</span><h2>Reasons to <span>smile</span></h2><p>A few things I hope we keep collecting.</p></div>
        <div className="memory-grid">
          {memories.map((item, i) => <motion.article className="memory-card" key={item.title} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .12 }}>
            <div className="memory-icon">{item.icon}</div><h3>{item.title}</h3><p>{item.text}</p>
          </motion.article>)}
        </div>
        <p className="photo-tip">♡ Tip: Replace the photo placeholder above with a favourite picture of you two.</p>
      </section>

      <section className="proposal section" id="question">
        <motion.div className="proposal-inner" initial={{ opacity: 0, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <div className="proposal-heart"><Heart fill="currentColor" size={38} /></div>
          <p className="script">One little question...</p>
          <h2>Vrinda, will you<br /><span>be mine forever?</span></h2>
          <p className="proposal-copy">No pressure, just a question asked with a whole lot of love. Whatever your answer, thank you for being you.</p>
          <label className="message-label" htmlFor="message">Leave me a little note (optional)</label>
          <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} maxLength={500} placeholder="Write something from your heart..." />
          <div className="button-row">
            <button className="yes-button" onClick={() => saveResponse("yes")} disabled={status === "saving"}>Yes, forever! <Heart size={17} fill="currentColor" /></button>
            <button className="no-button" onClick={() => saveResponse("no")} disabled={status === "saving"}>Not right now</button>
          </div>
          {status === "saving" && <p className="feedback">Saving your answer… 💗</p>}
          {status === "saved" && <motion.div className="success-message" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {answer === "yes" ? "You just made this moment unforgettable. ❤️" : "Thank you for being honest. Your answer has been saved with care. 💗"}
          </motion.div>}
          {status === "error" && <p className="error-message">{error}</p>}
        </motion.div>
      </section>

      <footer><Heart size={14} fill="currentColor" /> Made with love, just for Vrinda <span>♡</span></footer>
    </main>
  );
}
