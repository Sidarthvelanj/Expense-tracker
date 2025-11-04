import React from 'react';
import { CSVLink } from 'react-csv';

function ExportCSV({ data }) {
  const headers = [
    { label: 'Label', key: 'label' },
    { label: 'Amount', key: 'amount' },
    { label: 'Category', key: 'category' },
    { label: 'Date', key: 'date' },
  ];

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="bg-white dark:bg-[#2a2a3c] rounded-xl shadow-md p-6 backdrop-blur-md text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Export Your Expenses</h2>
        <CSVLink
          data={data}
          headers={headers}
          filename="expenses.csv"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition"
        >
          Download CSV
        </CSVLink>
      </div>
    </div>
  );
}

export default ExportCSV;
