import React, { useState, useEffect } from 'react';
import RequestCard from './RequestCard';
import NavBar from './../Home/NavBar';
import axios, * as others from 'axios';
import { useParams } from 'react-router-dom';

function ViewPendingRequests() {
    const [requests, setRequests] = useState([]);
    const params = useParams();
    const { id, isHost } = Object.keys(params).length > 0 ? params : "";

    useEffect(() => {
        (async () => {
            const url = `${process.env.REACT_APP_API_URL}/allReservations`
            const res = await axios.post(url,
                {
                    id: id,
                    isHost: isHost === 'true'
                })
            console.log(res.data.details)
            setRequests(res.data.details)
        })()

    }, []);

    return (
        <div>
            <NavBar id={id} isHost={isHost} />
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
                    {requests.map((item) => (
                        <RequestCard
                            name={item.name}
                            startDate={item.startDate}
                            endDate={item.endDate}
                            contactNumber={item.contactNumber}
                            email={item.email}
                            boxesRequested={item.boxesRequested}
                            id={item.id}
                            maxBoxes={item.maxBoxes}
                            isHost={isHost}
                            userID={id}
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
    );
}

export default ViewPendingRequests;
