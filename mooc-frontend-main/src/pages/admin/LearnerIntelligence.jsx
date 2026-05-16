// LearnerIntelligence.jsx
// Standalone component — drop this anywhere in your project.
//
// Dependencies:
//   npm install recharts framer-motion lucide-react

import { useState, useMemo } from "react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { ChevronUp, ChevronDown, ChevronsUpDown, Flame } from "lucide-react";

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

// ─── STYLES ───────────────────────────────────────────────────────────────────
const card = { background:"#16161f", border:"1px solid #2a2a3a", borderRadius:14, padding:"20px 24px" };

// ─── DATA (replace with your API / props as needed) ───────────────────────────
const skillRadar = [
  { skill:"Python", current:72, target:90 },
  { skill:"Stats",  current:45, target:80 },
  { skill:"SQL",    current:60, target:75 },
  { skill:"ML",     current:30, target:85 },
  { skill:"Viz",    current:55, target:70 },
  { skill:"Cloud",  current:25, target:65 },
];

// 12-week activity calendar  (0 = inactive, 1-4 = intensity levels)
const streakCalendar = Array.from({ length: 12 }, (_, w) =>
  Array.from({ length: 7 }, (_, d) => ({
    week: w, day: d,
    value: Math.random() > 0.35 ? Math.floor(Math.random() * 4) + 1 : 0,
  }))
);

