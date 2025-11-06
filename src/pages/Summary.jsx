import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useExpenseStore } from '../store/useExpenseStore.jsx';
import Chart from '../components/Chart.jsx';
import ExportCSV from '../components/ExportCSV.jsx';
import ExpenseList from '../components/ExpenseList.jsx';
import { toast } from 'react-toastify';

function Summary() {
  const expenses = useExpenseStore(state => state.expenses);
  const clearExpenses = useExpenseStore(state => state.clearExpenses);
  const undoClearExpenses = useExpenseStore(state => state.undoClearExpenses);
  const [month, setMonth] = useState(dayjs().format('YYYY-MM'));
  const [showClearedToast, setShowClearedToast] = useState(false);

  const filteredExpenses = expenses.filter(e =>
    e.date && e.date.startsWith(month)
  );

  let totalExpenses = 0;
  let hasOverflow = false;

  try {
    totalExpenses = filteredExpenses.reduce((sum, e) => {
      if (typeof e.amount !== 'number' || e.amount > 999999999) {
        hasOverflow = true;
        throw new Error('Invalid amount');
      }
      return sum + e.amount;
    }, 0);
  } catch (err) {
    console.error('Summary calculation error:', err);
  }

  const formatCurrency = (value) => {
    if (hasOverflow || value > 999999999) return '₹∞';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleClear = () => {
    clearExpenses();
    setShowClearedToast(true);
    toast.info('History cleared');
  };

  const handleUndo = () => {
    undoClearExpenses();
    toast.success('History restored');
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-[#0f0f1a] py-10 font-sans transition-all duration-300 flex justify-center items-start px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1100px] space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white tracking-tight">
            Monthly Summary
          </h1>
          <MonthSelector selectedMonth={month} setSelectedMonth={setMonth} />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SummaryCard
            title="Total Spent"
            value={hasOverflow ? '₹∞ (overflow)' : formatCurrency(totalExpenses)}
            color="red"
          />
          <SummaryCard
            title="Total Entries"
            value={filteredExpenses.length}
            color="blue"
          />
          <div className="bg-white dark:bg-[#1f1f2e] rounded-xl p-6 shadow-lg flex flex-col justify-between">
            <h3 className="text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-300 mb-4">
              Export Your Expenses
            </h3>
            <ExportCSV data={filteredExpenses} />
          </div>
        </div>

        {/* Clear & Undo Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={handleClear}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Clear History
          </button>
          <button
            onClick={handleUndo}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Undo
          </button>
        </div>

        {/* Chart */}
        <div className="bg-white dark:bg-[#1f1f2e] rounded-xl p-6 shadow-lg h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center overflow-hidden">
          {hasOverflow ? (
            <p className="text-red-500 text-center font-semibold">
              Chart unavailable due to invalid data.
            </p>
          ) : (
            <Chart expenses={filteredExpenses} />
          )}
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
      <h3 className="text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
        {title}
      </h3>
      <p className={`text-2xl sm:text-3xl font-bold ${colorMap[color] || 'text-gray-800'} dark:text-white`}>
        {value}
      </p>
    </div>
  );
}

function MonthSelector({ selectedMonth, setSelectedMonth }) {
  const [open, setOpen] = useState(false);
  const months = Array.from({ length: 12 }, (_, i) =>
    dayjs().month(i).format('MMMM')
  );

  const handleSelect = (monthIndex) => {
    const newDate = dayjs(selectedMonth).month(monthIndex).format('YYYY-MM');
    setSelectedMonth(newDate);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="bg-white dark:bg-[#1f1f2e] text-gray-800 dark:text-white px-4 py-2 rounded-lg shadow-sm border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {dayjs(selectedMonth).format('MMMM, YYYY')}
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-full bg-white dark:bg-[#2a2a3c] border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
          {months.map((monthName, index) => (
            <button
              key={monthName}
              onClick={() => handleSelect(index)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3a3a4c] text-gray-700 dark:text-gray-200"
            >
              {monthName}, {dayjs(selectedMonth).format('YYYY')}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;