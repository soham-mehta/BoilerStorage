import React, { useRef, useEffect, useContext } from 'react';
import axios, * as others from 'axios';
import { useParams, Link } from 'react-router-dom';
import { EditContext } from './EditListingContext';
import NavBar from '../Home/NavBar';
import * as tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

function PreviewEdit() {
    const { id } = useParams();
    const mapElement = useRef();
    const endMark = useRef(null);

    const {
        price,
        setPrice,
        address,
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
        changeImages,
        setChanges,
        lon,
        setLon,
        lat,
        setLat,
        ownerID,
        ownerName
    } = useContext(EditContext);

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

    const onSubmit = async (event) => {
        event.preventDefault();
        //console.log(id)
        try {
            const urlList = `${process.env.REACT_APP_API_URL}/post/edit/listings`;
            const formData = new FormData();
            if (changeImages) {
                images.forEach((image) => {
                    formData.append('images', image);
                });
            }

            formData.append('user', ownerID);
            formData.append('price', price);
            formData.append('address', address);
            formData.append('startDate', startDate);
            formData.append('endDate', endDate);
            formData.append('desc', desc);
            formData.append('phoneNumber', phoneNumber);
            formData.append('changed', changeImages);
            formData.append('id', id);
            const urlGeo = `https://api.tomtom.com/search/2/geocode/${address}.json?key=${process.env.REACT_APP_TOM_TOM_KEY}`;
            const geo = await axios.get(urlGeo);
            //console.log(geo.data.results[0].position);
            formData.append('lat', geo.data.results[0].position.lat);
            formData.append('lon', geo.data.results[0].position.lon);
            console.log(Array.from(formData));
            await axios.post(urlList, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }).then(console.log("Finished uploading..."));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <NavBar id={ownerID} isHost={'true'} />
            <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 flex flex-row h-screen">
                <div className="mt-6 sm:mt-8 md:mt-16 lg:mt-20 xl:mt-28 w-2/3">
                    <h1 className="text-4xl font-bold text-gray-900">{(ownerName) ? ownerName : ""}</h1>
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
                                <img className="w-full" src={(changeImages ? URL.createObjectURL(item) : `data:${item[0]};base64,${item[1]}`)} alt="No images" />
                            </div>)
                            ))
                            ) : ""}
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className='flex justify-center'>
                        <Link
                            to={`/edit/details/${id}`}
                            style={{ backgroundColor: '#CEB888', hover: { backgroundColor: '#CEB888' } }}
                            className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Edit
                        </Link>
                    </div>
                    <br></br>
                    <div className='flex justify-center'>
                        <button
                            onClick={onSubmit}
                            style={{ backgroundColor: '#CEB888', hover: { backgroundColor: '#CEB888' } }}
                            className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Confirm
                        </button>
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

export default PreviewEdit;