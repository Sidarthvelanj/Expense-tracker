import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useExpenseStore } from '../store/useExpenseStore.jsx';
import {
  Menu, X, Home, PlusCircle, Wallet, Repeat, BarChart,
  Banknote, Brain, LayoutDashboard, Moon, Sun
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/add', label: 'Add Expense', icon: PlusCircle },
  { path: '/budget', label: 'Budget', icon: Wallet },
  { path: '/recurring', label: 'Recurring', icon: Repeat },
  { path: '/analytics', label: 'Analytics', icon: BarChart },
  { path: '/bank-sync', label: 'Bank Sync', icon: Banknote }, // ✅ lowercase path
  { path: '/smart-suggest', label: 'Smart AI', icon: Brain },
  { path: '/summary', label: 'Summary', icon: LayoutDashboard },
];

function Navbar() {
  const location = useLocation();
  const navbarCollapsed = useExpenseStore(state => state.navbarCollapsed);
  const toggleNavbar = useExpenseStore(state => state.toggleNavbar);
  const theme = useExpenseStore(state => state.theme);
  const toggleTheme = useExpenseStore(state => state.toggleTheme);

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-white dark:bg-[#1f1f2e] shadow-lg transition-all duration-300 z-50 flex flex-col justify-between ${
        navbarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div>
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-300 dark:border-gray-700">
          <h1 className="text-lg font-bold text-gray-800 dark:text-white">
            {navbarCollapsed ? '💸' : 'Expense Tracker'}
          </h1>
          <button
            onClick={toggleNavbar}
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
          >
            {navbarCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        <nav className="mt-6 space-y-2 px-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`group flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
                location.pathname === path
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Icon size={20} />
              {!navbarCollapsed && <span>{label}</span>}
              {navbarCollapsed && (
                <span className="absolute left-full ml-2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  {label}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      <div className="px-4 py-4">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          {!navbarCollapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
