// src/components/Dashboard.jsx
import React from "react";
import DashboardHeader from "./DashboardHeader";
import SummaryCards from "./SummaryCards";
import { TimeSeriesChart, CategoryChart } from "./Charts";
import InsightsPanel from "./InsightsPanel";
import TransactionsSection from "./TransactionsSection";

export default function Dashboard() {
  return (
    <div style={styles.root}>
      {/* Google Font injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080c13; }
        input, select, button, textarea { font-family: inherit; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0b0f17; }
        ::-webkit-scrollbar-thumb { background: #1e2530; border-radius: 3px; }
        :focus-visible { outline: 2px solid #a3e635; outline-offset: 2px; }
        select option { background: #131a24; }
      `}</style>

      <DashboardHeader />

      <main style={styles.main}>
        {/* Summary strip */}
        <SummaryCards />

        {/* Middle: charts + insights sidebar */}
        <div style={styles.middle}>
          <div style={styles.charts}>
            <TimeSeriesChart />
            <CategoryChart />
          </div>
          <aside style={styles.sidebar}>
            <InsightsPanel />
          </aside>
        </div>

        {/* Full-width transactions */}
        <TransactionsSection />
      </main>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#080c13",
    color: "#c0ccd8",
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontSize: "14px",
    display: "flex",
    flexDirection: "column",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  middle: {
    display: "grid",
    gridTemplateColumns: "1fr 280px",
    borderBottom: "1px solid #1e2530",
  },
  charts: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1px",
    background: "#1e2530",
    borderRight: "1px solid #1e2530",
  },
  sidebar: {
    background: "#0f1520",
  },
};
