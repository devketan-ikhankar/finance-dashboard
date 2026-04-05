# FinTrack — Finance Dashboard

A frontend-only personal finance dashboard built with React, Recharts, and Lucide.

## Quick Start

```bash
npm install
npm start        # dev server at localhost:3000
npm run build    # production build → /build
```

## Design Decisions

**Framework: React 18** — chosen for ecosystem maturity, hooks-based DX, and Recharts integration.

**State: useReducer + Context API** — no Redux needed at this scope. All state lives in `AppContext`. Reducers are pure functions making logic easy to test. `useMemo` handles derived data (filtered list, summaries, insights) so components never compute on render.

**Aesthetic: Dark editorial terminal** — Space Mono for data/numbers (monospaced for alignment), IBM Plex Sans for UI copy. Acid-green (#a3e635) accent on black. Inspired by Bloomberg Terminal + Linear. Intentionally avoids purple-gradient AI clichés.

**Accessibility**
- All interactive elements have `aria-label`
- Sort buttons use `aria-sort`
- Modals use `role="dialog"` + `aria-modal`
- Empty states use `role="status"`
- Focus ring: `outline: 2px solid #a3e635`
- Color is never the *only* signal (icons + text back up color)

**localStorage persistence** — role and transaction list persist across refreshes. Mock data can be restored via Admin → Insights panel.

## Component Map

```
App
└── AppProvider (context, reducer, derived state)
    └── Dashboard (layout shell)
        ├── DashboardHeader       — brand, role toggle, user pill
        ├── SummaryCards          — balance / income / expenses / savings rate
        ├── TimeSeriesChart       — 6-month area chart (Recharts)
        ├── CategoryChart         — horizontal bar by spending category
        ├── InsightsPanel         — top category, MoM delta, admin actions
        └── TransactionsSection
            ├── FiltersBar        — search, category, type, date range, CSV export
            ├── TransactionsList  — sortable table, delete (admin)
            └── AddTransactionModal — form with validation (admin only)
```

## Data Flow

```
mockData.js → AppContext (useReducer)
                ├── filteredTransactions  (memoized)
                ├── summary              (memoized)
                ├── spendingByCategory   (memoized)
                └── insights             (memoized)
                    → Components (read-only via useApp())
                    → dispatch() for mutations
```

## Limitations

- No real backend / authentication
- localStorage has no encryption — not suitable for real financial data
- Charts use static 6-month trend data, not derived from transactions
- No pagination on transactions table (fine for demo scale, add for 500+ rows)
- Date filter uses string comparison (ISO 8601 — works correctly)

## Phased Roadmap

| Phase | Features |
|-------|---------|
| MVP ✓ | Static data, dashboard overview, filterable/sortable transactions, role toggle |
| Phase 2 | localStorage, CSV export ✓, animations (Framer Motion), chart polish |
| Phase 3 | MSW API mock, dark/light theme toggle, full a11y audit, pagination |
