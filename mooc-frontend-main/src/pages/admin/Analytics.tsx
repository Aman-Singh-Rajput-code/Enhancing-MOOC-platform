import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LabelList,
  ResponsiveContainer,
} from "recharts";

// 🎨 COLORS
const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#0ea5e9"];

// 🎓 BEHAVIOR DATA
const behaviorData = [
  { factor: "Motivation", impact: 78 },
  { factor: "Consistency", impact: 72 },
  { factor: "Engagement", impact: 65 },
  { factor: "Cognitive Load", impact: 48 },
];

// ⚙️ DESIGN DATA
const designData = [
  { factor: "Flexibility", value: 30 },
  { factor: "Content", value: 25 },
  { factor: "Instructor", value: 20 },
  { factor: "Assessment", value: 15 },
  { factor: "UI/UX", value: 10 },
];

// 🧠 FEATURE IMPORTANCE
const featureImportance = [
  { name: "Content Depth", value: 85 },
  { name: "Instructor Clarity", value: 78 },
  { name: "Interaction Level", value: 74 },
  { name: "Structure", value: 68 },
  { name: "Flexibility", value: 64 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#1e1e2e",
        border: "1px solid #2e2e3e",
        borderRadius: 8,
        padding: "8px 14px",
        fontSize: 13,
        color: "#e2e8f0",
      }}>
        {label && <p style={{ marginBottom: 4, fontWeight: 600 }}>{label}</p>}
        {payload.map((entry, i) => (
          <p key={i} style={{ color: entry.fill || entry.color || "#6366f1" }}>
            {entry.name}: <strong>{entry.value}{entry.name === "value" || entry.name === "impact" ? "%" : ""}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  const [mode, setMode] = useState("behavior");

  const cardStyle = {
    background: "#16161f",
    border: "1px solid #2a2a3a",
    borderRadius: 14,
    padding: "20px 24px",
  };

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: 24, fontFamily: "'DM Sans', sans-serif", color: "#e2e8f0" }}>

      {/* HEADER */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: "#0f172a" }}>Analytics</h1>
        <p style={{ color: "#94a3b8", fontSize: 14, marginTop: 4 }}>
          Factor-based insights into learning behavior and course design.
        </p>
      </div>

      {/* 🔁 TOGGLE */}
      <div style={{
        display: "flex",
        background: "#1e1e2e",
        borderRadius: 10,
        padding: 4,
        width: 260,
        marginBottom: 24,
      }}>
        {["behavior", "design"].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              flex: 1,
              padding: "8px 0",
              fontSize: 13,
              fontWeight: 500,
              borderRadius: 7,
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s",
              background: mode === m ? "#6366f1" : "transparent",
              color: mode === m ? "#fff" : "#94a3b8",
            }}
          >
            {m === "behavior" ? "Behavior" : "Design"}
          </button>
        ))}
      </div>

      {/* 🧠 INSIGHTS */}
      <div style={{ ...cardStyle, marginBottom: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Key Insights</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
          {[
            { icon: <TrendingUp size={15} color="#22c55e" />, text: "Motivation and consistency are strongest predictors of completion" },
            { icon: <TrendingDown size={15} color="#ef4444" />, text: "High cognitive load significantly reduces retention" },
            { icon: <TrendingUp size={15} color="#22c55e" />, text: "Flexible course structure improves learner satisfaction" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {item.icon}
              <span style={{ color: "#cbd5e1" }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 🔄 DYNAMIC SECTION */}
      <AnimatePresence mode="wait">
        {mode === "behavior" ? (
          <motion.div
            key="behavior"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{ ...cardStyle, marginBottom: 20 }}
          >
            <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 20 }}>Behavioral Impact Factors</h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={behaviorData} margin={{ top: 16, right: 24, left: 0, bottom: 4 }}>
                <XAxis
                  dataKey="factor"
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                  axisLine={{ stroke: "#2a2a3a" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="impact" radius={[6, 6, 0, 0]} maxBarSize={52}>
                  {behaviorData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                  <LabelList
                    dataKey="impact"
                    position="top"
                    style={{ fill: "#e2e8f0", fontSize: 12, fontWeight: 600 }}
                    formatter={(v) => `${v}%`}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        ) : (
          <motion.div
            key="design"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{ ...cardStyle, marginBottom: 20 }}
          >
            <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Course Design Contribution</h2>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={designData}
                  dataKey="value"
                  nameKey="factor"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={{ stroke: "#475569", strokeWidth: 1 }}
                >
                  {designData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 8 }}>
              {designData.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#94a3b8" }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: COLORS[i] }} />
                  <span>{item.factor}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🧠 FEATURE IMPORTANCE */}
      <div style={cardStyle}>
        <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 20 }}>Factor Importance (ML Analysis)</h2>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={featureImportance}
            layout="vertical"
            margin={{ top: 4, right: 48, left: 16, bottom: 4 }}
          >
            <XAxis
              type="number"
              domain={[0, 100]}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 12, fill: "#cbd5e1" }}
              axisLine={false}
              tickLine={false}
              width={110}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={28}>
              {featureImportance.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
              <LabelList
                dataKey="value"
                position="right"
                style={{ fill: "#e2e8f0", fontSize: 12, fontWeight: 600 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}