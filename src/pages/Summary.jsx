import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useExpenseStore } from '../store/useExpenseStore.jsx';
import Chart from '../components/Chart.jsx';
import ExportCSV from '../components/ExportCSV.jsx';
import ExpenseList from '../components/ExpenseList.jsx';

function Summary() {
  const expenses = useExpenseStore(state => state.expenses);
  const [month, setMonth] = useState(dayjs().format('YYYY-MM'));

  const filteredExpenses = expenses.filter(e =>
    e.date && e.date.startsWith(month)
  );

  const totalExpenses = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-[#0f0f1a] py-10 font-sans transition-all duration-300 flex justify-center items-center">
      <div className="w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white tracking-tight">
            Monthly Summary
          </h1>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="mt-4 md:mt-0 bg-white dark:bg-[#1f1f2e] text-gray-700 dark:text-gray-200 rounded-lg px-4 py-2 shadow-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <SummaryCard title="Total Spent" value={`₹${totalExpenses.toFixed(2)}`} color="red" />
          <SummaryCard title="Total Entries" value={filteredExpenses.length} color="blue" />
          <div className="bg-white dark:bg-[#1f1f2e] rounded-xl p-6 shadow-lg flex flex-col justify-between">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-4">Export Your Expenses</h3>
            <ExportCSV data={filteredExpenses} />
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white dark:bg-[#1f1f2e] rounded-xl p-6 shadow-lg mb-10 h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center overflow-hidden">
          <Chart expenses={filteredExpenses} />
        </div>

        {/* Expense List */}
        <ExpenseList expenses={filteredExpenses} />
      </div>
    </div>
  );
}

function SummaryCard({ title, value, color }) {
  const colorMap = {
    red: 'text-red-500',
    blue: 'text-blue-500',
    green: 'text-green-500',
  };

  return (
    <div className="bg-white dark:bg-[#1f1f2e] rounded-xl p-6 shadow-lg flex flex-col justify-between">
      <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">{title}</h3>
      <p className={`text-3xl font-bold ${colorMap[color] || 'text-gray-800'} dark:text-white`}>
        {value}
      </p>
    </div>
  );
}

export default Summary;
