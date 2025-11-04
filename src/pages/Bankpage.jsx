import React from 'react';
import { useExpenseStore } from '../store/useExpenseStore.jsx';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function Bankpage() {
  const addExpense = useExpenseStore(state => state.addExpense);

  const mockBankData = [
    { label: 'Uber Ride', amount: 320, category: 'Travel', date: '2025-11-01' },
    { label: 'Swiggy Order', amount: 450, category: 'Food', date: '2025-11-02' },
    { label: 'Amazon TV', amount: 48000, category: 'Shopping', date: '2025-11-03' },
  ];

  const handleSync = () => {
    mockBankData.forEach(tx => addExpense(tx));
    toast.success('✅ Synced 3 transactions from bank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-white dark:bg-[#2a2a3c] rounded-xl shadow-lg p-6 mt-6 backdrop-blur-md text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Bank Sync</h2>
        <button
          onClick={handleSync}
          className="px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
        >
          Sync Bank Transactions
        </button>
      </div>
    </motion.div>
  );
}

export default Bankpage;
