import React, { useState, useRef, useEffect } from 'react';
import axios, * as others from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from './NavBar';
import tt from "@tomtom-international/web-sdk-services";
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css';
import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox'



function AddListing() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [price, setPrice] = useState(0);
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);
  const [desc, setDesc] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const searchRef = useRef(null);

  const options = {
    idleTimePress: 100,
    minNumberOfCharacters: 0,
    searchOptions: {
      key: process.env.REACT_APP_TOM_TOM_KEY,
      language: 'en-GB',
      limit: 5,
      typeahead: true,
      countrySet: 'US'
    },
    autocompleteOptions: {
      key: process.env.REACT_APP_TOM_TOM_KEY,
      language: 'en-GB'
    },
    units: 'miles'
  }

  const selectRes = (results) => {
    setAddress(results.data.result.address.freeformAddress)
    console.log(results.data.result.address.freeformAddress)
  }

  const dist = async () => {
    const url = `https://api.tomtom.com/routing/1/calculateRoute/52.50931,13.42936:52.50274,13.43872/json?instructionsType=text&language=en-US&vehicleHeading=90&sectionType=traffic&report=effectiveSettings&routeType=eco&traffic=true&avoid=unpavedRoads&travelMode=car&vehicleMaxSpeed=120&vehicleCommercial=false&vehicleEngineType=combustion&key=${process.env.REACT_APP_TOM_TOM_KEY}`
    const res = await axios.get(url)
    console.log(res)
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
    //console.log(searchRef.current)
    console.log(searchBoxHTML)
    if (searchRef.current) {
      searchRef.current.appendChild(searchBoxHTML);
    }
    dist()
    return () => {searchRef.current = null}
  }, []);

  const handleImageUpload = (event) => {
    setImages(Array.from(event.target.files))
  }

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(id)
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
      navigate(`/home/${id}/true`);
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div>
      <Navbar id = {id} isHost={"true"}></Navbar>

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
                  ref = {searchRef}  
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
                  multiple
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                style={{ backgroundColor: '#CEB888', hover: { backgroundColor: '#CEB888' } }}
              >
                Add Listing
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

export default AddListing;