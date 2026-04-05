// src/data/mockData.js
// All static mock data for the dashboard

export const CATEGORIES = [
  "Housing", "Food & Dining", "Transport", "Healthcare",
  "Entertainment", "Shopping", "Utilities", "Education", "Savings", "Income"
];

export const CATEGORY_COLORS = {
  "Housing":       "#a3e635",
  "Food & Dining": "#34d399",
  "Transport":     "#38bdf8",
  "Healthcare":    "#f472b6",
  "Entertainment": "#fb923c",
  "Shopping":      "#a78bfa",
  "Utilities":     "#fbbf24",
  "Education":     "#6ee7b7",
  "Savings":       "#22d3ee",
  "Income":        "#4ade80",
};

export const MOCK_TRANSACTIONS = [
  { id: "t001", date: "2024-01-03", description: "Salary Deposit",         category: "Income",        type: "income",  amount: 85000 },
  { id: "t002", date: "2024-01-05", description: "Rent Payment",           category: "Housing",       type: "expense", amount: 22000 },
  { id: "t003", date: "2024-01-07", description: "Swiggy Order",           category: "Food & Dining", type: "expense", amount: 480  },
  { id: "t004", date: "2024-01-10", description: "Uber Ride",              category: "Transport",     type: "expense", amount: 320  },
  { id: "t005", date: "2024-01-12", description: "Netflix",                category: "Entertainment", type: "expense", amount: 649  },
  { id: "t006", date: "2024-01-14", description: "Big Basket Groceries",   category: "Food & Dining", type: "expense", amount: 3200 },
  { id: "t007", date: "2024-01-16", description: "Electricity Bill",       category: "Utilities",     type: "expense", amount: 1850 },
  { id: "t008", date: "2024-01-18", description: "Freelance Payment",      category: "Income",        type: "income",  amount: 18000 },
  { id: "t009", date: "2024-01-20", description: "Amazon Order",           category: "Shopping",      type: "expense", amount: 4200 },
  { id: "t010", date: "2024-01-22", description: "Doctor Visit",           category: "Healthcare",    type: "expense", amount: 800  },
  { id: "t011", date: "2024-01-25", description: "Mutual Fund SIP",        category: "Savings",       type: "expense", amount: 10000 },
  { id: "t012", date: "2024-01-28", description: "Zomato Dinner",          category: "Food & Dining", type: "expense", amount: 620  },
  { id: "t013", date: "2024-02-01", description: "Salary Deposit",         category: "Income",        type: "income",  amount: 85000 },
  { id: "t014", date: "2024-02-03", description: "Rent Payment",           category: "Housing",       type: "expense", amount: 22000 },
  { id: "t015", date: "2024-02-06", description: "Petrol Fill-up",         category: "Transport",     type: "expense", amount: 2400 },
  { id: "t016", date: "2024-02-08", description: "Udemy Course",           category: "Education",     type: "expense", amount: 1299 },
  { id: "t017", date: "2024-02-10", description: "Restaurant Lunch",       category: "Food & Dining", type: "expense", amount: 950  },
  { id: "t018", date: "2024-02-13", description: "Freelance Payment",      category: "Income",        type: "income",  amount: 22000 },
  { id: "t019", date: "2024-02-15", description: "Clothing Shopping",      category: "Shopping",      type: "expense", amount: 6800 },
  { id: "t020", date: "2024-02-18", description: "Water Bill",             category: "Utilities",     type: "expense", amount: 420  },
  { id: "t021", date: "2024-02-20", description: "Movie Tickets",          category: "Entertainment", type: "expense", amount: 880  },
  { id: "t022", date: "2024-02-22", description: "Mutual Fund SIP",        category: "Savings",       type: "expense", amount: 10000 },
  { id: "t023", date: "2024-02-24", description: "Pharmacy",               category: "Healthcare",    type: "expense", amount: 340  },
  { id: "t024", date: "2024-02-27", description: "Grocery Store",          category: "Food & Dining", type: "expense", amount: 2800 },
  { id: "t025", date: "2024-03-01", description: "Salary Deposit",         category: "Income",        type: "income",  amount: 85000 },
  { id: "t026", date: "2024-03-04", description: "Rent Payment",           category: "Housing",       type: "expense", amount: 22000 },
  { id: "t027", date: "2024-03-06", description: "Auto Rickshaw",          category: "Transport",     type: "expense", amount: 180  },
  { id: "t028", date: "2024-03-09", description: "Spotify Premium",        category: "Entertainment", type: "expense", amount: 119  },
  { id: "t029", date: "2024-03-11", description: "Freelance Payment",      category: "Income",        type: "income",  amount: 15000 },
  { id: "t030", date: "2024-03-14", description: "Zomato Groceries",       category: "Food & Dining", type: "expense", amount: 3100 },
  { id: "t031", date: "2024-03-17", description: "Internet Bill",          category: "Utilities",     type: "expense", amount: 999  },
  { id: "t032", date: "2024-03-20", description: "Book Purchase",          category: "Education",     type: "expense", amount: 450  },
  { id: "t033", date: "2024-03-22", description: "Mutual Fund SIP",        category: "Savings",       type: "expense", amount: 10000 },
  { id: "t034", date: "2024-03-25", description: "Dentist",                category: "Healthcare",    type: "expense", amount: 1200 },
  { id: "t035", date: "2024-03-28", description: "Flipkart Order",         category: "Shopping",      type: "expense", amount: 2600 },
];

// Aggregate monthly balance trend
export const MONTHLY_TREND = [
  { month: "Oct", balance: 142000, income: 95000, expenses: 58000 },
  { month: "Nov", balance: 158000, income: 98000, expenses: 52000 },
  { month: "Dec", balance: 139000, income: 85000, expenses: 71000 },
  { month: "Jan", balance: 162000, income: 103000, expenses: 54000 },
  { month: "Feb", balance: 178000, income: 107000, expenses: 61000 },
  { month: "Mar", balance: 195000, income: 100000, expenses: 56000 },
];

export const USER_PROFILES = {
  admin: { name: "Arjun Mehta", role: "admin",  avatar: "AM", email: "arjun@fintrack.io" },
  viewer:{ name: "Priya Nair",  role: "viewer", avatar: "PN", email: "priya@fintrack.io" },
};
