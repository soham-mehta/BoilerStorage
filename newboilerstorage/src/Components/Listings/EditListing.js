import ListingCard from './HostListingCard';
import Navbar from '../Home/NavBar';
import React, { useState, useEffect } from 'react';

import axios, * as others from 'axios';
import { useParams } from 'react-router-dom';


function EditListing() {
    const [listing, setListing] = useState([]);
    const params = useParams();
    const { id } = Object.keys(params).length > 0 ? params : "";

    useEffect(() => {
        (async () => {
            onFilterChange()
        })()
        
    }, [])


    const onFilterChange = async () => {
        console.log(id);
        console.log(params);
        const url = `${process.env.REACT_APP_API_URL}/edit/listings`
        const res = await axios.post(url, 
            {
                user: id
            })
        console.log(res)
        console.log(res.data.allDocs)
        setListing(res.data.allDocs)
    }

    return (
        <div>
        <Navbar id = {id} isHost={`true`} />
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
                        img = {item.img}
                        id = {item.id}
                        startDate = {item.startDate}
                        endDate = {item.endDate}
                        phoneNumber = {item.phoneNumber}
                        desc = {item.desc}
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

export default EditListing;