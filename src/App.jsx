import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import AddExpense from './pages/AddExpense.jsx';
import Summary from './pages/Summary.jsx';
import Budgetpage from './pages/Budgetpage.jsx';
import Recurringpage from './pages/Recurringpage.jsx';
import Analyticspage from './pages/Analyticspage.jsx';
import Bankpage from './pages/Bankpage.jsx';
import Smartaipage from './pages/Smartaipage.jsx';

import { useExpenseStore } from './store/useExpenseStore.jsx';

function App() {
  const theme = useExpenseStore(state => state.theme);
  const navbarCollapsed = useExpenseStore(state => state.navbarCollapsed);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind's sm breakpoint
    };

    handleResize(); // initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [theme]);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark font-inter transition-all duration-300">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main
        className={`transition-all duration-300 pt-16 sm:pt-0 ${
          isMobile ? 'px-4' : navbarCollapsed ? 'sm:ml-20 px-6' : 'sm:ml-64 px-6'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddExpense />} />
                <Route path="/budget" element={<Budgetpage />} />
                <Route path="/recurring" element={<Recurringpage />} />
                <Route path="/analytics" element={<Analyticspage />} />
                <Route path="/bank-sync" element={<Bankpage />} />
                <Route path="/smart-suggest" element={<Smartaipage />} />
                <Route path="/summary" element={<Summary />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
        <ToastContainer theme={theme} position="top-right" autoClose={3000} />
      </main>
    </div>
  );
}

export default App;