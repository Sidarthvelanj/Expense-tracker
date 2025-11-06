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
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
        <Recurring />
      </div>
    </motion.div>
  );
}

export default Recurringpage;