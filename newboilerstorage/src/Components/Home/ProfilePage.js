import React, { useState } from 'react';
import NavBar from '../Home/NavBar';

function ProfilePage() {
    const [isEditMode, setIsEditMode] = useState(false);
    const [user, setUser] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        contactNumber: "123-456-7890",
        address: "123 Main St, Anytown, USA"
    });

    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    };

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    return (
        <div>
            <NavBar></NavBar>
            <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
                <h1 className="text-2xl font-bold py-6">Profile Page</h1>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-10">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Name</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {isEditMode ? 
                                        <input 
                                            type="text" 
                                            name="name" 
                                            value={user.name} 
                                            onChange={handleChange} 
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        /> :
                                        <p>{user.name}</p>
                                    }
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {isEditMode ? 
                                        <input 
                                            type="text" 
                                            name="email" 
                                            value={user.email} 
                                            onChange={handleChange} 
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        /> :
                                        <p>{user.email}</p>
                                    }
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Contact Number</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {isEditMode ? 
                                        <input 
                                            type="text" 
                                            name="contactNumber" 
                                            value={user.contactNumber} 
                                            onChange={handleChange} 
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        /> :
                                        <p>{user.contactNumber}</p>
                                    }
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Address</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {isEditMode ? 
                                        <input 
                                            type="text" 
                                            name="address" 
                                            value={user.address} 
                                            onChange={handleChange} 
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        /> :
                                        <p>{user.address}</p>
                                    }
                                </dd>
                            </div>
                        </dl>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
    type="button"
    style={{backgroundColor: '#CEB888'}}
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
