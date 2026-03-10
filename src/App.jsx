import { useState, useEffect, useRef } from "react";

const SCREENS = { HOME: "home", CUSTOMISE: "customise", NOTES: "notes", EXAM: "exam", LEADERBOARD: "leaderboard" };

const PROFESSOR_PRESETS = [
  { id: "einstein", name: "Einstein", emoji: "👴", hair: "wild", coat: "grey", accent: "#60efff" },
  { id: "wizard", name: "Wizard", emoji: "🧙", hair: "long", coat: "purple", accent: "#c084fc" },
  { id: "robot", name: "A.I. Rex", emoji: "🤖", hair: "none", coat: "silver", accent: "#34d399" },
  { id: "viking", name: "Prof. Nord", emoji: "🧔", hair: "braided", coat: "leather", accent: "#fb923c" },
];

const ROBE_COLORS = ["#1e3a5f", "#3b1f5e", "#1f4e3b", "#5e1f1f", "#2d2d2d"];
const ACCENT_COLORS = ["#60efff", "#c084fc", "#34d399", "#fb923c", "#f472b6"];
const GLASSES = ["None", "Wear"];
const HATS = ["None", "Mortarboard 🎓", "Top Hat 🎩"];

const LEADERBOARD_DATA = [
  { rank: 1, name: "Priya S.", xp: 9840, streak: 32, badge: "🥇", you: false },
  { rank: 2, name: "Marcus T.", xp: 9120, streak: 28, badge: "🥈", you: false },
  { rank: 3, name: "YIDI A.", xp: 8750, streak: 21, badge: "🥉", you: true },
  { rank: 4, name: "Aisha K.", xp: 7890, streak: 18, badge: "⭐", you: false },
  { rank: 5, name: "Liam O.", xp: 7450, streak: 15, badge: "⭐", you: false },
  { rank: 6, name: "Fatima R.", xp: 6900, streak: 12, badge: "⭐", you: false },
  { rank: 7, name: "Chen W.", xp: 6230, streak: 10, badge: "⭐", you: false },
  { rank: 8, name: "Sofia M.", xp: 5780, streak: 7, badge: "⭐", you: false },
];

