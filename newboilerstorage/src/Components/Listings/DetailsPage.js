import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
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


    const mapElement = useRef();
    const startMark = useRef(null);
    const endMark = useRef(null);
    useEffect(() => {
        (async () => {
            const cur = await getListing();
            const options = {
                idleTimePress: 500,
                minNumberOfCharacters: 0,
                searchOptions: {
                  key: process.env.REACT_APP_TOM_TOM_KEY,
                  language: 'en-GB',
                  limit: 5,
                  typeahead: true,
                  countrySet: 'US',
                  boundingBox: {minLon: -88.0979, minLat: 37.7715, maxLon: -84.7846, maxLat: 41.7613}
                  //query: "United States",
                  //entityTypeSet: "Country"
                },
                units: 'miles'
              }
            const ttSearchBox = new SearchBox(services.services, options);
            const selectRes = (event) => {
                if (!event) {
                    return;
                } else {
                    if (startMark.current !== null) {
                        startMark.current.setLngLat([event.data.result.position.lng, event.data.result.position.lat]);
                    } else {
                        var curMark = new tt.Marker().setLngLat([event.data.result.position.lng, event.data.result.position.lat]).addTo(map);
                        map.setCenter([event.data.result.position.lng, event.data.result.position.lat]);
                        startMark.current = (curMark);
                    }
                    if (map.getLayer('route')) {
                        map.removeLayer('route');
                        map.removeSource('route');
                    }

                    var start = startMark.current.getLngLat();
                    var end = endMark.current.getLngLat();

                    services.services.calculateRoute({
                        key: process.env.REACT_APP_TOM_TOM_KEY,
                        traffic: true,
                        locations: `${start.lng},${start.lat}:${end.lng},${end.lat}`
                    }).then(function (response) {
                        console.log(response)
                        var geojson = response.toGeoJson();
                        map.addLayer({
                            'id': 'route',
                            'type': 'line',
                            'source': {
                                'type': 'geojson',
                                'data': geojson
                            },
                            'paint': {
                                'line-color': '#2faaff',
                                'line-width': 8
                            }
                        });

                        var coordinates = geojson.features[0].geometry.coordinates;
                        console.log(coordinates)
                        let bounds = new tt.LngLatBounds();

                        coordinates.forEach(function (point) {
                            bounds.extend(tt.LngLat.convert(point));
                        });

                        if (!bounds.isEmpty()) {
                            map.fitBounds(bounds, { duration: 0, padding: 50 });
                        }
                    }).catch();

                    if (!startMark.current || !endMark.current) {
                        return;
                    }



                }
            }
            ttSearchBox.on(
                "tomtom.searchbox.resultselected",
                selectRes
            )
            let map = tt.map({
                key: process.env.REACT_APP_TOM_TOM_KEY,
                container: mapElement.current,
                zoom: 13,
                center: [cur.lon, cur.lat]
            })
            map.addControl(ttSearchBox, ['top-left'])
            console.log(cur.lon)
            endMark.current = new tt.Marker().setLngLat([cur.lon, cur.lat]).addTo(map);
            return () => { map.remove() }
        })()
    }, [])

    const getListing = async () => {
        const url = `${process.env.REACT_APP_API_URL}/get/listing`
        const res = await axios.post(url,
            {
                id: id
            })
        setListingDetails(res.data.listing)
        return res.data.listing;
        //updateMap(parseFloat(res.data.listing.lon), parseFloat(res.data.listing.lat))
    }

    return (
        <div>
            <NavBar id={id} isHost={'true'}/>
            <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 flex flex-row h-screen">
                <div className="mt-6 sm:mt-8 md:mt-16 lg:mt-20 xl:mt-28 w-2/3">
                    <h1 className="text-4xl font-bold text-gray-900">{listingDetails.ownerName ? listingDetails.ownerName : ""}</h1>
                    <p className="mt-4 text-xl text-gray-500">Contact Number: {listingDetails.contactNumber ? listingDetails.contactNumber : ""}</p>
                    <p className="mt-4 text-xl text-gray-500">Address: {listingDetails.address ? listingDetails.address : ""}</p>
                    <p className="mt-4 text-xl text-gray-500">Dates Available: {listingDetails.startDate ? listingDetails.startDate : ""} - {listingDetails.endDate ? listingDetails.endDate : ""}</p>
                    <p className="mt-4 text-xl text-gray-500">Price: {listingDetails.price ? listingDetails.price : ""}</p>
                    <p className="mt-4 text-xl text-gray-500">Number of Boxes Left: {listingDetails.numBoxesLeft ? listingDetails.numBoxesLeft : ""}</p>
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-gray-900">Photos:</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                            {listingDetails.img ? (listingDetails.img.map((item) => (
                                <div className="rounded overflow-hidden shadow-lg">
                                    <img className="w-full" src={`data:${item[0]};base64,${item[1]}`} alt="No images" />
                                </div>
                            ))) : ""}
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





