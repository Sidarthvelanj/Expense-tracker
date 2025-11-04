import React, { useState } from 'react';
import { useExpenseStore } from '../store/useExpenseStore.jsx';
import { Trash2, Pencil } from 'lucide-react';
import toast from 'react-hot-toast';
import emptyImage from '../assets/money.jpg';
import EditModal from './EditModal.jsx';

function ExpenseList({ expenses }) {
  const removeExpense = useExpenseStore(state => state.removeExpense);
  const [editing, setEditing] = useState(null);

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
      {expenses.length === 0 ? (
        <div className="flex flex-col items-center text-center py-8 text-gray-500 dark:text-gray-400">
          <img src={emptyImage} alt="Empty" className="w-32 mb-4" />
          <p className="text-sm sm:text-base">No expenses yet. Start tracking your spending!</p>
        </div>
      ) : (
        expenses.map(exp => (
          <div
            key={exp.id}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white/10 dark:bg-white/10 p-4 rounded-xl shadow-md hover:bg-white/20 transition"
          >
            <div className="mb-2 sm:mb-0">
              <span className="font-semibold text-gray-800 dark:text-white">{exp.label}</span>
              <span className="ml-2 text-gray-500 dark:text-gray-400">₹{exp.amount}</span>
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">[{exp.category}]</span>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setEditing(exp)}
                className="text-blue-500 hover:text-blue-600 p-2 rounded-full transition"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => {
                  removeExpense(exp.id);
                  toast('Expense deleted', { icon: '🗑️' });
                }}
                className="text-red-400 hover:text-red-500 p-2 rounded-full transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))
      )}
      {editing && (
        <EditModal
          isOpen={!!editing}
          onClose={() => setEditing(null)}
          expense={editing}
        />
      )}
    </div>
  );
}

export default ExpenseList;
