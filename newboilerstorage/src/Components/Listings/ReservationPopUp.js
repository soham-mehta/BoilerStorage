import React, { useState } from 'react';

function ReservationPopUp({ onConfirm, onClose }) {
    const [boxes, setBoxes] = React.useState(1);
    const [dates, setDates] = React.useState({ startDate: '', endDate: '' });
    const [message, setMessage] = useState(null);
  
    const handleConfirm = () => {
      onConfirm({ boxes, dates });
      setMessage("Your reservation has been made!");
    };
  
    // New functions to handle box incrementing and decrementing
    const incrementBoxes = () => setBoxes(boxes + 1);
    const decrementBoxes = () => setBoxes(boxes > 1 ? boxes - 1 : 1);
  
    return (
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-10">
        <div className="bg-white p-5 rounded-lg shadow-lg w-11/12 md:max-w-md mx-auto relative">
          <button onClick={onClose} className="absolute top-2 right-2 px-3 py-2 text-lg font-bold text-gray-600 hover:text-gray-800">&times;</button>
          <div className="text-xl mb-4">
            <label htmlFor="boxes" className="block mb-2">Number of Boxes:</label>
            <div className="flex items-center">
              <button onClick={decrementBoxes} className="border p-1">-</button>
              <input className="appearance-none w-full border border-gray-200 p-2 rounded-md text-center" type="text" id="boxes" value={boxes} readOnly />
              <button onClick={incrementBoxes} className="border p-1">+</button>
            </div>
          </div>
          <div className="text-xl mb-4">
            <label htmlFor="startDate" className="block mb-2">Start Date:</label>
            <input className="w-full border border-gray-200 p-2 rounded-md" type="date" id="startDate" value={dates.startDate} onChange={e => setDates(dates => ({ ...dates, startDate: e.target.value }))} />
          </div>
          <div className="text-xl mb-4">
            <label htmlFor="endDate" className="block mb-2">End Date:</label>
            <input className="w-full border border-gray-200 p-2 rounded-md" type="date" id="endDate" value={dates.endDate} onChange={e => setDates(dates => ({ ...dates, endDate: e.target.value }))} />
          </div>
          <button style={{ backgroundColor: '#CEB888', color: 'white' }} className="w-full py-2 rounded-md" onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    );
  }
  
  export default ReservationPopUp;
  