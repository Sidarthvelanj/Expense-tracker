import React, { useState, useEffect } from 'react';
import { useExpenseStore } from '../store/useExpenseStore.jsx';
import dayjs from 'dayjs';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

function Recurring() {
  const addExpense = useExpenseStore((state) => state.addExpense);
  const [recurring, setRecurring] = useState([
    { label: 'Rent', amount: 15000, category: 'Housing', frequency: 'monthly' },
    { label: 'Netflix', amount: 499, category: 'Entertainment', frequency: 'monthly' },
  ]);

  const currentMonth = dayjs().format('YYYY-MM');

  useEffect(() => {
    const alreadyLogged = localStorage.getItem(`recurringLogged-${currentMonth}`);
    if (alreadyLogged) return;

    recurring.forEach((item) => {
      addExpense({
        label: item.label,
        amount: item.amount,
        category: item.category,
        date: dayjs().format('YYYY-MM-DD'),
      });
    });

    localStorage.setItem(`recurringLogged-${currentMonth}`, 'true');
    toast.success('📅 Recurring expenses logged for this month');
  }, [currentMonth, recurring, addExpense]);

  const handleDelete = (index) => {
    const updated = [...recurring];
    updated.splice(index, 1);
    setRecurring(updated);
    toast('🗑️ Recurring item removed');
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-[#2a2a3c] rounded-xl shadow-lg p-6 mt-6 text-left backdrop-blur-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Recurring Expenses</h2>
        <ul className="space-y-3 mb-4">
          {recurring.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white/10 dark:bg-white/10 p-3 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-800 dark:text-white">{item.label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  ₹{item.amount} • {item.category}
                </p>
              </div>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:text-red-700 p-2 rounded-full transition"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() =>
            setRecurring([
              ...recurring,
              { label: 'New Item', amount: 1000, category: 'Misc', frequency: 'monthly' },
            ])
          }
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
        >
          <Plus size={18} />
          Add Recurring
        </button>
      </div>
    </div>
  );
}

export default Recurring;
