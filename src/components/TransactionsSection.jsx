// src/components/TransactionsSection.jsx
import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { formatCurrency, formatDate, exportToCSV } from "../utils/format";
import { CATEGORIES, CATEGORY_COLORS } from "../data/mockData";

// ── FiltersBar ──────────────────────────────────────────────────
function FiltersBar() {
  const { state, dispatch, filteredTransactions, isAdmin } = useApp();
  const { filters } = state;
  const activeFilters = Object.values(filters).filter(v => v && v !== "All").length;

  return (
    <div style={styles.filtersBar} role="search" aria-label="Filter transactions">
      <input
        type="search"
        placeholder="Search transactions..."
        value={filters.search}
        onChange={e => dispatch({ type: "SET_FILTER", payload: { search: e.target.value } })}
        style={styles.searchInput}
        aria-label="Search by description"
      />

      <select
        value={filters.category}
        onChange={e => dispatch({ type: "SET_FILTER", payload: { category: e.target.value } })}
        style={styles.select}
        aria-label="Filter by category"
      >
        <option value="All">All Categories</option>
        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <select
        value={filters.type}
        onChange={e => dispatch({ type: "SET_FILTER", payload: { type: e.target.value } })}
        style={styles.select}
        aria-label="Filter by type"
      >
        <option value="All">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input
        type="date"
        value={filters.dateFrom}
        onChange={e => dispatch({ type: "SET_FILTER", payload: { dateFrom: e.target.value } })}
        style={styles.dateInput}
        aria-label="From date"
      />
      <span style={styles.dateSep}>→</span>
      <input
        type="date"
        value={filters.dateTo}
        onChange={e => dispatch({ type: "SET_FILTER", payload: { dateTo: e.target.value } })}
        style={styles.dateInput}
        aria-label="To date"
      />

      {activeFilters > 0 && (
        <button
          onClick={() => dispatch({ type: "RESET_FILTERS" })}
          style={styles.resetBtn}
          aria-label="Reset all filters"
        >
          ✕ {activeFilters} filter{activeFilters > 1 ? "s" : ""}
        </button>
      )}

      <div style={styles.spacer} />

      {/* Phase 2: CSV Export */}
      <button
        onClick={() => exportToCSV(filteredTransactions)}
        style={styles.exportBtn}
        aria-label="Export to CSV"
      >
        ↓ CSV
      </button>
    </div>
  );
}

