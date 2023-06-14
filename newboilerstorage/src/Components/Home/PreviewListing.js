import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../Home/NavBar';

import axios, * as others from 'axios';
import * as tt from "@tomtom-international/web-sdk-maps";
import services from "@tomtom-international/web-sdk-services";
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css';
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox';


function DetailsPage() {

    const { id } = useParams();
    const [listingDetails, setListingDetails] = useState({});

    const location = useLocation();
    const navigate = useNavigate();
    const mapElement = useRef();
  
    const { price = "", address = "", images = [], desc = "", phoneNumber = "", startDate = "", endDate = "", lon = 0, lat = 0 } = location.state || {};
    console.log(location)
    const [map, setMap] = useState({});
    const startMark = useRef(null);
    const endMark = useRef(null);
    useEffect(() => {
        (async () => {
            
            
            let map = tt.map({
                key: process.env.REACT_APP_TOM_TOM_KEY,
                container: mapElement.current,
                zoom: 13,
                center: [lon, lat]
            })
            console.log(lon)
            endMark.current = new tt.Marker().setLngLat([lon, lat]).addTo(map);
            return () => { map.remove() }
        })()
    }, [])

    return (
        <div>
            <NavBar />
            <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 flex flex-row h-screen">
                <div className="mt-6 sm:mt-8 md:mt-16 lg:mt-20 xl:mt-28 w-2/3">
                    <h1 className="text-4xl font-bold text-gray-900">{listingDetails.ownerName ? listingDetails.ownerName : ""}</h1>
                    <p className="mt-4 text-xl text-gray-500">Contact Number: {phoneNumber}</p>
                    <p className="mt-4 text-xl text-gray-500">Address: {address}</p>
                    <p className="mt-4 text-xl text-gray-500">
  Dates Available:  
  {startDate ? " " + new Date(startDate).toLocaleDateString('en-US')  : ""} - 
  {endDate ? " " + new Date(endDate).toLocaleDateString('en-US') : ""}
</p>

                    <p className="mt-4 text-xl text-gray-500">Number of Boxes Left: {desc}</p>
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-gray-900">Photos:</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                            {images ? (
                                <div className="rounded overflow-hidden shadow-lg">
                                    <img className="w-full" src={(images[0])} alt="No images" />
                                </div>
                            ) : ""}
                        </div>
                    </div>
                </div>
                <div className="mt-6 sm:mt-8 md:mt-16 lg:mt-20 xl:mt-28 h-full w-1/2 justify-items-center align-middle">
                    <div
                        ref={mapElement}
                        className="h-2/3 rounded-sm"
                    />
                </div>
            </div>
            <footer className="mx-auto max-w-7xl overflow-hidden px-6 pb-20  sm:pb-24 lg:px-8">
                <p className="mt-10 text-center text-xs leading-5 text-gray-500">
                    &copy; 2023 BoilerStorage. All rights reserved.
                </p>
            </footer>

        </div>
    );
}



export default DetailsPage;





