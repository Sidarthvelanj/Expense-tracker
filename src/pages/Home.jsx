import React from 'react';
import { useExpenseStore } from '../store/useExpenseStore.jsx';
import { motion } from 'framer-motion';

function Home() {
  const expenses = useExpenseStore((state) => state.expenses);
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const count = expenses.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg p-6 sm:p-8 text-center space-y-4 backdrop-blur-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
          Welcome to Expense Tracker
        </h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          Track your spending and manage your budget with ease.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="bg-white dark:bg-white/10 p-4 rounded-xl shadow-md">
            <h2 className="text-base sm:text-xl font-semibold text-gray-800 dark:text-white">
              Total Expenses
            </h2>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              ₹{total}
            </p>
          </div>
          <div className="bg-white dark:bg-white/10 p-4 rounded-xl shadow-md">
            <h2 className="text-base sm:text-xl font-semibold text-gray-800 dark:text-white">
              Entries
            </h2>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {count}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Home;