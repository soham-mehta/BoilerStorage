import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios, * as others from 'axios';

const ListingContext = createContext();

const ListingProvider = ({ children }) => {
  const {id} = useParams();
  const [price, setPrice] = useState(0);
  const [address, setAddress] = useState('');
  const [images, setImages] = useState([]);
  const [desc, setDesc] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [position, setPosition] = useState({ lng: 0, lat: 0 });
  const [first, setFirstName] = useState("");
  const [last, setLastName] = useState("");

  useEffect(() => {
    (async () => {
        try {
            const url = `${process.env.REACT_APP_API_URL}/details`;
            const res = await axios.post(url, { id: id });
            if (res.data.success === true) {
                setFirstName(res.data.details.firstName);
                setLastName(res.data.details.lastName);
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
    position,
    setPosition,
    first,
    last
  };

  return (
    <ListingContext.Provider value={state}>{children}</ListingContext.Provider>
  );
};

export { ListingContext, ListingProvider };
