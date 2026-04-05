// src/utils/format.js

export function formatCurrency(amount, compact = false) {
  if (compact && amount >= 100000) return "₹" + (amount / 100000).toFixed(1) + "L";
  if (compact && amount >= 1000)   return "₹" + (amount / 1000).toFixed(1) + "K";
  return "₹" + amount.toLocaleString("en-IN");
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export function exportToCSV(transactions) {
  const header = ["Date", "Description", "Category", "Type", "Amount"];
  const rows = transactions.map(t => [
    t.date, `"${t.description}"`, t.category, t.type, t.amount
  ]);
  const csv = [header, ...rows].map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "transactions.csv"; a.click();
  URL.revokeObjectURL(url);
}
