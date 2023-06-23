import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Home/NavBar';
import { useNavigate } from 'react-router-dom';
import Error from '../Home/Error'; // Assuming the Message component is in the same directory

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = `${process.env.REACT_APP_API_URL}/login`
      const res = await axios.post(url, { email: email, password: password })
      if (res.data.success === true) {
        setSuccessMessage("Logged in successfully");
        setTimeout(() => {
          navigate(`/home/${res.data.details.id}/${res.data.details.isHost}`, { state: { firstName: res.data.details.firstName, lastName: res.data.details.lastName }, replace: true });
        }, 1000);
      } else {
        setErrorMessage(res.data.notExist ? "Account has not been signed up" : "Invalid credentials");
      }
    } catch (err) {
      setErrorMessage("Error occurred while logging in");
    }
  };

  return (
    <div>
      <Navbar id={""} isHost={""} />
      {errorMessage && <Error setError={setErrorMessage} content={errorMessage} />}
      {successMessage && <Error setError={setSuccessMessage} content={successMessage} />}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-custom-color p-10 rounded-xl">

          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Log in to your account
          </h2>
          <form className="mt-8 space-y-6" action="#" onSubmit={onSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                style={{ backgroundColor: '#CEB888', hover: { backgroundColor: '#CEB888' } }}
              >
                Log in
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

export default LogIn;
