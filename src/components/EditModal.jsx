import React, { useState } from 'react';
import Modal from 'react-modal';
import { useExpenseStore } from '../store/useExpenseStore.jsx';
import toast from 'react-hot-toast';

Modal.setAppElement('#root');

function EditModal({ isOpen, onClose, expense }) {
  const updateExpense = useExpenseStore(state => state.updateExpense);
  const [label, setLabel] = useState(expense.label);
  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);

  const handleUpdate = () => {
    updateExpense({ ...expense, label, amount, category });
    toast.success('Expense updated!');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white dark:bg-[#2a2a3c] p-6 rounded-xl shadow-xl w-full max-w-sm sm:max-w-md mx-auto mt-24 outline-none"
      overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start px-4"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Edit Expense</h2>

      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Label"
        className="w-full mb-3 p-3 rounded-md bg-white/10 dark:bg-white/10 text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark"
      />

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="w-full mb-3 p-3 rounded-md bg-white/10 dark:bg-white/10 text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full mb-4 p-3 rounded-md bg-white/10 dark:bg-white/10 text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark"
      >
        <option>General</option>
        <option>Food</option>
        <option>Travel</option>
        <option>Bills</option>
        <option>Shopping</option>
      </select>

      <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-600 text-black dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Update
        </button>
      </div>
    </Modal>
  );
}

export default EditModal;
