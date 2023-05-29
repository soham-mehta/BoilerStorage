import React, { useState } from 'react';

function ListingCard() {
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
              "
            >
              <img
                fill
                className="
                  object-cover 
                  w-full 
                  group-hover:scale-90 
                  transition
                "
                src="logo192.png"
                alt="Listing"
              />
            </div>
            <div className="font-semibold text-lg">
              Purdue University
            </div>
            <div className="font-light text-neutral-500">
              Address: ...
            </div>
            <div className="flex flex-row items-center gap-1">
              <div className="font-semibold">
                $ 100
              </div>
            </div>
            <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                style={{backgroundColor: '#CEB888', hover: {backgroundColor: '#CEB888'}}}
                >
                View Details
            </button>
          </div>
        </div>
       );
}

export default ListingCard;