// ── Add Transaction Modal (Admin only) ─────────────────────────
function AddTransactionModal({ onClose }) {
  const { dispatch } = useApp();
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    description: "",
    category: "Food & Dining",
    type: "expense",
    amount: "",
  });
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.description.trim()) return setError("Description is required.");
    const amt = parseFloat(form.amount);
    if (!amt || amt <= 0) return setError("Enter a valid positive amount.");
    dispatch({ type: "ADD_TRANSACTION", payload: { ...form, amount: amt } });
    onClose();
  }

  return (
    <div style={styles.modalOverlay} role="dialog" aria-modal="true" aria-label="Add transaction">
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <span style={styles.modalTitle}>+ New Transaction</span>
          <button onClick={onClose} style={styles.closeBtn} aria-label="Close">✕</button>
        </div>
        <form onSubmit={handleSubmit} style={styles.form} noValidate>
          {error && <div style={styles.formError} role="alert">{error}</div>}
          {[
            { label: "Date", field: "date", type: "date" },
            { label: "Description", field: "description", type: "text" },
          ].map(({ label, field, type }) => (
            <label key={field} style={styles.formLabel}>
              {label}
              <input
                type={type}
                value={form[field]}
                onChange={e => { setError(""); setForm(f => ({ ...f, [field]: e.target.value })); }}
                style={styles.formInput}
                required
              />
            </label>
          ))}
          <label style={styles.formLabel}>
            Category
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={styles.formInput}>
              {CATEGORIES.filter(c => c !== "Income").map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label style={styles.formLabel}>
            Type
            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} style={styles.formInput}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </label>
          <label style={styles.formLabel}>
            Amount (₹)
            <input type="number" min="1" value={form.amount} onChange={e => { setError(""); setForm(f => ({ ...f, amount: e.target.value })); }} style={styles.formInput} required />
          </label>
          <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
            <button type="submit" style={styles.submitBtn}>Save Transaction</button>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── TransactionsList ───────────────────────────────────────────
const SORT_FIELDS = ["date", "description", "category", "amount"];

export default function TransactionsSection() {
  const { filteredTransactions, dispatch, state, isAdmin } = useApp();
  const [showModal, setShowModal] = useState(false);
  const { sort } = state;

  function SortBtn({ field }) {
    const active = sort.field === field;
    return (
      <button
        onClick={() => dispatch({ type: "SET_SORT", payload: field })}
        style={{ ...styles.thBtn, ...(active ? styles.thBtnActive : {}) }}
        aria-label={`Sort by ${field}`}
        aria-sort={active ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}
      >
        {field.charAt(0).toUpperCase() + field.slice(1)}
        {active && <span style={styles.sortArrow}>{sort.dir === "asc" ? " ↑" : " ↓"}</span>}
      </button>
    );
  }

  return (
    <section aria-label="Transactions" style={styles.section}>
      <div style={styles.sectionHeader}>
        <span style={styles.sectionTitle}>
          Transactions
          <span style={styles.count}> {filteredTransactions.length}</span>
        </span>
        {isAdmin && (
          <button onClick={() => setShowModal(true)} style={styles.addBtn} aria-label="Add new transaction">
            + Add
          </button>
        )}
      </div>

      <FiltersBar />

      {filteredTransactions.length === 0 ? (
        <div style={styles.emptyState} role="status">
          <div style={styles.emptyIcon}>◌</div>
          <div>No transactions match your filters.</div>
          <button onClick={() => dispatch({ type: "RESET_FILTERS" })} style={styles.resetBtn2}>Clear filters</button>
        </div>
      ) : (
        <div style={styles.tableWrap}>
          <table style={styles.table} aria-label="Transactions table">
            <thead>
              <tr>
                {SORT_FIELDS.map(f => (
                  <th key={f} style={styles.th}><SortBtn field={f} /></th>
                ))}
                <th style={styles.th}><span style={styles.thLabel}>Type</span></th>
                {isAdmin && <th style={styles.th}><span style={styles.thLabel}>Actions</span></th>}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((t, i) => (
                <tr key={t.id} style={{ ...styles.tr, background: i % 2 === 0 ? "#0b0f17" : "#0f1520" }}>
                  <td style={styles.td}><span style={styles.date}>{formatDate(t.date)}</span></td>
                  <td style={styles.td}>{t.description}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.catBadge, background: (CATEGORY_COLORS[t.category] || "#4a5568") + "22", color: CATEGORY_COLORS[t.category] || "#4a5568" }}>
                      {t.category}
                    </span>
                  </td>
                  <td style={{ ...styles.td, textAlign: "right" }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", color: t.type === "income" ? "#34d399" : "#f472b6", fontWeight: 600, fontSize: "13px" }}>
                      {t.type === "income" ? "+" : "−"}{formatCurrency(t.amount)}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ ...styles.typeBadge, color: t.type === "income" ? "#34d399" : "#f472b6", background: t.type === "income" ? "#34d39922" : "#f472b622" }}>
                      {t.type}
                    </span>
                  </td>
                  {isAdmin && (
                    <td style={styles.td}>
                      <button
                        onClick={() => { if (window.confirm("Delete this transaction?")) dispatch({ type: "DELETE_TRANSACTION", payload: t.id }); }}
                        style={styles.deleteBtn}
                        aria-label={`Delete ${t.description}`}
                      >✕</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}
    </section>
  );
}

const styles = {
  section: { display: "flex", flexDirection: "column", gap: "0" },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 1.5rem",
    background: "#0f1520",
    borderBottom: "1px solid #1e2530",
    borderTop: "1px solid #1e2530",
  },
  sectionTitle: { fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#4a5568", textTransform: "uppercase", letterSpacing: "0.08em" },
  count: { color: "#a3e635" },
  addBtn: {
    padding: "6px 14px",
    background: "#a3e635",
    color: "#0b0f17",
    border: "none",
    fontSize: "11px",
    fontFamily: "'Space Mono', monospace",
    fontWeight: 700,
    cursor: "pointer",
    borderRadius: "4px",
    letterSpacing: "0.05em",
  },
  filtersBar: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 1.5rem",
    background: "#0b0f17",
    borderBottom: "1px solid #1e2530",
    flexWrap: "wrap",
  },
  searchInput: {
    flex: "1 1 200px",
    padding: "6px 10px",
    background: "#131a24",
    border: "1px solid #1e2530",
    color: "#e2e8f0",
    fontSize: "12px",
    borderRadius: "4px",
    fontFamily: "'Space Mono', monospace",
    minWidth: "140px",
  },
  select: {
    padding: "6px 10px",
    background: "#131a24",
    border: "1px solid #1e2530",
    color: "#e2e8f0",
    fontSize: "12px",
    borderRadius: "4px",
    fontFamily: "'Space Mono', monospace",
    cursor: "pointer",
  },
  dateInput: {
    padding: "6px 8px",
    background: "#131a24",
    border: "1px solid #1e2530",
    color: "#e2e8f0",
    fontSize: "11px",
    borderRadius: "4px",
    fontFamily: "'Space Mono', monospace",
  },
  dateSep: { color: "#4a5568", fontSize: "12px" },
  resetBtn: {
    padding: "6px 10px",
    background: "transparent",
    border: "1px solid #f472b622",
    color: "#f472b6",
    fontSize: "11px",
    fontFamily: "'Space Mono', monospace",
    cursor: "pointer",
    borderRadius: "4px",
    whiteSpace: "nowrap",
  },
  exportBtn: {
    padding: "6px 10px",
    background: "transparent",
    border: "1px solid #1e2530",
    color: "#4a5568",
    fontSize: "11px",
    fontFamily: "'Space Mono', monospace",
    cursor: "pointer",
    borderRadius: "4px",
  },
  spacer: { flex: 1 },
  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th: { textAlign: "left", padding: "0", borderBottom: "1px solid #1e2530" },
  thBtn: {
    padding: "10px 16px",
    width: "100%",
    textAlign: "left",
    background: "transparent",
    border: "none",
    color: "#4a5568",
    fontSize: "11px",
    fontFamily: "'Space Mono', monospace",
    cursor: "pointer",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
  thBtnActive: { color: "#a3e635" },
  thLabel: { padding: "10px 16px", display: "block", fontSize: "11px", fontFamily: "'Space Mono', monospace", color: "#4a5568", textTransform: "uppercase", letterSpacing: "0.05em" },
  sortArrow: { color: "#a3e635" },
  tr: { transition: "background 0.1s" },
  td: { padding: "10px 16px", color: "#c0ccd8", verticalAlign: "middle", borderBottom: "1px solid #1e252880", whiteSpace: "nowrap" },
  date: { fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#4a5568" },
  catBadge: { padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontFamily: "'Space Mono', monospace", whiteSpace: "nowrap" },
  typeBadge: { padding: "2px 8px", borderRadius: "4px", fontSize: "10px", fontFamily: "'Space Mono', monospace", textTransform: "uppercase", letterSpacing: "0.05em" },
  deleteBtn: {
    padding: "3px 8px",
    background: "transparent",
    border: "1px solid #f472b633",
    color: "#f472b6",
    fontSize: "11px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    padding: "4rem 2rem",
    color: "#4a5568",
    fontSize: "13px",
    background: "#0b0f17",
    fontFamily: "'Space Mono', monospace",
  },
  emptyIcon: { fontSize: "40px", color: "#1e2530" },
  resetBtn2: {
    padding: "8px 16px",
    background: "transparent",
    border: "1px solid #1e2530",
    color: "#a3e635",
    fontSize: "11px",
    fontFamily: "'Space Mono', monospace",
    cursor: "pointer",
    borderRadius: "4px",
    letterSpacing: "0.05em",
  },
  // Modal
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 200,
  },
  modal: {
    background: "#0f1520",
    border: "1px solid #1e2530",
    borderRadius: "8px",
    padding: "1.5rem",
    width: "360px",
    maxWidth: "90vw",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  modalTitle: { fontFamily: "'Space Mono', monospace", fontSize: "13px", color: "#a3e635", letterSpacing: "0.05em" },
  closeBtn: { background: "transparent", border: "none", color: "#4a5568", cursor: "pointer", fontSize: "14px" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  formError: { padding: "8px 12px", background: "#f472b622", border: "1px solid #f472b644", borderRadius: "4px", color: "#f472b6", fontSize: "12px" },
  formLabel: { display: "flex", flexDirection: "column", gap: "4px", fontSize: "11px", color: "#4a5568", fontFamily: "'Space Mono', monospace", textTransform: "uppercase", letterSpacing: "0.05em" },
  formInput: { padding: "8px 10px", background: "#131a24", border: "1px solid #1e2530", color: "#e2e8f0", fontSize: "13px", borderRadius: "4px", fontFamily: "inherit", marginTop: "2px" },
  submitBtn: { flex: 1, padding: "9px", background: "#a3e635", color: "#0b0f17", border: "none", fontFamily: "'Space Mono', monospace", fontSize: "12px", fontWeight: 700, cursor: "pointer", borderRadius: "4px", letterSpacing: "0.05em" },
  cancelBtn: { flex: 1, padding: "9px", background: "transparent", color: "#4a5568", border: "1px solid #1e2530", fontFamily: "'Space Mono', monospace", fontSize: "12px", cursor: "pointer", borderRadius: "4px" },
};
