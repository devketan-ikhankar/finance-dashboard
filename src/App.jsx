// src/App.jsx
import React from "react";
import { AppProvider } from "./context/AppContext";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
}
