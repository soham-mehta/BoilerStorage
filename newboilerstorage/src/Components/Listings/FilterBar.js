import React, { useEffect, useState, useRef } from 'react';
import tt from "@tomtom-international/web-sdk-services";
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css';
import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox';
import axios, * as others from 'axios';
import ReactDOM from 'react-dom';

function FilterBar({ onFilterChange }) {
  const [date, setDate] = useState('');
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState('');
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
    units: 'miles'
  }

  const selectRes = (results) => {
    setLocation(results.data.result.address.freeformAddress)
    console.log(results.data.result.address.freeformAddress)
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
  }, []);

  const handleFilterChange = async () => {
    if (location === "") {
      return;
    }
    const url = `https://api.tomtom.com/search/2/geocode/${location}.json?key=${process.env.REACT_APP_TOM_TOM_KEY}`;
    const res = await axios.get(url);
    console.log(res.data.results[0].position)
    onFilterChange({ date, price, lat: res.data.results[0].position.lat, lon: res.data.results[0].position.lon });
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
