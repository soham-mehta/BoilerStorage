import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../Home/NavBar';
import { useParams } from 'react-router-dom';
import axios, * as others from 'axios';
import Error from './Error';

function ProfilePage(props) {
    const { id, isHost } = useParams();
    const [isEditMode, setIsEditMode] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const org = useRef({});

    useEffect(() => {
        (async () => {
            try {
                const url = `${process.env.REACT_APP_API_URL}/details`
                console.log(process.env.REACT_APP_API_URL)
                const res = await axios.post(url, { id: id })
                console.log(res)
                if (res.data.success === true) {
                    console.log(res.data.details)
                    org.current = res.data.details;
                    setUser({...res.data.details });
                } else {
                    setError("Error to log in");
                }
            } catch (err) {
                setError("An unexpected error occurred");
            }
        })()
    }, [])

    const handleChange = (event) => {
        console.log(event.target.name);
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const toggleEditMode = async () => {
        try {
            if (isEditMode) {
                const url = `${process.env.REACT_APP_API_URL}/edit`;
                const res = await axios.post(url, { id: id, email: user.email, firstName: user.firstName, lastName: user.lastName, contactNumber: (user.contactNumber ? user.contactNumber : ""), changedEmail: (user.email !== org.current.email)})
                if (res.data.success) {
                    setSuccessMessage("Successfully changed!");
                } else {
                    setUser({...org.current});
                    setError("Failed to save changes");
                }
            }
        } catch (err) {
            setError("An unexpected error occurred while trying to save changes");
        }
        setIsEditMode(!isEditMode);
    };

    useEffect(() => {
        if (setSuccessMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [setSuccessMessage]);

    return (
        <div>
            <NavBar id = {id} isHost={isHost} />
            <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
                <h1 className="text-2xl font-bold py-6">Profile Page</h1>
                {successMessage && 
                <Error 
                    content={successMessage}
                    setError={() => setSuccessMessage("")} 
                />
            }
                {error && <Error content={error} />}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-10">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">First Name</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {isEditMode ?
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={(user.firstName) ? user.firstName : ""}
                                            onChange={handleChange}
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        /> :
                                        <p>{user.firstName}</p>
                                    }
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {isEditMode ?
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={(user.lastName) ? user.lastName : ""}
                                            onChange={handleChange}
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        /> :
                                        <p>{user.lastName}</p>
                                    }
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {isEditMode ?
                                        <input
                                            type="text"
                                            name="email"
                                            value={(user.email) ? user.email : ""}
                                            onChange={handleChange}
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        /> :
                                        <p>{user.email}</p>
                                    }
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Contact Number</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {isEditMode ?
                                        <input
                                            type="text"
                                            name="contactNumber"
                                            value={(user.contactNumber) ? user.contactNumber : ""}
                                            onChange={handleChange}
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        /> :
                                        <p>{user.contactNumber}</p>
                                    }
                                </dd>
                            </div>
                        </dl>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                type="button"
                                style={{ backgroundColor: '#CEB888' }}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={toggleEditMode}
                            >
                                {isEditMode ? 'Save Changes' : 'Edit Profile'}
                            </button>
                        </div>
                    </div>
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

export default ProfilePage;
