// src/components/Charts.jsx
import React from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { MONTHLY_TREND, CATEGORY_COLORS } from "../data/mockData";
import { useApp } from "../context/AppContext";
import { formatCurrency } from "../utils/format";

const TICK_STYLE = { fontSize: 11, fill: "#4a5568", fontFamily: "'Space Mono', monospace" };

function ChartPanel({ title, children, action }) {
  return (
    <section style={styles.panel} aria-label={title}>
      <div style={styles.panelHeader}>
        <span style={styles.panelTitle}>{title}</span>
        {action}
      </div>
      {children}
    </section>
  );
}

export function TimeSeriesChart() {
  return (
    <ChartPanel title="Balance Trend — 6 months">
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={MONTHLY_TREND} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#a3e635" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#a3e635" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2530" />
          <XAxis dataKey="month" tick={TICK_STYLE} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={v => "₹" + (v/1000) + "K"} tick={TICK_STYLE} axisLine={false} tickLine={false} width={52} />
          <Tooltip
            contentStyle={{ background: "#0f1520", border: "1px solid #1e2530", borderRadius: "4px", fontSize: "12px" }}
            labelStyle={{ color: "#a3e635", fontFamily: "'Space Mono', monospace" }}
            formatter={(v, name) => [formatCurrency(v), name]}
          />
          <Area type="monotone" dataKey="balance" stroke="#a3e635" strokeWidth={2} fill="url(#balGrad)" dot={{ fill: "#a3e635", r: 3 }} />
          <Area type="monotone" dataKey="income"  stroke="#34d399" strokeWidth={1.5} fill="none" strokeDasharray="4 3" dot={false} />
          <Area type="monotone" dataKey="expenses" stroke="#f472b6" strokeWidth={1.5} fill="none" strokeDasharray="4 3" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
      <div style={styles.legend}>
        {[["#a3e635","Balance"],["#34d399","Income"],["#f472b6","Expenses"]].map(([c,l]) => (
          <span key={l} style={styles.legendItem}>
            <span style={{ ...styles.legendDot, background: c }} />
            {l}
          </span>
        ))}
      </div>
    </ChartPanel>
  );
}

export function CategoryChart() {
  const { spendingByCategory } = useApp();
  const top6 = spendingByCategory.slice(0, 6);

  return (
    <ChartPanel title="Spending Breakdown">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={top6} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2530" horizontal={false} />
          <XAxis type="number" tickFormatter={v => "₹" + (v/1000) + "K"} tick={TICK_STYLE} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" tick={{ ...TICK_STYLE, fontSize: 10 }} axisLine={false} tickLine={false} width={80} />
          <Tooltip
            contentStyle={{ background: "#0f1520", border: "1px solid #1e2530", borderRadius: "4px", fontSize: "12px" }}
            formatter={v => [formatCurrency(v)]}
          />
          <Bar dataKey="value" radius={[0, 3, 3, 0]}>
            {top6.map((entry) => (
              <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || "#4a5568"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartPanel>
  );
}

const styles = {
  panel: {
    background: "#0f1520",
    border: "1px solid #1e2530",
    padding: "1.25rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  panelTitle: {
    fontSize: "11px",
    fontFamily: "'Space Mono', monospace",
    color: "#4a5568",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  legend: { display: "flex", gap: "16px", flexWrap: "wrap" },
  legendItem: { display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#4a5568", fontFamily: "'Space Mono', monospace" },
  legendDot: { width: "8px", height: "8px", borderRadius: "2px", flexShrink: 0 },
};