const SAMPLE_QUESTIONS = [
  { q: "What is the time complexity of QuickSort in the average case?", a: "O(n log n)", options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"] },
  { q: "Which data structure uses LIFO ordering?", a: "Stack", options: ["Queue", "Heap", "Stack", "Tree"] },
  { q: "What does HTTP stand for?", a: "HyperText Transfer Protocol", options: ["HyperText Transfer Protocol", "High Transfer Text Protocol", "Hyper Transfer Text Process", "HyperText Text Protocol"] },
  { q: "What is a binary search tree property?", a: "Left child < parent < right child", options: ["All nodes equal", "Left child < parent < right child", "Right child < parent", "Nodes are random"] },
];

function HologramProfessor({ config, size = 160, speaking = false }) {
  const accent = config.accentColor || "#60efff";
  const robeColor = config.robeColor || "#1e3a5f";
  const hat = config.hat || "None";
  const glasses = config.glasses || "None";
  const presetEmoji = config.preset ? PROFESSOR_PRESETS.find(p => p.id === config.preset)?.emoji : "👴";

  return (
    <div style={{ position: "relative", width: size, height: size + 40, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: size * 0.8, height: 12, borderRadius: "50%",
        background: `radial-gradient(ellipse, ${accent}88 0%, transparent 70%)`,
        filter: "blur(4px)",
        animation: speaking ? "pulseBase 0.4s ease-in-out infinite alternate" : "pulseBase 2s ease-in-out infinite alternate"
      }} />

      <div style={{
        position: "relative",
        width: size * 0.65, height: size * 0.9,
        display: "flex", flexDirection: "column", alignItems: "center",
        filter: `drop-shadow(0 0 ${size * 0.08}px ${accent}) drop-shadow(0 0 ${size * 0.04}px ${accent})`,
        animation: "holoBob 3s ease-in-out infinite",
        opacity: 0.92,
      }}>
        <div style={{
          position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none",
          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${accent}08 2px, ${accent}08 4px)`,
          borderRadius: 12,
        }} />

        {hat !== "None" && (
          <div style={{ fontSize: size * 0.22, lineHeight: 1, marginBottom: -4, zIndex: 2 }}>
            {hat.includes("Mortarboard") ? "🎓" : hat.includes("Wizard") ? "🧙" : "🎩"}
          </div>
        )}

        <div style={{
          width: size * 0.38, height: size * 0.38,
          borderRadius: "50%",
          background: `radial-gradient(circle at 35% 35%, ${accent}30, ${accent}10)`,
          border: `2px solid ${accent}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: size * 0.26, position: "relative",
          boxShadow: `inset 0 0 20px ${accent}22`,
        }}>
          {presetEmoji}
          {glasses !== "None" && (
            <div style={{
              position: "absolute",
              top: "48%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: size * 0.17,
              opacity: 0.95,
              lineHeight: 1,
              zIndex: 2,
              pointerEvents: "none",
            }}>
              👓
            </div>
          )}
        </div>

        <div style={{
          width: size * 0.5, height: size * 0.42,
          marginTop: 4,
          background: `linear-gradient(180deg, ${robeColor}cc, ${robeColor}44)`,
          border: `1.5px solid ${accent}88`,
          borderRadius: "8px 8px 20px 20px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: size * 0.15, height: size * 0.12,
            background: `${accent}33`,
            borderRadius: "0 0 50% 50%",
            borderBottom: `1.5px solid ${accent}88`,
          }} />
          <div style={{ position: "absolute", top: size * 0.08, left: "22%", width: 1.5, height: "55%", background: `${accent}66`, transform: "rotate(-8deg)" }} />
          <div style={{ position: "absolute", top: size * 0.08, right: "22%", width: 1.5, height: "55%", background: `${accent}66`, transform: "rotate(8deg)" }} />

          {speaking && (
            <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 3 }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{
                  width: 3, borderRadius: 2,
                  background: accent,
                  animation: `soundBar ${0.4 + i * 0.15}s ease-in-out infinite alternate`,
                  height: 6 + i * 4,
                }} />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes holoBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes pulseBase { 0%{opacity:0.4;transform:translateX(-50%) scaleX(0.9)} 100%{opacity:0.9;transform:translateX(-50%) scaleX(1.1)} }
        @keyframes soundBar { 0%{transform:scaleY(0.4)} 100%{transform:scaleY(1.6)} }
      `}</style>
    </div>
  );
}

function HomeScreen({ profConfig, setScreen }) {
  const [speaking, setSpeaking] = useState(false);
  const [message, setMessage] = useState("Hello! I'm your Pocket Professor. How can I help you study today?");
  const messages = [
    "Hello! I'm your Pocket Professor. How can I help you study today?",
    "Upload your notes and I'll quiz you on anything!",
    "You're ranked #3 globally — keep it up!",
    "Try the exam mode to test your knowledge!",
  ];
  const msgIdx = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeaking(true);
      msgIdx.current = (msgIdx.current + 1) % messages.length;
      setMessage(messages[msgIdx.current]);
      setTimeout(() => setSpeaking(false), 2500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const navButtons = [
    { label: "Customise", icon: "✨", screen: SCREENS.CUSTOMISE, desc: "Style your professor" },
    { label: "My Notes", icon: "📚", screen: SCREENS.NOTES, desc: "Upload coursework" },
    { label: "Exam Mode", icon: "🎯", screen: SCREENS.EXAM, desc: "Practice questions" },
    { label: "Leaderboard", icon: "🏆", screen: SCREENS.LEADERBOARD, desc: "Global rankings" },
  ];

  const accent = profConfig.accentColor || "#60efff";

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "0 20px 20px" }}>
      <div style={{ width: "100%", marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 11, color: "#94a3b8", fontFamily: "'DM Mono', monospace" }}>LEVEL 7 · 8,750 XP</span>
          <span style={{ fontSize: 11, color: accent, fontFamily: "'DM Mono', monospace" }}>9,000 XP ▶</span>
        </div>
        <div style={{ height: 4, background: "#1e293b", borderRadius: 999, overflow: "hidden" }}>
          <div style={{ height: "100%", width: "87%", background: `linear-gradient(90deg, ${accent}88, ${accent})`, borderRadius: 999, boxShadow: `0 0 8px ${accent}` }} />
        </div>
      </div>

      <div style={{
        width: "100%", height: 280,
        background: "linear-gradient(180deg, #0a1628 0%, #0d1f3c 60%, #0a1628 100%)",
        borderRadius: 24,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        border: `1px solid ${accent}22`,
        marginBottom: 16,
      }}>
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
          background: `
            linear-gradient(${accent}18 1px, transparent 1px),
            linear-gradient(90deg, ${accent}18 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
          maskImage: "linear-gradient(180deg, transparent 0%, black 100%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 100%)",
        }} />

        <div style={{
          position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)",
          width: 200, height: 40, borderRadius: "50%",
          border: `1px solid ${accent}30`,
          animation: "ringPulse 3s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)",
          width: 150, height: 30, borderRadius: "50%",
          border: `1px solid ${accent}50`,
          animation: "ringPulse 3s ease-in-out infinite 0.5s",
        }} />

        <HologramProfessor config={profConfig} size={155} speaking={speaking} />

        <div style={{
          position: "absolute", top: 16, left: 16, right: 16,
          background: `${accent}12`,
          border: `1px solid ${accent}33`,
          borderRadius: 12, padding: "10px 14px",
          backdropFilter: "blur(8px)",
        }}>
          <p style={{ margin: 0, fontSize: 11.5, color: "#c8e6ff", lineHeight: 1.5, fontFamily: "'Nunito', sans-serif" }}>
            <span style={{ color: accent, fontWeight: 700 }}>Prof. </span>{message}
          </p>
        </div>

        <style>{`@keyframes ringPulse { 0%,100%{opacity:0.4;transform:translateX(-50%) scaleX(0.95)} 50%{opacity:1;transform:translateX(-50%) scaleX(1.05)} }`}</style>
      </div>

      <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {navButtons.map(btn => (
          <button key={btn.screen} onClick={() => setScreen(btn.screen)} style={{
            background: "linear-gradient(180deg, #0d1a2f, #091120)",
            border: `1px solid ${accent}22`,
            borderRadius: 18,
            padding: 16,
            textAlign: "left",
            cursor: "pointer",
            boxShadow: `0 0 0 1px ${accent}08 inset`,
          }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{btn.icon}</div>
            <div style={{ color: "#e2f0ff", fontWeight: 800, fontSize: 13 }}>{btn.label}</div>
            <div style={{ color: "#7c93b7", fontSize: 10.5, marginTop: 2 }}>{btn.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function CustomiseScreen({ profConfig, setProfConfig, setScreen }) {
  const accent = profConfig.accentColor || "#60efff";
  const update = patch => setProfConfig(prev => ({ ...prev, ...patch }));

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 18 }}>
      <div style={{ color: accent, fontSize: 11, fontFamily: "'DM Mono', monospace", marginBottom: 8 }}>{title}</div>
      {children}
    </div>
  );

  return (
    <div style={{ padding: "0 18px 18px", color: "#e2f0ff" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
        <HologramProfessor config={profConfig} size={135} />
      </div>

      <Section title="Preset Professor">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {PROFESSOR_PRESETS.map(p => {
            const active = profConfig.preset === p.id;
            return (
              <button key={p.id} onClick={() => update({ preset: p.id, accentColor: p.accent })} style={{
                background: active ? `${accent}18` : "#0d1628",
                border: `1px solid ${active ? accent : "#1f2f4a"}`,
                borderRadius: 14,
                padding: 12,
                color: "#e2f0ff",
                cursor: "pointer",
              }}>
                <div style={{ fontSize: 24 }}>{p.emoji}</div>
                <div style={{ fontSize: 12, fontWeight: 700, marginTop: 6 }}>{p.name}</div>
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Robe Colour">
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {ROBE_COLORS.map(c => (
            <button key={c} onClick={() => update({ robeColor: c })} style={{
              width: 34, height: 34, borderRadius: "50%", background: c,
              border: `2px solid ${profConfig.robeColor === c ? accent : "#fff2"}`,
              cursor: "pointer",
            }} />
          ))}
        </div>
      </Section>

      <Section title="Accent Colour">
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {ACCENT_COLORS.map(c => (
            <button key={c} onClick={() => update({ accentColor: c })} style={{
              width: 34, height: 34, borderRadius: "50%", background: c,
              border: `2px solid ${profConfig.accentColor === c ? "#fff" : "#fff2"}`,
              boxShadow: `0 0 10px ${c}`,
              cursor: "pointer",
            }} />
          ))}
        </div>
      </Section>

      <Section title="Glasses">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {GLASSES.map(g => (
            <button key={g} onClick={() => update({ glasses: g })} style={{
              background: profConfig.glasses === g ? `${accent}18` : "#0d1628",
              border: `1px solid ${profConfig.glasses === g ? accent : "#1f2f4a"}`,
              color: "#e2f0ff",
              borderRadius: 999,
              padding: "8px 12px",
              cursor: "pointer",
            }}>{g}</button>
          ))}
        </div>
      </Section>

      <Section title="Hat">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {HATS.map(h => (
            <button key={h} onClick={() => update({ hat: h })} style={{
              background: profConfig.hat === h ? `${accent}18` : "#0d1628",
              border: `1px solid ${profConfig.hat === h ? accent : "#1f2f4a"}`,
              color: "#e2f0ff",
              borderRadius: 999,
              padding: "8px 12px",
              cursor: "pointer",
            }}>{h}</button>
          ))}
        </div>
      </Section>

      <button onClick={() => setScreen(SCREENS.HOME)} style={{
        width: "100%", marginTop: 6,
        background: `linear-gradient(90deg, ${accent}, ${accent}aa)`,
        border: "none", borderRadius: 14,
        padding: 12, color: "#03101d", fontWeight: 900, cursor: "pointer",
      }}>Save & Return</button>
    </div>
  );
}

function NotesScreen({ profConfig }) {
  const accent = profConfig.accentColor || "#60efff";
  const savedNotes = [
    { title: "Notes for Algorithms", subtitle: "Graphs, trees, sorting and recursion" },
    { title: "Notes for Networks", subtitle: "OSI model, HTTP, DNS and TCP/IP" },
    { title: "Notes for Databases", subtitle: "SQL basics, joins and indexing" },
  ];

  return (
    <div style={{ padding: "0 18px 18px" }}>
      <div style={{
        border: `1px dashed ${accent}55`, borderRadius: 18,
        background: `${accent}0e`, padding: 18, color: "#c8e6ff",
        marginBottom: 14,
      }}>
        <div style={{ fontSize: 28, marginBottom: 6 }}>📤</div>
        <div style={{ fontWeight: 800, marginBottom: 4 }}>Upload Notes</div>
        <div style={{ fontSize: 12, color: "#8fb6d9" }}>Drag slides, PDFs, or lecture notes here</div>
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {savedNotes.map(note => (
          <div key={note.title} style={{
            background: "#0d1628",
            border: `1px solid ${accent}22`,
            borderRadius: 16,
            padding: 14,
          }}>
            <div style={{ color: "#e2f0ff", fontWeight: 800 }}>{note.title}</div>
            <div style={{ color: "#7c93b7", fontSize: 12, marginTop: 2 }}>{note.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExamScreen({ profConfig }) {
  const quizSets = [
    { title: "Algorithms Week 3", subtitle: "Sorting, trees, graphs" },
    { title: "Networks Revision", subtitle: "HTTP, DNS, TCP/IP" },
    { title: "Database Notes", subtitle: "SQL joins and indexing" },
  ];
  const accent = profConfig.accentColor || "#60efff";
  const [quizStarted, setQuizStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const current = SAMPLE_QUESTIONS[index];
  const done = index >= SAMPLE_QUESTIONS.length;

  const submit = option => {
    if (selected) return;
    setSelected(option);
    if (option === current.a) setScore(s => s + 1);
  };

  const next = () => {
    setSelected(null);
    setIndex(i => i + 1);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setIndex(0);
    setSelected(null);
    setScore(0);
  };

  if (!quizStarted) {
    return (
      <div style={{ padding: 18, color: "#e2f0ff" }}>
        <div style={{ display: "grid", gap: 10 }}>
          {quizSets.map(set => (
            <button key={set.title} onClick={startQuiz} style={{
              background: "#0d1628",
              border: `1px solid ${accent}22`,
              borderRadius: 16,
              padding: 14,
              textAlign: "left",
              cursor: "pointer",
            }}>
              <div style={{ color: "#e2f0ff", fontWeight: 800 }}>{set.title}</div>
              <div style={{ color: "#7c93b7", fontSize: 12, marginTop: 2 }}>{set.subtitle}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div style={{ padding: 18, textAlign: "center", color: "#e2f0ff" }}>
        <div style={{ fontSize: 44, marginBottom: 8 }}>🎉</div>
        <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 6 }}>Exam Complete</div>
        <div style={{ color: "#8fb6d9", marginBottom: 12 }}>You scored {score} / {SAMPLE_QUESTIONS.length}</div>
        <div style={{ height: 8, background: "#1e293b", borderRadius: 999, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ width: `${(score / SAMPLE_QUESTIONS.length) * 100}%`, height: "100%", background: accent }} />
        </div>
        <button onClick={() => setQuizStarted(false)} style={{
          width: "100%", background: accent, color: "#03101d",
          border: "none", borderRadius: 14, padding: 12, fontWeight: 900, cursor: "pointer"
        }}>Back to Quiz List</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 18, color: "#e2f0ff" }}>
      <div style={{ color: accent, fontFamily: "'DM Mono', monospace", fontSize: 11, marginBottom: 8 }}>QUESTION {index + 1} / {SAMPLE_QUESTIONS.length}</div>
      <div style={{ background: "#0d1628", border: `1px solid ${accent}22`, borderRadius: 18, padding: 16, marginBottom: 12 }}>
        <div style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.4 }}>{current.q}</div>
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {current.options.map(opt => {
          const isCorrect = selected && opt === current.a;
          const isWrong = selected === opt && opt !== current.a;
          return (
            <button key={opt} onClick={() => submit(opt)} style={{
              background: isCorrect ? "#123524" : isWrong ? "#3a1420" : "#0d1628",
              border: `1px solid ${isCorrect ? "#34d399" : isWrong ? "#f472b6" : `${accent}22`}`,
              color: "#e2f0ff", borderRadius: 14, padding: 14, cursor: "pointer", textAlign: "left"
            }}>{opt}</button>
          );
        })}
      </div>
      {selected && (
        <button onClick={next} style={{
          width: "100%", marginTop: 14, background: accent, color: "#03101d",
          border: "none", borderRadius: 14, padding: 12, fontWeight: 900, cursor: "pointer"
        }}>Next</button>
      )}
    </div>
  );
}

function LeaderboardScreen({ profConfig }) {
  const accent = profConfig.accentColor || "#60efff";
  return (
    <div style={{ padding: 18 }}>
      <div style={{ display: "grid", gap: 8 }}>
        {LEADERBOARD_DATA.map(row => (
          <div key={row.rank} style={{
            background: row.you ? `${accent}12` : "#0d1628",
            border: `1px solid ${row.you ? accent : `${accent}18`}`,
            borderRadius: 16,
            padding: 12,
            display: "grid",
            gridTemplateColumns: "36px 1fr auto auto",
            alignItems: "center",
            gap: 10,
            color: "#e2f0ff"
          }}>
            <div style={{ fontWeight: 900, color: row.you ? accent : "#94a3b8" }}>#{row.rank}</div>
            <div>
              <div style={{ fontWeight: 800 }}>{row.name}</div>
              <div style={{ fontSize: 11, color: "#7c93b7" }}>{row.xp} XP</div>
            </div>
            <div style={{ fontSize: 12, color: "#c8e6ff" }}>🔥 {row.streak}</div>
            <div style={{ fontSize: 18 }}>{row.badge}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const NAV_ITEMS = [
  { label: "Home", icon: "🏠", screen: SCREENS.HOME },
  { label: "Notes", icon: "📚", screen: SCREENS.NOTES },
  { label: "Exam", icon: "🎯", screen: SCREENS.EXAM },
  { label: "Ranks", icon: "🏆", screen: SCREENS.LEADERBOARD },
];

export default function App() {
  const [screen, setScreen] = useState(SCREENS.HOME);
  const [profConfig, setProfConfig] = useState({
    preset: "einstein",
    robeColor: "#1e3a5f",
    accentColor: "#60efff",
    glasses: "Wear",
    hat: "None",
  });

  const screenTitles = {
    [SCREENS.CUSTOMISE]: "Customise Professor",
    [SCREENS.NOTES]: "My Notes",
    [SCREENS.EXAM]: "Exam Mode",
    [SCREENS.LEADERBOARD]: "Leaderboard",
  };

  const accent = profConfig.accentColor || "#60efff";

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at top, #10203a 0%, #07101d 45%, #030814 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
    }}>
      <div style={{ width: 390, maxWidth: "100%", height: 844, background: "#08111f", borderRadius: 36, padding: 10, boxShadow: "0 30px 80px rgba(0,0,0,0.55)", border: "1px solid #1f2f4a" }}>
        <div style={{ width: "100%", height: "100%", background: "linear-gradient(180deg, #091220 0%, #060c18 100%)", borderRadius: 28, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ height: 72, padding: "16px 18px 0", display: "flex", alignItems: "start", gap: 12, flexShrink: 0 }}>
            <div style={{ width: 10, height: 10, borderRadius: 999, background: accent, boxShadow: `0 0 12px ${accent}` }} />
            <div style={{ flex: 1 }}>
              {screen === SCREENS.HOME ? (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color: accent, fontSize: 15, fontWeight: 900, letterSpacing: "-0.02em" }}>Pocket</span>
                    <span style={{ color: "#e2f0ff", fontSize: 15, fontWeight: 900, letterSpacing: "-0.02em" }}>Professor</span>
                    <span style={{ background: `${accent}22`, color: accent, fontSize: 9, padding: "2px 6px", borderRadius: 999, fontFamily: "'DM Mono', monospace" }}>BETA</span>
                  </div>
                  <div style={{ color: "#334155", fontSize: 10, fontFamily: "'DM Mono', monospace" }}>Your AI study companion</div>
                </div>
              ) : (
                <span style={{ color: "#e2f0ff", fontSize: 16, fontWeight: 800 }}>{screenTitles[screen]}</span>
              )}
            </div>
            <button onClick={() => setScreen(SCREENS.CUSTOMISE)} style={{
              background: `${accent}15`, border: `1px solid ${accent}33`,
              borderRadius: 10, padding: "6px 10px", cursor: "pointer",
              color: accent, fontSize: 11, fontFamily: "'DM Mono', monospace",
            }}>✨ Edit</button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", paddingTop: 16 }}>
            {screen === SCREENS.HOME && <HomeScreen profConfig={profConfig} setScreen={setScreen} />}
            {screen === SCREENS.CUSTOMISE && <CustomiseScreen profConfig={profConfig} setProfConfig={setProfConfig} setScreen={setScreen} />}
            {screen === SCREENS.NOTES && <NotesScreen profConfig={profConfig} />}
            {screen === SCREENS.EXAM && <ExamScreen profConfig={profConfig} />}
            {screen === SCREENS.LEADERBOARD && <LeaderboardScreen profConfig={profConfig} />}
          </div>

          <div style={{
            height: 72, background: "#060c18", flexShrink: 0,
            borderTop: "1px solid #0f1f38",
            display: "flex", alignItems: "center",
            padding: "0 8px 8px",
          }}>
            {NAV_ITEMS.map(item => {
              const active = screen === item.screen || (screen === SCREENS.CUSTOMISE && item.screen === SCREENS.HOME);
              return (
                <button key={item.screen} onClick={() => setScreen(item.screen)} style={{
                  flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                  background: "none", border: "none", cursor: "pointer", padding: "8px 0",
                  borderRadius: 12, transition: "background 0.2s",
                }}>
                  <span style={{ fontSize: 18, filter: active ? `drop-shadow(0 0 4px ${accent})` : "none" }}>{item.icon}</span>
                  <span style={{
                    fontSize: 9.5, fontFamily: "'DM Mono', monospace",
                    color: active ? accent : "#334155",
                    letterSpacing: "0.05em",
                  }}>{item.label}</span>
                  {active && <div style={{ width: 20, height: 2, background: accent, borderRadius: 999, marginTop: -2, boxShadow: `0 0 6px ${accent}` }} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}