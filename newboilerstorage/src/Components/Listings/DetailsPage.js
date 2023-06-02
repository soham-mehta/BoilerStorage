import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../Home/NavBar';

function DetailsPage() {
    const [listingDetails, setListingDetails] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        // Mock data
        setListingDetails({
            ownerName: 'John Doe',
            contactNumber: '+1234567890',
            address: '123 Main St, Anytown, USA',
            datesAvailable: ['2023-05-26', '2023-05-27', '2023-05-28'],
            numBoxesLeft: 5,
            photos: [
                { url: 'https://via.placeholder.com/150', description: 'Photo 1' },
                { url: 'https://via.placeholder.com/150', description: 'Photo 2' },
                { url: 'https://via.placeholder.com/150', description: 'Photo 3' },
            ],
        });
    }, [id]);

    if (!listingDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <NavBar></NavBar>
            <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
                <div className="mt-6 sm:mt-8 md:mt-16 lg:mt-20 xl:mt-28">
                    <h1 className="text-4xl font-bold text-gray-900">{listingDetails.ownerName}</h1>
                    <p className="mt-4 text-xl text-gray-500">Contact Number: {listingDetails.contactNumber}</p>
                    <p className="mt-4 text-xl text-gray-500">Address: {listingDetails.address}</p>
                    <p className="mt-4 text-xl text-gray-500">Dates Available: {listingDetails.datesAvailable.join(', ')}</p>
                    <p className="mt-4 text-xl text-gray-500">Number of Boxes Left: {listingDetails.numBoxesLeft}</p>
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-gray-900">Photos:</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                            {listingDetails.photos.map((photo, index) => (
                                <div key={index} className="rounded overflow-hidden shadow-lg">
                                    <img className="w-full" src={photo.url} alt={photo.description} />
                                </div>
                            ))}
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



export default DetailsPage;





