import React from 'react';
import Chart from '../components/Chart.jsx';
import { useExpenseStore } from '../store/useExpenseStore.jsx';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

function Analyticspage() {
  const expenses = useExpenseStore(state => state.expenses);
  const currentMonth = dayjs().format('YYYY-MM');
  const filtered = expenses.filter((e) =>
    dayjs(e.date).format('YYYY-MM') === currentMonth
  );

  const categoryTotals = filtered.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex justify-center items-start px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="w-full max-w-6xl bg-white dark:bg-[#2a2a3c] rounded-xl shadow-lg p-6 sm:p-8 backdrop-blur-md space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white text-center">
          Category Analytics
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
          {/* Chart Section */}
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <div className="w-full max-w-[700px] h-[320px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] bg-white dark:bg-[#1f1f2e] rounded-xl shadow-xl p-6 sm:p-8 backdrop-blur-md">
              <Chart expenses={filtered} />
            </div>
          </div>

          {/* Indicators Section */}
          <div className="w-full lg:w-[300px] space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-white">
              Indicators
            </h3>
            {Object.keys(categoryTotals).length > 0 ? (
              <ul className="space-y-2">
                {Object.entries(categoryTotals).map(([category, total]) => (
                  <li
                    key={category}
                    className="flex justify-between text-gray-600 dark:text-gray-300 text-sm sm:text-base"
                  >
                    <span>{category}</span>
                    <span>₹{total}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No data for this month.
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Analyticspage;