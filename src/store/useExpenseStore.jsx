import { create } from 'zustand';

const getInitialExpenses = () => {
  const stored = localStorage.getItem('expenses');
  return stored ? JSON.parse(stored) : [];
};

const getInitialTheme = () => {
  return localStorage.getItem('theme') || 'dark';
};

export const useExpenseStore = create((set, get) => ({
  expenses: getInitialExpenses(),
  theme: getInitialTheme(),
  navbarCollapsed: false,

  addExpense: (expense) => {
    const newExpense = { ...expense, id: crypto.randomUUID() };
    const updated = [...get().expenses, newExpense];
    localStorage.setItem('expenses', JSON.stringify(updated));
    set({ expenses: updated });
  },

  removeExpense: (id) => {
    const updated = get().expenses.filter((e) => e.id !== id);
    localStorage.setItem('expenses', JSON.stringify(updated));
    set({ expenses: updated });
  },

  updateExpense: (updatedExpense) => {
    const updated = get().expenses.map((e) =>
      e.id === updatedExpense.id ? { ...e, ...updatedExpense } : e
    );
    localStorage.setItem('expenses', JSON.stringify(updated));
    set({ expenses: updated });
  },

  toggleTheme: () => {
    const newTheme = get().theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    set({ theme: newTheme });
  },

  toggleNavbar: () => {
    const newState = !get().navbarCollapsed;
    set({ navbarCollapsed: newState });
  },
}));