const learnerActivity = [
  { name:"Arjun Sharma",    lastLogin:"2h ago",  progress:78, risk:"low"    },
  { name:"Maria Lopez",     lastLogin:"1d ago",  progress:45, risk:"medium" },
  { name:"David Chen",      lastLogin:"5d ago",  progress:12, risk:"high"   },
  { name:"Fatima Al-Hassan",lastLogin:"3h ago",  progress:91, risk:"low"    },
  { name:"Jake Thompson",   lastLogin:"12d ago", progress:5,  risk:"high"   },
  { name:"Yuki Tanaka",     lastLogin:"6h ago",  progress:67, risk:"low"    },
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

function ViewToggle({ options, active, onChange, width = 220 }) {
  return (
    <div style={{ display:"flex", background:"#1e1e2e", borderRadius:10, padding:4, width, flexShrink:0 }}>
      {options.map(opt => (
        <button key={opt.value} onClick={() => onChange(opt.value)} style={{
          flex:1, padding:"7px 0", fontSize:12, fontWeight:500, borderRadius:7,
          border:"none", cursor:"pointer", transition:"all 0.2s",
          background: active === opt.value ? C.indigo : "transparent",
          color:      active === opt.value ? "#fff"   : "#94a3b8",
        }}>{opt.label}</button>
      ))}
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

function RiskBadge({ risk }) {
  const map = { low:[C.green,"#0d2e1e"], medium:[C.amber,"#2e2200"], high:[C.red,"#2e0d0d"] };
  const [fg, bg] = map[risk];
  return (
    <span style={{
      background:bg, color:fg, fontSize:10, fontWeight:700,
      padding:"3px 8px", borderRadius:20,
      textTransform:"uppercase", letterSpacing:"0.05em",
    }}>{risk}</span>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function LearnerIntelligence() {
  const [sortField, setSortField] = useState("progress");
  const [sortDir,   setSortDir]   = useState("desc");
  const [filter,    setFilter]    = useState("all");

  // Sorting + filtering logic
  const sorted = useMemo(() => {
    const list = filter === "all"
      ? learnerActivity
      : learnerActivity.filter(l => l.risk === filter);
    return [...list].sort((a, b) => {
      const va = a[sortField], vb = b[sortField];
      if (typeof va === "string") return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      return sortDir === "asc" ? va - vb : vb - va;
    });
  }, [sortField, sortDir, filter]);

  const toggleSort = (f) => {
    if (sortField === f) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(f); setSortDir("desc"); }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronsUpDown size={10} color="#475569" />;
    return sortDir === "asc"
      ? <ChevronUp   size={10} color={C.indigo} />
      : <ChevronDown size={10} color={C.indigo} />;
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:18, fontFamily:"'DM Sans', sans-serif", color:"#e2e8f0" }}>

      {/* Section header */}
      <div>
        <h2 style={{ fontSize:17, fontWeight:700, margin:0, color:"#0f172a" }}>Learner Intelligence</h2>
        <p style={{ fontSize:12, color:"#94a3b8", marginTop:4 }}>
          Progress tracking, skill gaps, streaks and risk profiles
        </p>
      </div>

      {/* ── Skill Radar + Streak Calendar ────────────────────────────────────── */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>

        {/* Skill Gap Radar */}
        <div style={card}>
          <CardHeader title="Skill Gap Radar" sub="Current skill level vs learning targets" />
          <ResponsiveContainer width="100%" height={230}>
            <RadarChart data={skillRadar} cx="50%" cy="50%" outerRadius={80}>
              <PolarGrid stroke="#2a2a3a" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize:11, fill:"#94a3b8" }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize:9, fill:"#475569" }} />
              <Radar name="Current" dataKey="current" stroke={C.indigo} fill={C.indigo} fillOpacity={0.3} />
              <Radar name="Target"  dataKey="target"  stroke={C.green}  fill={C.green}  fillOpacity={0.15} strokeDasharray="4 2" />
              <Legend wrapperStyle={{ fontSize:11, color:"#94a3b8" }} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Learning Streak Calendar */}
        <div style={card}>
          <CardHeader
            title="Learning Streak Calendar"
            sub="12-week activity heatmap"
            right={
              <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:C.amber }}>
                <Flame size={14} color={C.amber} /> 18-day streak
              </div>
            }
          />
          {/* Calendar grid */}
          <div style={{ display:"flex", gap:4, flexWrap:"nowrap", overflowX:"auto", paddingBottom:4 }}>
            {streakCalendar.map((week, wi) => (
              <div key={wi} style={{ display:"flex", flexDirection:"column", gap:3 }}>
                {week.map((cell, di) => {
                  const bg = cell.value === 0
                    ? "#1e1e2e"
                    : `hsla(38,92%,50%,${0.15 + cell.value * 0.2})`;
                  return (
                    <div key={di} style={{
                      width:14, height:14, borderRadius:3,
                      background:bg, border:"1px solid #2a2a3a",
                    }} />
                  );
                })}
              </div>
            ))}
          </div>
          {/* Legend */}
          <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:8, fontSize:10, color:"#64748b" }}>
            <span>Less</span>
            {[0, 1, 2, 3, 4].map(v => (
              <div key={v} style={{
                width:12, height:12, borderRadius:3,
                background: v === 0 ? "#1e1e2e" : `hsla(38,92%,50%,${0.15 + v * 0.2})`,
              }} />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>

      {/* ── Learner Activity Table ────────────────────────────────────────────── */}
      <div style={card}>
        <CardHeader
          title="Learner Activity Log"
          sub="Risk-scored learner progress tracker"
          right={
            <ViewToggle
              options={[
                { label:"All",     value:"all"    },
                { label:"High Risk",value:"high"  },
                { label:"Medium",  value:"medium" },
              ]}
              active={filter}
              onChange={setFilter}
            />
          }
        />

        {/* Table */}
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 2fr 1fr", gap:0, fontSize:12 }}>

          {/* Column headers */}
          {[["Name", null], ["Last Login","lastLogin"], ["Progress","progress"], ["Risk","risk"]].map(([h, f], i) => (
            <div
              key={i}
              onClick={() => f && toggleSort(f)}
              style={{
                padding:"8px 0", color:"#64748b", fontWeight:700,
                borderBottom:"1px solid #2a2a3a",
                textTransform:"uppercase", fontSize:10, letterSpacing:"0.05em",
                cursor: f ? "pointer" : "default",
                display:"flex", alignItems:"center", gap:4,
                userSelect:"none",
              }}
            >
              {h} {f && <SortIcon field={f} />}
            </div>
          ))}

          {/* Rows */}
          {sorted.map((l, i) => (
            <>
              <div key={`n${i}`} style={{ padding:"10px 0", borderBottom:"1px solid #1e1e2e", color:"#e2e8f0", fontSize:13 }}>
                {l.name}
              </div>
              <div key={`l${i}`} style={{ padding:"10px 0", borderBottom:"1px solid #1e1e2e", color:"#64748b", fontSize:12 }}>
                {l.lastLogin}
              </div>
              <div key={`p${i}`} style={{ padding:"10px 0", borderBottom:"1px solid #1e1e2e", paddingRight:16 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <ProgressBar
                    value={l.progress}
                    color={l.risk === "high" ? C.red : l.risk === "medium" ? C.amber : C.green}
                  />
                  <span style={{ fontSize:12, color:"#94a3b8", flexShrink:0 }}>{l.progress}%</span>
                </div>
              </div>
              <div key={`r${i}`} style={{ padding:"10px 0", borderBottom:"1px solid #1e1e2e" }}>
                <RiskBadge risk={l.risk} />
              </div>
            </>
          ))}
        </div>
      </div>

    </div>
  );
}