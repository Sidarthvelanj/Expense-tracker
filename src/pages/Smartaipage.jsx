import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Smartaipage() {
  const [label, setLabel] = useState('');
  const [suggestedCategory, setSuggestedCategory] = useState('');

  const keywordMap = {
    swiggy: 'Food',
    zomato: 'Food',
    mcdonalds: 'Food',
    kfc: 'Food',
    dominos: 'Food',
    starbucks: 'Food',
    pizza: 'Food',
    burger: 'Food',
    cafe: 'Food',
    restaurant: 'Food',
    groceries: 'Food',
    blinkit: 'Food',
    uber: 'Travel',
    ola: 'Travel',
    flight: 'Travel',
    train: 'Travel',
    bus: 'Travel',
    amazon: 'Shopping',
    flipkart: 'Shopping',
    myntra: 'Shopping',
    netflix: 'Entertainment',
    prime: 'Entertainment',
    hotstar: 'Entertainment',
    youtube: 'Entertainment',
    spotify: 'Entertainment',
    electricity: 'Utilities',
    water: 'Utilities',
    gas: 'Utilities',
    rent: 'Housing',
    emi: 'Finance',
    doctor: 'Health',
    hospital: 'Health',
    medicine: 'Health',
    udemy: 'Education',
    coursera: 'Education',
    tax: 'Finance',
    donation: 'Other',
    gift: 'Other',
  };

  useEffect(() => {
    const lower = label.toLowerCase();
    const match = Object.keys(keywordMap).find((key) => lower.includes(key));
    setSuggestedCategory(match ? keywordMap[match] : '');
  }, [label]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white dark:bg-[#2a2a3c] rounded-xl shadow-md p-6 sm:p-8 space-y-4 backdrop-blur-md">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
          Smart Category Suggestion
        </h2>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Enter expense label..."
          className="w-full p-3 rounded-md bg-white/10 dark:bg-white/10 text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 text-sm sm:text-base"
        />
        {suggestedCategory ? (
          <p className="text-green-600 dark:text-green-400 font-medium text-sm sm:text-base">
            Suggested Category: {suggestedCategory}
          </p>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Try typing something like “Netflix”, “Uber”, “Swiggy”, “Rent”, “Amazon”, “Gym”...
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default Smartaipage;