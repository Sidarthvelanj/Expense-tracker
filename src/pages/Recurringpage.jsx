import React from 'react';
import Recurring from '../components/Recurring.jsx';
import { motion } from 'framer-motion';

function Recurringpage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <Recurring />
    </motion.div>
  );
}

export default Recurringpage;
