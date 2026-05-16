// ContentAnalytics.jsx
// Standalone component — drop this anywhere in your project.
//
// Dependencies:
//   npm install recharts framer-motion lucide-react

import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const C = {
  indigo: "hsl(245,58%,51%)",
  green:  "hsl(170,60%,45%)",
  amber:  "hsl(38,92%,50%)",
  red:    "hsl(0,72%,55%)",
  sky:    "hsl(210,80%,55%)",
  purple: "hsl(270,60%,60%)",
  pink:   "hsl(330,65%,55%)",
  teal:   "hsl(185,65%,42%)",
};
const COLORS = Object.values(C);

// ─── STYLES ───────────────────────────────────────────────────────────────────
const card   = { background:"#16161f", border:"1px solid #2a2a3a", borderRadius:14, padding:"20px 24px" };
const axTick = { fontSize:11, fill:"#94a3b8" };

// ─── DATA (replace with your API / props as needed) ───────────────────────────
const instructors = [
  { name:"Dr. Sarah Kim",  rating:4.9, students:45200, revenue:128000, courses:8  },
  { name:"James Okonkwo",  rating:4.7, students:38900, revenue:98000,  courses:12 },
  { name:"Priya Nair",     rating:4.8, students:31500, revenue:87000,  courses:6  },
  { name:"Carlos Mendez",  rating:4.6, students:27800, revenue:74000,  courses:9  },
  { name:"Emily Zhang",    rating:4.5, students:22100, revenue:61000,  courses:7  },
];

const contentPerf = [
  { title:"Intro to Python",  completion:82, rewatch:24, skipRate:8  },
  { title:"Neural Networks",  completion:58, rewatch:41, skipRate:22 },
  { title:"CSS Animations",   completion:74, rewatch:18, skipRate:12 },
  { title:"SQL Joins",        completion:69, rewatch:35, skipRate:15 },
  { title:"Docker Basics",    completion:61, rewatch:29, skipRate:19 },
];

const geoData = [
  { country:"India",   enrollment:89000, flag:"🇮🇳" },
  { country:"USA",     enrollment:72000, flag:"🇺🇸" },
  { country:"Brazil",  enrollment:34000, flag:"🇧🇷" },
  { country:"UK",      enrollment:28000, flag:"🇬🇧" },
  { country:"Germany", enrollment:21000, flag:"🇩🇪" },
  { country:"Nigeria", enrollment:18000, flag:"🇳🇬" },
  { country:"China",   enrollment:15000, flag:"🇨🇳" },
];

const searchVsEnroll = [
  { term:"Python tutorial",  searches:12400, enrollments:3200 },
  { term:"Machine learning", searches:9800,  enrollments:2100 },
  { term:"Web development",  searches:8700,  enrollments:2800 },
  { term:"Data science",     searches:7600,  enrollments:1900 },
  { term:"Excel course",     searches:6200,  enrollments:2400 },
];

// ─── SHARED SUB-COMPONENTS ────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:"#1e1e2e", border:"1px solid #2e2e3e", borderRadius:8, padding:"8px 14px", fontSize:13, color:"#e2e8f0" }}>
      {label && <p style={{ marginBottom:4, fontWeight:600 }}>{label}</p>}
      {payload.map((e, i) => (
        <p key={i} style={{ color: e.fill || e.color || C.indigo, margin:"2px 0" }}>
          {e.name}: <strong>{e.value}</strong>
        </p>
      ))}
    </div>
  );
};

function CardHeader({ title, sub, right }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
      <div>
        <p style={{ fontSize:14, fontWeight:600, color:"#e2e8f0", margin:0 }}>{title}</p>
        {sub && <p style={{ fontSize:12, color:"#94a3b8", marginTop:3 }}>{sub}</p>}
      </div>
      {right}
    </div>
  );
}

