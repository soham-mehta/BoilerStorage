import ListingCard from './ListingCard';
import FilterBar from './FilterBar';
import NavBar from './../Home/NavBar';
import React, { useState } from 'react';

import axios, * as others from 'axios';



const listings = [
    {
      id: 1,
      name: "John Doe",
      contactNumber: "123-456-7890",
      datesAvailable: ["2023-01-01", "2023-01-02"],
      boxesLeft: 5,
      photos: ["img1.jpg", "img2.jpg"]
    },
    {
      id: 2,
      name: "Jane Doe",
      contactNumber: "234-567-8901",
      datesAvailable: ["2023-02-01", "2023-02-02"],
      boxesLeft: 3,
      photos: ["img3.jpg", "img4.jpg"]
    },
    // Add more listings here...
  ];
  


function ListingPage() {
    const [listing, setListing] = useState([]);


    const onFilterChange = async ({ date, price, location }) => {
        const url = `${process.env.REACT_APP_API_URL}/get/listings`
        const res = await axios.post(url, 
            {
                date: date, price: price, location: location
            })
        console.log(res)
        console.log(res.data.allDocs)
        setListing(res.data.allDocs)
    }

    return (
        <div>
        <NavBar />

        <div
        className="
            max-w-[2520px]
            mx-auto
            xl:px-20 
            md:px-10
            sm:px-2
            px-4
            "
        >
            <FilterBar onFilterChange={onFilterChange} />
            <div 
            className="
                pt-24
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-2 
                lg:grid-cols-2
                xl:grid-cols-2
                2xl:grid-cols-3
                sm:gap-5
                md:gap-7
                lg:gap-20
                xl:gap-20
                2xl:gap-x-40 gap-y-30
            "
            >
                {listing.map((item) => (
                    <ListingCard  
                        price = {item.price}
                        address = {item.address}
                        title = "Purdue University"
                        imgSrc={`data:${item.img[0][0]};base64,${item.img[0][1]}`}
                    />
                ))}
            </div>
        </div>
        <footer className="mx-auto max-w-7xl overflow-hidden px-6 pb-20  sm:pb-24 lg:px-8">
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; 2023 BoilerStorage. All rights reserved.
        </p>
      </footer>
        </div>
    )
}

export default ListingPage;