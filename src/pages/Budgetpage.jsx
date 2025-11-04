import React from 'react';
import Budget from '../components/Budget.jsx';
import { motion } from 'framer-motion';

function Budgetpage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <Budget />
    </motion.div>
  );
}

export default Budgetpage;
