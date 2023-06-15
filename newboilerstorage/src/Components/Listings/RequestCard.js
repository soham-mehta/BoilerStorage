import React, { useState } from 'react';
import axios, * as others from 'axios';
import { useNavigate } from 'react-router-dom';

function RequestCard({ name, contactNumber, email, boxesRequested, startDate, endDate, id, maxBoxes, isHost, userID }) {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedBoxes, setSelectedBoxes] = useState(boxesRequested);
  const options = Array.from({ length: maxBoxes }, (_, i) => i + 1);  // Modify this as per your requirements
  const navigate = useNavigate();

  const startDateString = startDate ? new Date(startDate).toLocaleDateString("en-US") : "";
  const endDateString = endDate ? new Date(endDate).toLocaleDateString("en-US") : "";

  const onConfirm = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/edit/reservation`,
      {
        revID: id,
        confirm: true,
        numOfBoxes: selectedBoxes,
      }).then(navigate(`/home/${userID}/${isHost}`, { replace: true }))
  }

  const onDecline = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/edit/reservation`,
      {
        revID: id,
        confirm: false,
        numOfBoxes: selectedBoxes,
      }).then(navigate(`/home/${userID}/${isHost}`, { replace: true }))
      console.log("Running")
  }

  return (
    <div className="col-span-1 cursor-pointer group gap-10">
      <div className="flex flex-col gap-2 w-full">
        <div className="font-semibold text-lg">
          {`Request ${(isHost === 'true' ? 'from' : 'to')} ${name.split(' ')[0]}`}
        </div>

        {showDetails && (
          <>
            <div className="font-light text-neutral-500">
              Name: {name}
            </div>
            <div className="font-light text-neutral-500">
              Contact Number: {contactNumber}
            </div>
            <div className="font-light text-neutral-500">
              Email: {email}
            </div>
            <div className="font-light text-neutral-500">
              Boxes Requested:
              <select
                value={selectedBoxes}
                onChange={(e) => setSelectedBoxes(e.target.value)}
              >
                {options.map((number, index) => (
                  <option key={index} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>
            <div className="font-light text-neutral-500">
              Dates Requested: {startDateString} - {endDateString}
            </div>
            <div className="text-sm text-red-600">
              Please communicate with the guest and confirm the reservation and the exact number of boxes booked.
            </div>
          </>
        )}

        <button
          type="button"
          className="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          style={{ backgroundColor: '#CEB888', hover: { backgroundColor: '#CEB888' } }}
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </button>

        {showDetails && (
          <div className="mt-4 flex space-x-4">
            <button
              onClick={onConfirm}
              type="button"
              className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              style={{ backgroundColor: '#CEB888', hover: { backgroundColor: '#CEB888' } }}
            >
              Confirm Reservation
            </button>

            <button
              onClick={onDecline}
              type="button"
              className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              style={{ backgroundColor: '#CEB888', hover: { backgroundColor: '#CEB888' } }}
            >
              Decline
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RequestCard;
