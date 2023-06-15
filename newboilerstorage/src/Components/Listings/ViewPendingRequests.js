import React, { useState, useEffect } from 'react';
import RequestCard from './RequestCard';
import NavBar from './../Home/NavBar';
import axios, * as others from 'axios';
import { useParams } from 'react-router-dom';

function ViewPendingRequests() {
    const [requests, setRequests] = useState([]);
    const params = useParams();
    const {id, isHost} = Object.keys(params).length > 0 ? params : "";

   /* useEffect(() => {
        getRequests(); // Assume you have a function to fetch requests
    }, []);

    // Fetch the pending requests from the backend here
    const getRequests = async () => {
        const url = `${process.env.REACT_APP_API_URL}/get/pendingRequests`; // Replace with your endpoint
        const res = await axios.get(url);
        setRequests(res.data.allRequests); // Assume allRequests is the array of requests
    } 
    */

    useEffect(() => {
        // function that fetches data from the API
        // Since backend is not ready,  some mock data
      
        const fetchData = () => {
          return [
            {
              requestTitle: "Request from User 1",
              requesterName: "User 1",
              contactNumber: "(123) 456-7890",
              email: "user1@example.com",
              boxesRequested: 5,
              id: "1"
            },
            {
              requestTitle: "Request from User 2",
              requesterName: "User 2",
              contactNumber: "(234) 567-8901",
              email: "user2@example.com",
              boxesRequested: 10,
              id: "2"
            },
            // Add as many as you need for testing
          ];
        }
      
        const data = fetchData();
        setRequests(data);
      
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
                            contactNumber={item.contactNumber}
                            email={item.email}
                            numBoxes={item.numBoxes}
                            id={item.id}
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
