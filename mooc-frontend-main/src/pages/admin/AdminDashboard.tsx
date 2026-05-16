import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Users, Star, TrendingUp, Award, Activity } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend,
} from "recharts";

// ─── COLORS ───────────────────────────────────────────────────────────────────
const COLORS = [
  "hsl(245, 58%, 51%)",
  "hsl(170, 60%, 45%)",
  "hsl(38, 92%, 50%)",
  "hsl(0, 72%, 55%)",
  "hsl(210, 80%, 55%)",
];

// ─── DATA ─────────────────────────────────────────────────────────────────────
const mockStats = {
  total_courses: 378,
  average_rating: 3.8,
  total_enrollment: 320000,
  platforms: ["Coursera", "Udemy", "edX"],
  paid_courses: 240,
  free_courses: 138,
};

const platformData = [
  { name: "Coursera", value: 150 },
  { name: "Udemy", value: 160 },
  { name: "edX", value: 68 },
];

const enrollmentTrend = [
  { month: "Jan", users: 20000 },
  { month: "Feb", users: 28000 },
  { month: "Mar", users: 35000 },
  { month: "Apr", users: 42000 },
  { month: "May", users: 50000 },
];

const ratingDist = [
  { range: "1★", count: 10 },
  { range: "2★", count: 25 },
  { range: "3★", count: 80 },
  { range: "4★", count: 150 },
  { range: "5★", count: 113 },
];

const paidFree = [
  { name: "Paid", value: 240 },
  { name: "Free", value: 138 },
];

// ─── NEW DASHBOARD DATA ───────────────────────────────────────────────────────
const completionByPlatform = [
  { platform: "Coursera", rate: 68 },
  { platform: "Udemy", rate: 54 },
  { platform: "edX", rate: 72 },
];

const revenueData = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 55000 },
  { month: "Mar", revenue: 61000 },
  { month: "Apr", revenue: 74000 },
  { month: "May", revenue: 89000 },
  { month: "Jun", revenue: 95000 },
];

const topCategories = [
  { name: "Data Science", courses: 95, enrollment: 120000 },
  { name: "Web Dev", courses: 82, enrollment: 98000 },
  { name: "Business", courses: 74, enrollment: 56000 },
  { name: "Design", courses: 61, enrollment: 34000 },
  { name: "Cloud", courses: 66, enrollment: 12000 },
];

const learnerRetention = [
  { week: "W1", active: 100 },
  { week: "W2", active: 78 },
  { week: "W3", active: 61 },
  { week: "W4", active: 49 },
  { week: "W5", active: 38 },
  { week: "W6", active: 31 },
];

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const card = {
  background: "#16161f",
  border: "1px solid #2a2a3a",
  borderRadius: 14,
  padding: "20px 24px",
};

const axTick = { fontSize: 11, fill: "#94a3b8" };

// ─── TOOLTIP ──────────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#1e1e2e", border: "1px solid #2e2e3e",
      borderRadius: 8, padding: "8px 14px", fontSize: 13, color: "#e2e8f0",
    }}>
      {label && <p style={{ marginBottom: 4, fontWeight: 600 }}>{label}</p>}
      {payload.map((e, i) => (
        <p key={i} style={{ color: e.fill || e.color || COLORS[0] }}>
          {e.name}: <strong>{e.value}</strong>
        </p>
      ))}
    </div>
  );
};