function ProgressBar({ value, color = C.indigo, height = 6 }) {
  return (
    <div style={{ background:"#2a2a3a", borderRadius:99, height, overflow:"hidden", flex:1 }}>
      <div style={{ width:`${value}%`, height:"100%", background:color, borderRadius:99, transition:"width 0.6s ease" }} />
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function ContentAnalytics() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:18, fontFamily:"'DM Sans', sans-serif", color:"#e2e8f0" }}>

      {/* Section header */}
      <div>
        <h2 style={{ fontSize:17, fontWeight:700, margin:0, color:"#0f172a" }}>Content & Instructors</h2>
        <p style={{ fontSize:12, color:"#94a3b8", marginTop:4 }}>
          Video performance, instructor rankings, geographic reach, search discovery
        </p>
      </div>

      {/* ── Instructor Table ─────────────────────────────────────────────────── */}
      <div style={card}>
        <CardHeader title="Top Instructors" sub="Ranked by student reach and revenue" />
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr", gap:0, fontSize:12 }}>
          {["Instructor","Rating","Students","Revenue","Courses"].map((h, i) => (
            <div key={i} style={{
              padding:"8px 0", color:"#64748b", fontWeight:700,
              borderBottom:"1px solid #2a2a3a",
              textTransform:"uppercase", fontSize:10, letterSpacing:"0.05em",
            }}>{h}</div>
          ))}
          {instructors.map((ins, i) => (
            <>
              <div key={`n${i}`} style={{
                padding:"11px 0", borderBottom:"1px solid #1e1e2e",
                color:"#e2e8f0", display:"flex", alignItems:"center", gap:8,
              }}>
                <div style={{
                  width:28, height:28, borderRadius:8,
                  background: COLORS[i] + "33",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:12, fontWeight:700, color: COLORS[i],
                }}>
                  {ins.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <span style={{ fontSize:13 }}>{ins.name}</span>
              </div>
              <div key={`r${i}`} style={{ padding:"11px 0", borderBottom:"1px solid #1e1e2e", color:C.amber, fontWeight:600 }}>⭐ {ins.rating}</div>
              <div key={`s${i}`} style={{ padding:"11px 0", borderBottom:"1px solid #1e1e2e", color:"#94a3b8" }}>{(ins.students / 1000).toFixed(1)}K</div>
              <div key={`v${i}`} style={{ padding:"11px 0", borderBottom:"1px solid #1e1e2e", color:C.green, fontWeight:600 }}>${(ins.revenue / 1000).toFixed(0)}K</div>
              <div key={`c${i}`} style={{ padding:"11px 0", borderBottom:"1px solid #1e1e2e", color:"#94a3b8" }}>{ins.courses}</div>
            </>
          ))}
        </div>
      </div>

      {/* ── Video Content Performance ─────────────────────────────────────────── */}
      <div style={card}>
        <CardHeader title="Video Content Performance" sub="Completion %, rewatch rate & skip rate per course" />
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {contentPerf.map((c, i) => (
            <div key={i}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <span style={{ fontSize:13, color:"#e2e8f0" }}>{c.title}</span>
                <div style={{ display:"flex", gap:12, fontSize:11 }}>
                  <span style={{ color:C.green }}>✓ {c.completion}%</span>
                  <span style={{ color:C.amber }}>↺ {c.rewatch}%</span>
                  <span style={{ color:C.red }}>↷ {c.skipRate}%</span>
                </div>
              </div>
              <div style={{ display:"flex", gap:3 }}>
                <ProgressBar value={c.completion} color={C.green} />
                <ProgressBar value={c.rewatch}    color={C.amber} />
                <ProgressBar value={c.skipRate}   color={C.red}   />
              </div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:16, marginTop:14, fontSize:11, color:"#64748b" }}>
          {[[C.green,"Completion"],[C.amber,"Rewatch"],[C.red,"Skip Rate"]].map(([color, label]) => (
            <span key={label} style={{ display:"flex", alignItems:"center", gap:4 }}>
              <div style={{ width:8, height:8, borderRadius:2, background:color }} /> {label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Geo + Search vs Enroll ────────────────────────────────────────────── */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>

        {/* Geographic Distribution */}
        <div style={card}>
          <CardHeader title="Geographic Distribution" sub="Top countries by enrollment" />
          {geoData.map((g, i) => (
            <div key={i} style={{ marginBottom:10 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span style={{ fontSize:12, color:"#cbd5e1" }}>{g.flag} {g.country}</span>
                <span style={{ fontSize:12, color:COLORS[i], fontWeight:600 }}>
                  {(g.enrollment / 1000).toFixed(0)}K
                </span>
              </div>
              <ProgressBar value={(g.enrollment / 89000) * 100} color={COLORS[i]} />
            </div>
          ))}
        </div>

        {/* Search vs Enrollment */}
        <div style={card}>
          <CardHeader title="Search vs Enrollment" sub="What learners search vs what they enroll in" />
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={searchVsEnroll} layout="vertical" margin={{ top:0, right:36, left:8, bottom:0 }}>
              <XAxis type="number" tick={axTick} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="term" tick={{ ...axTick, fontSize:10 }} axisLine={false} tickLine={false} width={100} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize:11, color:"#94a3b8" }} />
              <Bar dataKey="searches"    name="Searches"    fill={C.indigo} radius={[0,4,4,0]} maxBarSize={12} />
              <Bar dataKey="enrollments" name="Enrollments" fill={C.green}  radius={[0,4,4,0]} maxBarSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}