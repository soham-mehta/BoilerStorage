import React, { useRef, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

import Navbar from './NavBar';
import tt from "@tomtom-international/web-sdk-services";
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css';
import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox';
import { ListingContext } from './AddListingContext';


function AddListing() {
  const { id } = useParams();
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
    setPosition
  } = useContext(ListingContext);

  const searchRef = useRef(null);
  const imageID = useRef("images");

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
    console.log(results)
    if (!results.data.result.address.freeformAddress) {
      return;
    }
    setAddress(results.data.result.address.freeformAddress)
    setPosition({ ...position, lng: results.data.result.position.lng, lat: results.data.result.position.lat })
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

  useEffect(() => {
    // Append the HTMLElement to the container element
    console.log(searchBoxHTML)
    if (searchRef.current) {
      searchRef.current.appendChild(searchBoxHTML);
    }

    return () => { searchRef.current = null }
  }, []);


  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };


  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const urlList = `${process.env.REACT_APP_API_URL}/upload/listings`
      const formData = new FormData();
      images.forEach((image) => {
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
      console.log(geo.data.results[0].position)
      formData.append('lat', geo.data.results[0].position.lat);
      formData.append('lon', geo.data.results[0].position.lon);
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

  const handleButtonClick = () => {
    imageID.current.click();
  };



  return (
    <div>
      <Navbar id={id} isHost={"true"}></Navbar>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-custom-color p-10 rounded-xl">
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Add a new listing
          </h2>
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
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
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Starting Available Date"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
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
                  ref={imageID}
                  name="images"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleImageUpload}
                  multiple
                  style={{ opacity: 0, position: 'absolute', top: 0, left: 0 }}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                <label htmlFor="images" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm justify-center">
                  <button
                    onClick={handleButtonClick}
                    htmlFor="images"
                    style={{ backgroundColor: '#CEB888', hover: { backgroundColor: '#CEB888' } }}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {images.length > 0 ? `${images.length} ${images.length == 1 ? "file" : "files"} uploaded` : "Upload"}
                  </button>
                </label>

              </div>
            </div>
            <Link
              to={`/PreviewListing/${id}`}
              style={{ backgroundColor: '#CEB888', hover: { backgroundColor: '#CEB888' } }}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <i className="fas fa-arrow-right"></i>
              </span>
              Preview
            </Link>
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

export default AddListing;
