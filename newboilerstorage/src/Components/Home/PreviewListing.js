import * as React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import NavBar from '../Home/NavBar';

import axios, * as others from 'axios';
import * as tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { ListingContext } from "./AddListingContext";


function Preview() {

    const { id } = useParams();
    const mapElement = useRef();
    const navigate = useNavigate();

    const {
        price,
        setPrice,
        address,
        setAddress,
        images,
        setImages,
        desc,
        setDesc,
        phoneNumber,
        setPhoneNumber,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        position,
        setPosition,
        first,
        last
    } = useContext(ListingContext);

    console.log(images)

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const urlList = `${process.env.REACT_APP_API_URL}/upload/listings`
            const formData = new FormData();
            images.forEach((image) => {
                console.log(image)
                formData.append('images', image);
            });
            formData.append('user', id);
            formData.append('price', price);
            formData.append('address', address);
            formData.append('startDate', startDate);
            formData.append('endDate', endDate);
            formData.append('desc', desc);
            formData.append('phoneNumber', phoneNumber)
            const urlGeo = `https://api.tomtom.com/search/2/geocode/${address}.json?key=${process.env.REACT_APP_TOM_TOM_KEY}`
            const geo = await axios.get(urlGeo)
            //console.log(geo.data.results[0].position)
            formData.append('lat', position.lat);
            formData.append('lon', position.lng);
            await axios.post(urlList, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }).then(console.log("Finished uploading..."))
                .then(navigate(`/home/${id}/true`, {replace: true}));
        } catch (err) {
            console.log(err);
        }
    }

    const endMark = useRef(null);
    useEffect(() => {
        (async () => {
            let map = tt.map({
                key: process.env.REACT_APP_TOM_TOM_KEY,
                container: mapElement.current,
                zoom: 13,
                center: [position.lng, position.lat]
            })
            console.log(position.lng)
            endMark.current = new tt.Marker().setLngLat([position.lng, position.lat]).addTo(map);
            return () => { map.remove() }
        })()
    }, [])

    return (
        <div>
            <NavBar id={id} isHost={'true'} />
            <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 flex flex-row h-screen">
                <div className="mt-6 sm:mt-8 md:mt-16 lg:mt-20 xl:mt-28 w-2/3">
                    <h1 className="text-4xl font-bold text-gray-900">{(first && last) ? `${first} ${last}` : ""}</h1>
                    <p className="mt-4 text-xl text-gray-500">Contact Number: {phoneNumber}</p>
                    <p className="mt-4 text-xl text-gray-500">Address: {address}</p>
                    <p className="mt-4 text-xl text-gray-500">
                        Dates Available:
                        {startDate ? ` ${new Date(startDate).toLocaleDateString('en-US')}` : ""} -
                        {endDate ? ` ${new Date(endDate).toLocaleDateString('en-US')}` : ""}
                    </p>
                    <p className="mt-4 text-xl text-gray-500">Price: {price}</p>
                    <p className="mt-4 text-xl text-gray-500">Number of Boxes Left: {desc}</p>
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-gray-900">Photos:</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                            {images ? (images.map(((item) =>
                            (<div className="rounded overflow-hidden shadow-lg">
                                <img className="w-full" src={(URL.createObjectURL(item))} alt="No images" />
                            </div>)
                            ))
                            ) : ""}
                        </div>
                    </div>
                    <br></br>


                </div>
                <div className="mt-6 sm:mt-8 md:mt-16 lg:mt-20 xl:mt-28 h-full w-1/2 justify-items-center align-middle">
                    <div
                        ref={mapElement}
                        className="h-2/3 rounded-sm"
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <Link
                    to={`/addlisting/${id}`}
                    style={{ backgroundColor: '#CEB888', hover: { backgroundColor: '#CEB888' } }}
                    className="group relative w-1/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Edit
                </Link>
            </div>

            <br></br>
            <div
                className="flex justify-center"
            >
                <button
                    onClick={onSubmit}
                    type="button"
                    style={{ backgroundColor: '#CEB888', hover: { backgroundColor: '#CEB888' } }}
                    className="group relative w-1/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Confirm
                </button>
            </div>
            <footer className="mx-auto max-w-7xl overflow-hidden px-6 pb-20  sm:pb-24 lg:px-8">
                <p className="mt-10 text-center text-xs leading-5 text-gray-500">
                    &copy; 2023 BoilerStorage. All rights reserved.
                </p>
            </footer>

        </div>
    );
}



export default Preview;





