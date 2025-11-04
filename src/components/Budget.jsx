import React, { useState, useEffect } from 'react';
import { useExpenseStore } from '../store/useExpenseStore.jsx';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

function Budget() {
  const expenses = useExpenseStore((state) => state.expenses);
  const [month, setMonth] = useState(dayjs().format('YYYY-MM'));
  const [budget, setBudget] = useState(50000);
  const [categoryBudgets, setCategoryBudgets] = useState({
    Food: 5000,
    Travel: 10000,
    Shopping: 15000,
  });

  const filtered = expenses.filter((e) =>
    dayjs(e.date).format('YYYY-MM') === month
  );

  const total = filtered.reduce((sum, e) => sum + e.amount, 0);

  const categoryTotals = {};
  filtered.forEach((e) => {
    const cat = e.category || 'Uncategorized';
    categoryTotals[cat] = (categoryTotals[cat] || 0) + e.amount;
  });

  useEffect(() => {
    if (total > budget) {
      toast.error('🚨 Monthly budget exceeded!');
    } else if (total > budget * 0.8) {
      toast('⚠️ You’re nearing your monthly budget');
    }

    Object.entries(categoryTotals).forEach(([cat, amt]) => {
      const limit = categoryBudgets[cat];
      if (limit && amt > limit) {
        toast.error(`🚨 ${cat} budget exceeded!`);
      } else if (limit && amt > limit * 0.8) {
        toast(`⚠️ ${cat} budget nearing limit`);
      }
    });
  }, [total, categoryTotals]);

  if (filtered.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-white dark:bg-[#2a2a3c] rounded-xl shadow-lg p-6 mt-6 text-left backdrop-blur-md space-y-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Budget Overview</h2>

        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Monthly Budget</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full p-3 rounded-md bg-white/10 dark:bg-white/10 text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark"
          />
        </div>

        <div className="space-y-4">
          {Object.entries(categoryBudgets).map(([cat, limit]) => {
            const spent = categoryTotals[cat] || 0;
            const percent = Math.min((spent / limit) * 100, 100);
            const barColor =
              percent > 100 ? 'bg-red-500' : percent > 80 ? 'bg-yellow-400' : 'bg-green-500';

            return (
              <div key={cat}>
                <div className="flex justify-between mb-1 text-sm sm:text-base">
                  <span className="font-medium text-gray-700 dark:text-gray-200">{cat}</span>
                  <span className="text-gray-600 dark:text-gray-300">
                    ₹{spent} / ₹{limit}
                  </span>
                </div>
                <div className="w-full h-3 bg-muted-light/30 dark:bg-muted-dark/30 rounded-full">
                  <div
                    className={`h-3 rounded-full ${barColor}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default Budget;
