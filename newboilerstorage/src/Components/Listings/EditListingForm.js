import React, { useState, useRef, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from '../Home/NavBar';
import tt from "@tomtom-international/web-sdk-services";
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css';
import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox';
import { EditContext } from './EditListingContext';



function EditListingForm() {
    const { id } = useParams();
    const imageID = useRef("images");
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
        changeImages,
        setChanges,
        lon,
        setLon,
        lat,
        setLat,
        ownerID,
        ownerName
    } = useContext(EditContext);

    const navigate = useNavigate();

    const searchRef = useRef(null);

    useEffect(() => {
        // Append the HTMLElement to the container element
        //console.log(searchRef.current)
        const options = {
            idleTimePress: 100,
            minNumberOfCharacters: 0,
            searchOptions: {
                key: process.env.REACT_APP_TOM_TOM_KEY,
                language: 'en-GB',
                limit: 5,
                typeahead: true,
                countrySet: 'US',
                boundingBox: { minLon: -88.0979, minLat: 37.7715, maxLon: -84.7846, maxLat: 41.7613 }
            },
            labels: {
                placeholder: address,
            },
            units: 'miles'
        }

        const selectRes = (results) => {
            if (!results.data.result.address.freeformAddress) {
                return;
            }
            setAddress(results.data.result.address.freeformAddress);
            //console.log(results.data.result.address.freeformAddress)
            setLon(results.data.result.position.lng);
            setLat(results.data.result.position.lat);
        }

        const ttSearchBox = new SearchBox(tt.services, options);
        ttSearchBox.on(
            "tomtom.searchbox.resultselected",
            selectRes
        )
        const searchBoxHTML = ttSearchBox.getSearchBoxHTML();
        searchBoxHTML.style.border = '0';
        searchBoxHTML.style.marginTop = '0';
        searchBoxHTML.style.position = 'static';
        if (searchRef.current) {
            searchRef.current.appendChild(searchBoxHTML);
        }
        return () => { searchRef.current = null }
    }, []);

    const handleImageUpload = (event) => {
        if (Array.from(event.target.files).length === 0) {
            return;
        }
        if (!changeImages) {
            setChanges(true);
        }
        setImages(Array.from(event.target.files))
    }

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        console.log(date);
        setEndDate(date);
    };

    const onSubmit = () => {
        if (images && images.length === 0) {
            alert("Please upload at least one image");
            return;
        }
        navigate(`/edit/preview/${id}`)
    }

    const handleButtonClick = () => {
        imageID.current.click();
    };

    return (
        <div>
            <Navbar id={ownerID} isHost={"true"}></Navbar>

            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-custom-color p-10 rounded-xl">
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        Edit your listing
                    </h2>
                    <form className="mt-8 space-y-6">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="location" className="sr-only">
                                    Location
                                </label>
                                <div
                                    className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                                    ref={searchRef}
                                >
                                </div>
                            </div>
                            <div>
                                <label htmlFor="available-dates" className="sr-only">
                                    Available dates
                                </label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(handleStartDateChange)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    placeholderText="Starting Available Date"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                />
                                <DatePicker
                                    selected={endDate}
                                    onChange={(handleEndDateChange)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    placeholderText="Last Available Date"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="storage-space" className="sr-only">
                                    Storage space
                                </label>
                                <input
                                    id="storage-space"
                                    name="storage-space"
                                    type="text"
                                    value={desc}
                                    onChange={(event) => { setDesc(event.target.value) }}
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="approximate number of boxes - 2 x 1.33 x 1.5 feet"
                                />
                            </div>
                            <div>
                                <label htmlFor="contact-information" className="sr-only">
                                    Contact information
                                </label>
                                <input
                                    id="contact-information"
                                    name="contact-information"
                                    type="text"
                                    pattern="^(\+?1[-.\s]?)?(\()?\d{3}(\))?[-.\s]?\d{3}[-.\s]?\d{4}$|^\d{10}$"
                                    required
                                    autoComplete='tel'
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Phone Number"
                                    value={phoneNumber}
                                    onChange={(event) => { setPhoneNumber(event.target.value) }}
                                />
                            </div>
                            <div>
                                <label htmlFor="price" className="sr-only">
                                    Price
                                </label>
                                <input
                                    id="price"
                                    name="price"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Price per box"
                                    value={price}
                                    onChange={(event) => setPrice(event.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="images" className="sr-only">
                                    Images
                                </label>
                                <input
                                    id="images"
                                    name="images"
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                    multiple
                                    ref = {imageID}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                />
                                <label className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm justify-center">
                                    <button
                                        onClick={handleButtonClick}
                                        htmlFor="images"
                                        type="button"
                                        style={{ backgroundColor: '#CEB888', hover: { backgroundColor: '#CEB888' } }}
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        {images && images.length > 0 ? `${images.length} ${images.length === 1 ? "file" : "files"} uploaded` : "Upload"}
                                    </button>
                                </label>
                            </div>
                        </div>
                        <div>
                            <button
                                type= "submit"
                                onClick={onSubmit}
                                to={`/edit/preview/${id}`}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                style={{ backgroundColor: '#CEB888', hover: { backgroundColor: '#CEB888' } }}
                            >
                                Preview Changes
                            </button>
                        </div>
                    </form>
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

export default EditListingForm;