// ─── VIEW TOGGLE ──────────────────────────────────────────────────────────────
function ViewToggle({ options, active, onChange }) {
  return (
    <div style={{
      display: "flex", background: "#1e1e2e", borderRadius: 10,
      padding: 4, width: 200, position: "relative", flexShrink: 0,
    }}>
      {options.map((opt) => (
        <button key={opt.value} onClick={() => onChange(opt.value)} style={{
          flex: 1, padding: "7px 0", fontSize: 12, fontWeight: 500,
          borderRadius: 7, border: "none", cursor: "pointer",
          transition: "all 0.2s",
          background: active === opt.value ? COLORS[0] : "transparent",
          color: active === opt.value ? "#fff" : "#94a3b8",
        }}>
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ title, value, icon: Icon, accent = COLORS[0] }) {
  return (
    <div style={{
      ...card,
      display: "flex", alignItems: "center", gap: 16,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12, display: "flex",
        alignItems: "center", justifyContent: "center",
        background: accent + "22",
      }}>
        <Icon size={20} color={accent} />
      </div>
      <div>
        <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>{title}</p>
        <p style={{ fontSize: 22, fontWeight: 700, color: "#e2e8f0", margin: 0 }}>{value}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  ADMIN DASHBOARD (fixed)
// ─────────────────────────────────────────────────────────────────────────────
function AdminDashboard() {
  const [showPricingChart, setShowPricingChart] = useState(false);
  const [showRatingChart, setShowRatingChart] = useState(false);

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: 24, fontFamily: "'DM Sans', sans-serif", color: "#e2e8f0" }}>

      {/* HEADER */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Admin Dashboard</h1>
        <p style={{ color: "#94a3b8", fontSize: 14, marginTop: 4 }}>
          Overview of platform performance and learner behavior.
        </p>
      </div>

      {/* STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 14, marginBottom: 20 }}>
        <StatCard title="Total Courses" value={mockStats.total_courses} icon={BookOpen} accent={COLORS[0]} />
        <StatCard title="Avg Rating" value={mockStats.average_rating} icon={Star} accent={COLORS[2]} />
        <StatCard title="Total Enrollment" value="3.2L+" icon={Users} accent={COLORS[1]} />
        <StatCard title="Platforms" value={mockStats.platforms.length} icon={TrendingUp} accent={COLORS[4]} />
      </div>

      {/* CHART ROW */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>

        {/* Growth ↔ Ratings toggle */}
        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <p style={{ fontWeight: 600, fontSize: 14, margin: 0 }}>
                {showRatingChart ? "Rating Distribution" : "Enrollment Growth"}
              </p>
              <p style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>
                {showRatingChart ? "Course rating spread" : "Monthly enrollments"}
              </p>
            </div>
            <ViewToggle
              options={[{ label: "Growth", value: "growth" }, { label: "Ratings", value: "ratings" }]}
              active={showRatingChart ? "ratings" : "growth"}
              onChange={(v) => setShowRatingChart(v === "ratings")}
            />
          </div>
          <AnimatePresence mode="wait">
            {!showRatingChart ? (
              <motion.div key="growth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={enrollmentTrend} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
                    <XAxis dataKey="month" tick={axTick} axisLine={false} tickLine={false} />
                    <YAxis tick={axTick} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="users" fill={COLORS[0]} radius={[6, 6, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            ) : (
              <motion.div key="rating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={ratingDist} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
                    <XAxis dataKey="range" tick={axTick} axisLine={false} tickLine={false} />
                    <YAxis tick={axTick} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={40}>
                      {ratingDist.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Platform Pie */}
        <div style={card}>
          <p style={{ fontWeight: 600, fontSize: 14, margin: "0 0 16px" }}>Platform Distribution</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={platformData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={{ stroke: "#475569" }}>
                {platformData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 8 }}>
            {platformData.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#94a3b8" }}>
                <div style={{ width: 9, height: 9, borderRadius: 3, background: COLORS[i] }} />
                {d.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary ↔ Pricing */}
      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <p style={{ fontWeight: 600, fontSize: 14, margin: 0 }}>
              {showPricingChart ? "Pricing Distribution" : "Quick Summary"}
            </p>
            <p style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>
              {showPricingChart ? "Paid vs Free courses" : "Key dataset metrics"}
            </p>
          </div>
          <ViewToggle
            options={[{ label: "Summary", value: "summary" }, { label: "Pricing", value: "pricing" }]}
            active={showPricingChart ? "pricing" : "summary"}
            onChange={(v) => setShowPricingChart(v === "pricing")}
          />
        </div>

        <AnimatePresence mode="wait">
          {!showPricingChart ? (
            <motion.div key="summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {[
                ["Paid Courses", mockStats.paid_courses],
                ["Free Courses", mockStats.free_courses],
                ["Average Rating", mockStats.average_rating],
              ].map(([label, val], i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "10px 0", borderBottom: i < 2 ? "1px solid #2a2a3a" : "none",
                  fontSize: 13, color: "#cbd5e1",
                }}>
                  <span>{label}</span>
                  <span style={{ fontWeight: 600, color: COLORS[i] }}>{val}</span>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="pricing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={paidFree} dataKey="value" nameKey="name"
                    cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={{ stroke: "#475569" }}>
                    <Cell fill={COLORS[0]} />
                    <Cell fill={COLORS[1]} />
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  NEW DETAILED DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────
function NewDashboard() {
  const [revenueView, setRevenueView] = useState("revenue");

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: 24, fontFamily: "'DM Sans', sans-serif", color: "#e2e8f0" }}>

      {/* HEADER */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Learning Intelligence</h1>
        <p style={{ color: "#94a3b8", fontSize: 14, marginTop: 4 }}>
          Deep-dive metrics across revenue, retention, and category performance.
        </p>
      </div>

      {/* STAT ROW */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: 14, marginBottom: 20 }}>
        <StatCard title="Monthly Revenue" value="$95K" icon={TrendingUp} accent={COLORS[1]} />
        <StatCard title="Completion Rate" value="64%" icon={Award} accent={COLORS[2]} />
        <StatCard title="Active Learners" value="31K" icon={Activity} accent={COLORS[0]} />
        <StatCard title="Top Category" value="Data Sci" icon={BookOpen} accent={COLORS[4]} />
      </div>

      {/* REVENUE / RETENTION LINE CHART */}
      <div style={{ ...card, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <p style={{ fontWeight: 600, fontSize: 14, margin: 0 }}>
              {revenueView === "revenue" ? "Revenue Trend" : "Learner Retention"}
            </p>
            <p style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>
              {revenueView === "revenue" ? "Monthly platform revenue ($)" : "Weekly drop-off after course start"}
            </p>
          </div>
          <ViewToggle
            options={[{ label: "Revenue", value: "revenue" }, { label: "Retention", value: "retention" }]}
            active={revenueView}
            onChange={setRevenueView}
          />
        </div>
        <AnimatePresence mode="wait">
          {revenueView === "revenue" ? (
            <motion.div key="rev" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={revenueData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#2a2a3a" strokeDasharray="4 4" />
                  <XAxis dataKey="month" tick={axTick} axisLine={false} tickLine={false} />
                  <YAxis tick={axTick} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="revenue" stroke={COLORS[1]} strokeWidth={2.5} dot={{ fill: COLORS[1], r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          ) : (
            <motion.div key="ret" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={learnerRetention} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#2a2a3a" strokeDasharray="4 4" />
                  <XAxis dataKey="week" tick={axTick} axisLine={false} tickLine={false} />
                  <YAxis tick={axTick} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={v => `${v}%`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="active" stroke={COLORS[3]} strokeWidth={2.5} dot={{ fill: COLORS[3], r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CATEGORY + COMPLETION */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>

        {/* Category enrollment bar */}
        <div style={card}>
          <p style={{ fontWeight: 600, fontSize: 14, margin: "0 0 16px" }}>Top Categories by Enrollment</p>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={topCategories} layout="vertical" margin={{ top: 0, right: 32, left: 8, bottom: 0 }}>
              <XAxis type="number" tick={axTick} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ ...axTick, fontSize: 12 }} axisLine={false} tickLine={false} width={70} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="enrollment" radius={[0, 6, 6, 0]} maxBarSize={22}>
                {topCategories.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Completion rate by platform */}
        <div style={card}>
          <p style={{ fontWeight: 600, fontSize: 14, margin: "0 0 16px" }}>Completion Rate by Platform</p>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={completionByPlatform} margin={{ top: 8, right: 16, left: -10, bottom: 0 }}>
              <XAxis dataKey="platform" tick={axTick} axisLine={false} tickLine={false} />
              <YAxis tick={axTick} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={v => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="rate" radius={[6, 6, 0, 0]} maxBarSize={50}>
                {completionByPlatform.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* COURSE COUNT TABLE */}
      <div style={card}>
        <p style={{ fontWeight: 600, fontSize: 14, margin: "0 0 16px" }}>Category Breakdown</p>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "0", fontSize: 12 }}>
          {["Category", "Courses", "Enrollment"].map((h, i) => (
            <div key={i} style={{
              padding: "8px 0", color: "#64748b", fontWeight: 600,
              borderBottom: "1px solid #2a2a3a", letterSpacing: "0.05em", textTransform: "uppercase",
            }}>{h}</div>
          ))}
          {topCategories.map((row, i) => (
            <>
              <div key={`n${i}`} style={{ padding: "10px 0", borderBottom: "1px solid #1e1e2e", color: "#cbd5e1", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS[i] }} />
                {row.name}
              </div>
              <div key={`c${i}`} style={{ padding: "10px 0", borderBottom: "1px solid #1e1e2e", color: COLORS[i], fontWeight: 600 }}>{row.courses}</div>
              <div key={`e${i}`} style={{ padding: "10px 0", borderBottom: "1px solid #1e1e2e", color: "#94a3b8" }}>{(row.enrollment / 1000).toFixed(0)}K</div>
            </>
          ))}
        </div>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  ROOT — tab between both dashboards
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("admin");

  return (
    <div style={{ minHeight: "100vh", background: "#0e0e17", padding: "16px 0" }}>

      {/* TAB BAR */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
        <div style={{ display: "flex", background: "#16161f", border: "1px solid #2a2a3a", borderRadius: 12, padding: 4, gap: 4 }}>
          {[["admin", "Admin Dashboard"], ["new", "Learning Intelligence"]].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} style={{
              padding: "8px 20px", fontSize: 13, fontWeight: 500, borderRadius: 9,
              border: "none", cursor: "pointer", transition: "all 0.2s",
              background: tab === key ? COLORS[0] : "transparent",
              color: tab === key ? "#fff" : "#94a3b8",
            }}>{label}</button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {tab === "admin" ? (
          <motion.div key="admin" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
            <AdminDashboard />
          </motion.div>
        ) : (
          <motion.div key="new" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
            <NewDashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}