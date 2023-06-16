import React from 'react';

function Error({ setError, content }) {
    return (
        <div style={{ backgroundColor: '#CEB888', color: 'white' }} className="fixed top-20 left-1/2 h-15 w-1/5 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 text-black rounded shadow-lg">
            <button
                className="absolute top-2 right-2 text-white text-l font-bold hover:text-gray-200 focus:outline-none"
                onClick={() => setError(false)}
            >
                &times;
            </button>
            <br></br>
            <div className='flex justify-center'>
                <p className="mb-4">{content}</p>
            </div>

        </div>
    )
}

export default Error;