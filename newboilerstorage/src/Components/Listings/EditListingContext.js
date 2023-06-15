import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios, * as others from 'axios';

const EditContext = createContext();

const EditProvider = ({ children }) => {
    const { id } = useParams();
    const [price, setPrice] = useState();
    const [address, setAddress] = useState();
    const [images, setImages] = useState();
    const [desc, setDesc] = useState()
    const [phoneNumber, setPhoneNumber] = useState();

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const [changeImages, setChanges] = useState(false);
    const [lon, setLon] = useState();
    const [lat, setLat] = useState();
    const [ownerID, setOwnerID] = useState();
    const [ownerName, setOwnerName] = useState();

    useEffect(() => {
        (async () => {
            try {
                const url = `${process.env.REACT_APP_API_URL}/get/listing`;
                const res = await axios.post(url, { id: id });
                if (res.data.success === true) {
                    setPrice(res.data.listing.price);
                    setAddress(res.data.listing.address);
                    setImages(res.data.listing.img);
                    setDesc(res.data.listing.numBoxesLeft);
                    setPhoneNumber(res.data.listing.contactNumber);
                    setStartDate(new Date(res.data.listing.startDate));
                    setEndDate(new Date(res.data.listing.endDate));
                    setLon(res.data.listing.lon);
                    setLat(res.data.listing.lat);
                    setOwnerID(res.data.listing.ownerID);
                    setOwnerName(res.data.listing.ownerName);
                } else {
                    console.log("Error to log in");
                }
            } catch (err) {
                console.log(err);
                console.log("Errored");
            }
        })()
    }, [])

    const state = {
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
    };

    return (
        <EditContext.Provider value={state}>{children}</EditContext.Provider>
    );
};

export { EditContext, EditProvider };
