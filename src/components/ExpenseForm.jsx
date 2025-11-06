import React, { useState } from 'react';
import { useExpenseStore } from '../store/useExpenseStore.jsx';
import toast from 'react-hot-toast';

function ExpenseForm() {
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('General');
  const addExpense = useExpenseStore(state => state.addExpense);

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);

    if (!label || !amount) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (isNaN(parsedAmount) || parsedAmount <= 0 || parsedAmount > 999999999) {
      toast.error('Amount must be between ₹1 and ₹999,999,999.');
      return;
    }

    addExpense({
      id: Date.now(),
      label,
      amount: parsedAmount,
      category,
      date: new Date().toISOString(),
    });

    toast.success('Expense added!');
    setLabel('');
    setAmount('');
    setCategory('General');
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white dark:bg-[#2a2a3c] p-6 rounded-xl shadow-lg backdrop-blur-md"
      >
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Add New Expense</h2>

        <input
          type="text"
          placeholder="Expense label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="p-3 rounded-md bg-white/10 dark:bg-white/10 text-black dark:text-white placeholder:text-muted dark:placeholder:text-[#a0a0b2] border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          max={999999999}
          className="p-3 rounded-md bg-white/10 dark:bg-white/10 text-black dark:text-white placeholder:text-muted dark:placeholder:text-[#a0a0b2] border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 rounded-md bg-surface-light dark:bg-surface-dark text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark"
        >
          <option>General</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Bills</option>
          <option>Shopping</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;