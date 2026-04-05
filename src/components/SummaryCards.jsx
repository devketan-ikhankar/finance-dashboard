// src/components/SummaryCards.jsx
import React from "react";
import { useApp } from "../context/AppContext";
import { formatCurrency } from "../utils/format";

function StatCard({ label, value, accent, icon, sub }) {
  return (
    <div style={{ ...styles.card, borderTop: `3px solid ${accent}` }} role="region" aria-label={label}>
      <div style={styles.cardTop}>
        <span style={styles.cardLabel}>{label}</span>
        <span style={{ ...styles.cardIcon, color: accent }}>{icon}</span>
      </div>
      <div style={{ ...styles.cardValue, color: accent }}>{value}</div>
      {sub && <div style={styles.cardSub}>{sub}</div>}
    </div>
  );
}

export default function SummaryCards() {
  const { summary } = useApp();

  const balanceChange = "+₹17K this month";
  const incomeChange  = "vs ₹98K last month";
  const expenseSub    = "Housing is top spend";

  return (
    <section aria-label="Financial summary" style={styles.grid}>
      <StatCard
        label="Total Balance"
        value={formatCurrency(summary.balance, true)}
        accent="#a3e635"
        icon="◈"
        sub={balanceChange}
      />
      <StatCard
        label="Total Income"
        value={formatCurrency(summary.income, true)}
        accent="#34d399"
        icon="↑"
        sub={incomeChange}
      />
      <StatCard
        label="Total Expenses"
        value={formatCurrency(summary.expenses, true)}
        accent="#f472b6"
        icon="↓"
        sub={expenseSub}
      />
      <StatCard
        label="Savings Rate"
        value={summary.income > 0 ? Math.round(((summary.income - summary.expenses) / summary.income) * 100) + "%" : "—"}
        accent="#38bdf8"
        icon="◎"
        sub="Target: 30%"
      />
    </section>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1px",
    background: "#1e2530",
    borderRadius: "0",
    overflow: "hidden",
  },
  card: {
    background: "#0f1520",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "4px",
  },
  cardLabel: {
    fontSize: "11px",
    fontFamily: "'Space Mono', monospace",
    color: "#4a5568",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  cardIcon: { fontSize: "18px" },
  cardValue: {
    fontSize: "28px",
    fontFamily: "'Space Mono', monospace",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    lineHeight: 1,
  },
  cardSub: {
    fontSize: "11px",
    color: "#4a5568",
    marginTop: "4px",
  },
};
