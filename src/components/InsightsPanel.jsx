// src/components/InsightsPanel.jsx
import React from "react";
import { useApp } from "../context/AppContext";
import { formatCurrency } from "../utils/format";
import { CATEGORY_COLORS } from "../data/mockData";

export default function InsightsPanel() {
  const { insights, isAdmin, dispatch } = useApp();
  const { topCategory, thisMonth, lastMonth, monthDelta } = insights;

  const deltaSign = monthDelta >= 0 ? "+" : "";
  const deltaColor = monthDelta >= 0 ? "#f472b6" : "#34d399";

  return (
    <section aria-label="Insights" style={styles.panel}>
      <div style={styles.title}>/ Insights</div>

      <div style={styles.insight}>
        <div style={styles.insightLabel}>Top spending category</div>
        {topCategory ? (
          <div style={styles.insightValue}>
            <span style={{ ...styles.dot, background: CATEGORY_COLORS[topCategory.name] || "#4a5568" }} />
            {topCategory.name}
            <span style={styles.insightSub}>{formatCurrency(topCategory.value)}</span>
          </div>
        ) : <div style={styles.empty}>No data</div>}
      </div>

      <div style={styles.divider} />

      <div style={styles.insight}>
        <div style={styles.insightLabel}>Month-over-month expenses</div>
        <div style={styles.insightValue}>
          <span style={{ color: deltaColor, fontFamily: "'Space Mono', monospace", fontSize: "14px" }}>
            {deltaSign}{formatCurrency(Math.abs(monthDelta))}
          </span>
        </div>
        <div style={styles.monthRow}>
          <span>Mar: {formatCurrency(thisMonth, true)}</span>
          <span>Feb: {formatCurrency(lastMonth, true)}</span>
        </div>
      </div>

      <div style={styles.divider} />

      {/* Admin-only action */}
      {isAdmin ? (
        <div style={styles.adminZone}>
          <div style={styles.insightLabel}>Admin actions</div>
          <button
            style={styles.actionBtn}
            onClick={() => {
              if (window.confirm("Reset all transactions to mock data?")) {
                dispatch({ type: "HYDRATE", payload: { transactions: require("../data/mockData").MOCK_TRANSACTIONS } });
              }
            }}
            aria-label="Reset transactions to mock data"
          >
            ↺ Reset data
          </button>
        </div>
      ) : (
        <div style={styles.viewerNote}>
          <span style={styles.insightLabel}>Switch to Admin to add/edit transactions</span>
        </div>
      )}
    </section>
  );
}

const styles = {
  panel: {
    background: "#0f1520",
    border: "1px solid #1e2530",
    padding: "1.25rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  title: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "11px",
    color: "#a3e635",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  insight: { display: "flex", flexDirection: "column", gap: "6px" },
  insightLabel: { fontSize: "11px", color: "#4a5568", fontFamily: "'Space Mono', monospace", textTransform: "uppercase", letterSpacing: "0.05em" },
  insightValue: { fontSize: "14px", color: "#e2e8f0", display: "flex", alignItems: "center", gap: "8px", fontWeight: 500 },
  insightSub: { fontSize: "12px", color: "#4a5568", marginLeft: "4px" },
  dot: { width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0 },
  divider: { height: "1px", background: "#1e2530" },
  monthRow: { display: "flex", gap: "16px", fontSize: "12px", color: "#4a5568" },
  adminZone: { display: "flex", flexDirection: "column", gap: "8px" },
  actionBtn: {
    padding: "7px 14px",
    background: "transparent",
    border: "1px solid #1e2530",
    color: "#f472b6",
    fontSize: "11px",
    fontFamily: "'Space Mono', monospace",
    cursor: "pointer",
    borderRadius: "4px",
    letterSpacing: "0.05em",
    textAlign: "left",
    width: "fit-content",
    transition: "border-color 0.15s",
  },
  viewerNote: { padding: "10px", background: "#131a24", borderRadius: "4px", border: "1px dashed #1e2530" },
  empty: { fontSize: "13px", color: "#4a5568" },
};
