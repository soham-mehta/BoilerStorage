import React, { useState } from 'react';

import axios, * as others from 'axios';
import Navbar from '../Home/NavBar';


function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      console.log(process.env.REACT_APP_API_URL)
      const res = await axios.post(url, { email: email, password: password })
      console.log(res)
      if (res.data.success === true) {
        alert("Logged in")
      } else {
        alert(res.data.notExist ? "Account has not been signed up" : "Invalid credentials")
        console.log("Error to log in");
      }
    } catch (err) {
      console.log(err);
      console.log("Errored")
    }
  };

  return (
    <div>
      <Navbar></Navbar>
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
                value = {email}
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
                value = {password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <div>
          <button
  type="submit"
  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  style={{backgroundColor: '#CEB888', hover: {backgroundColor: '#CEB888'}}}
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
