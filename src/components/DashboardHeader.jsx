// src/components/DashboardHeader.jsx
import React from "react";
import { useApp } from "../context/AppContext";

export default function DashboardHeader() {
  const { currentUser, isAdmin, dispatch, state } = useApp();

  return (
    <header style={styles.header}>
      <div style={styles.brand}>
        <span style={styles.logo}>▣</span>
        <span style={styles.brandName}>FinTrack</span>
        <span style={styles.tagline}>/ Personal Finance</span>
      </div>

      <div style={styles.right}>
        {/* Role Toggle */}
        <div style={styles.roleToggle} role="group" aria-label="Switch role">
          {["viewer", "admin"].map(r => (
            <button
              key={r}
              onClick={() => dispatch({ type: "SET_ROLE", payload: r })}
              style={{
                ...styles.roleBtn,
                ...(state.role === r ? styles.roleBtnActive : {}),
              }}
              aria-pressed={state.role === r}
            >
              {r === "admin" ? "⬛ Admin" : "◻ Viewer"}
            </button>
          ))}
        </div>

        {/* User Pill */}
        <div style={styles.userPill} aria-label={`Logged in as ${currentUser.name}`}>
          <div style={styles.avatar}>{currentUser.avatar}</div>
          <div style={styles.userInfo}>
            <span style={styles.userName}>{currentUser.name}</span>
            <span style={styles.userRole}>{isAdmin ? "Administrator" : "Read-only"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 2rem",
    height: "60px",
    borderBottom: "1px solid #1e2530",
    background: "#0b0f17",
    position: "sticky",
    top: 0,
    zIndex: 100,
    flexShrink: 0,
  },
  brand: { display: "flex", alignItems: "center", gap: "8px" },
  logo: { fontSize: "18px", color: "#a3e635" },
  brandName: { fontFamily: "'Space Mono', monospace", fontSize: "15px", fontWeight: 700, color: "#f0f4f8", letterSpacing: "0.05em" },
  tagline: { fontSize: "12px", color: "#4a5568", fontFamily: "'Space Mono', monospace" },
  right: { display: "flex", alignItems: "center", gap: "16px" },
  roleToggle: {
    display: "flex",
    background: "#131a24",
    border: "1px solid #1e2530",
    borderRadius: "6px",
    overflow: "hidden",
  },
  roleBtn: {
    padding: "6px 14px",
    fontSize: "11px",
    fontFamily: "'Space Mono', monospace",
    color: "#4a5568",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    letterSpacing: "0.05em",
    transition: "all 0.15s",
  },
  roleBtnActive: {
    background: "#a3e635",
    color: "#0b0f17",
    fontWeight: 700,
  },
  userPill: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "6px 12px",
    background: "#131a24",
    border: "1px solid #1e2530",
    borderRadius: "6px",
  },
  avatar: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "#a3e635",
    color: "#0b0f17",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: 700,
    fontFamily: "'Space Mono', monospace",
    flexShrink: 0,
  },
  userInfo: { display: "flex", flexDirection: "column" },
  userName: { fontSize: "12px", fontWeight: 600, color: "#e2e8f0", lineHeight: 1.2 },
  userRole: { fontSize: "10px", color: "#4a5568", fontFamily: "'Space Mono', monospace" },
};
