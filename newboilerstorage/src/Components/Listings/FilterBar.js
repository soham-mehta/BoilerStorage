import React, { useEffect, useState, useRef } from 'react';
import tt from "@tomtom-international/web-sdk-services";
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css';
import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox';

function FilterBar({ onFilterChange }) {
  const [date, setDate] = useState('');
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState('');
  const [position, setPosition] = useState({});
  const searchRef = useRef(null);

  const options = {
    idleTimePress: 100,
    minNumberOfCharacters: 0,
    searchOptions: {
      key: process.env.REACT_APP_TOM_TOM_KEY,
      language: 'en-GB',
      limit: 5,
      typeahead: true
    },
    autocompleteOptions: {
      key: process.env.REACT_APP_TOM_TOM_KEY,
      language: 'en-GB'
    },
    labels: {
      placeholder: "Your Location"
    },
    units: 'miles'
  }

  const selectRes = (results) => {
    setPosition({...results.data.result.position})
    setLocation(results.data.result.address.freeformAddress)
    console.log(results)
  }

  const ttSearchBox = new SearchBox(tt.services, options);
  ttSearchBox.on(
    "tomtom.searchbox.resultselected",
    selectRes
  )
  const searchBoxHTML = ttSearchBox.getSearchBoxHTML();

  useEffect(() => {
    // Append the HTMLElement to the container element
    //console.log(searchRef.current)
    if (searchRef.current) {
      searchRef.current.appendChild(searchBoxHTML);
    }
    //return () => {searchRef.current.removeChild(searchBoxHTML)} 
  }, []);

  const handleFilterChange = async () => {
    if (location === "") {
      return;
    }
    onFilterChange({ date, price, lat: position.lat, lon: position.lng });
  }
  
  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        <div 
          className='w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm items-center justify-center'
          ref = {searchRef}
        >
        </div>
        
      </div>
      <button
        onClick={handleFilterChange}
        style={{ backgroundColor: '#CEB888', hover: { backgroundColor: '#CEB888' } }}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        Filter
      </button>

    </div>
  );
}

export default FilterBar;
