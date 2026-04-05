// src/context/AppContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { MOCK_TRANSACTIONS, USER_PROFILES } from "../data/mockData";

const AppContext = createContext(null);

const initialState = {
  transactions: MOCK_TRANSACTIONS,
  role: "viewer",               // "viewer" | "admin"
  filters: {
    search: "",
    category: "All",
    type: "All",                // "All" | "income" | "expense"
    dateFrom: "",
    dateTo: "",
  },
  sort: { field: "date", dir: "desc" },
  selectedMonth: "All",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ROLE":
      return { ...state, role: action.payload };

    case "SET_FILTER":
      return { ...state, filters: { ...state.filters, ...action.payload } };

    case "RESET_FILTERS":
      return { ...state, filters: initialState.filters };

    case "SET_SORT":
      return {
        ...state,
        sort: state.sort.field === action.payload
          ? { field: action.payload, dir: state.sort.dir === "asc" ? "desc" : "asc" }
          : { field: action.payload, dir: "asc" },
      };

    case "ADD_TRANSACTION":
      const newTxn = { ...action.payload, id: "t" + Date.now() };
      return { ...state, transactions: [newTxn, ...state.transactions] };

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };

    case "SET_SELECTED_MONTH":
      return { ...state, selectedMonth: action.payload };

    case "HYDRATE":
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Phase 2: localStorage persistence
  useEffect(() => {
    try {
      const saved = localStorage.getItem("finDashState");
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: "HYDRATE", payload: { role: parsed.role, transactions: parsed.transactions } });
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("finDashState", JSON.stringify({
        role: state.role,
        transactions: state.transactions,
      }));
    } catch (_) {}
  }, [state.role, state.transactions]);

  // Derived: filtered + sorted transactions
  const filteredTransactions = React.useMemo(() => {
    let txns = [...state.transactions];
    const { search, category, type, dateFrom, dateTo } = state.filters;

    if (search)    txns = txns.filter(t => t.description.toLowerCase().includes(search.toLowerCase()));
    if (category !== "All") txns = txns.filter(t => t.category === category);
    if (type !== "All")     txns = txns.filter(t => t.type === type);
    if (dateFrom)  txns = txns.filter(t => t.date >= dateFrom);
    if (dateTo)    txns = txns.filter(t => t.date <= dateTo);

    const { field, dir } = state.sort;
    txns.sort((a, b) => {
      let va = a[field], vb = b[field];
      if (field === "amount" || field === "date") { va = field === "amount" ? +va : va; vb = field === "amount" ? +vb : vb; }
      if (va < vb) return dir === "asc" ? -1 : 1;
      if (va > vb) return dir === "asc" ? 1 : -1;
      return 0;
    });
    return txns;
  }, [state.transactions, state.filters, state.sort]);

  // Derived: summary
  const summary = React.useMemo(() => {
    const income   = state.transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expenses = state.transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return { income, expenses, balance: income - expenses };
  }, [state.transactions]);

  // Derived: spending by category
  const spendingByCategory = React.useMemo(() => {
    const map = {};
    state.transactions.filter(t => t.type === "expense").forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [state.transactions]);

  // Derived: insights
  const insights = React.useMemo(() => {
    const topCategory = spendingByCategory[0] || null;
    const lastMonth = state.transactions.filter(t => t.date.startsWith("2024-02") && t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);
    const thisMonth = state.transactions.filter(t => t.date.startsWith("2024-03") && t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);
    const monthDelta = thisMonth - lastMonth;
    return { topCategory, thisMonth, lastMonth, monthDelta };
  }, [spendingByCategory, state.transactions]);

  const currentUser = USER_PROFILES[state.role];

  return (
    <AppContext.Provider value={{
      state, dispatch,
      filteredTransactions, summary, spendingByCategory, insights,
      currentUser, isAdmin: state.role === "admin",
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
