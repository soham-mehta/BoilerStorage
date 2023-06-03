import React, { useState } from 'react';

function FilterBar({onFilterChange}) {
  const [date, setDate] = useState('');
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState('');

  const handleFilterChange = () => {
    onFilterChange({ date, price, location });
  }

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
      </div>
      <button 
    onClick={handleFilterChange} 
    style={{backgroundColor: '#CEB888', hover: {backgroundColor: '#CEB888'}}}
    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
>
    Filter
</button>

    </div>
  );
}

export default FilterBar;
