import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ListingCard({ id, imgSrc, title, address, price, dist, userID, isHost }) {
    return (
        <div className="col-span-1 cursor-pointer group gap-10">
          <div className="flex flex-col gap-2 w-full">
          <div 
              className="
                aspect-square 
                w-full 
                relative 
                overflow-hidden 
                rounded-xl
                justify-center
              "
            >
              <img src={imgSrc} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="font-semibold text-lg">
              {title}
            </div>
            <div className="font-semibold text-lg">
              {dist ? `${(dist / 1600).toFixed(2)} miles` : ""}
            </div>
            <div className="font-light text-neutral-500">
              Address: {address}
            </div>
            <div className="flex flex-row items-center gap-1">
              <div className="font-semibold">
                $ {price}
              </div>
            </div>
            <div>
            <Link to={`/details/${userID}/${id}/${isHost}`}>
              <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  style={{backgroundColor: '#CEB888', hover: {backgroundColor: '#CEB888'}}}
                  >
                  View Details
              </button>
            </Link>
            </div>
            
          </div>
        </div>
       );
}

export default ListingCard;