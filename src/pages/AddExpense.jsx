import React from 'react';
import ExpenseForm from '../components/ExpenseForm.jsx';

function AddExpense() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white dark:bg-[#2a2a3c] backdrop-blur-md rounded-xl shadow-lg p-6 sm:p-8 text-center">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
          Add Expense
        </h1>
        <ExpenseForm />
      </div>
    </div>
  );
}

export default AddExpense;