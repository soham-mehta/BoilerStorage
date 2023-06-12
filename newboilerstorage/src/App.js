import React from 'react';
import Home from './Components/Home/Home';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import Login from './Components/Auth/Login';
import SignUp from './Components/Auth/SignUp';
import AddListing from './Components/Home/AddNewListing';
import ListingCard from './Components/Listings/ListingCard';
import ListingPage from './Components/Listings/ListingPage';
import ProfilePage from './Components/Home/ProfilePage';
import DetailsPage from "./Components/Listings/DetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/SignUp/' Component={SignUp} />
        <Route exact path='/Login/' Component={Login} />
        <Route exact path='/' element={<Home loggedIn={false}/>} />
        <Route exact path='/home/:id' element={<Home loggedIn={true}/>} />
        <Route exact path='/addlisting/:id' Component={AddListing} />
        <Route exact path='/ListingPage' Component={ListingPage} />
        <Route exact path='/profile/:id' element={<ProfilePage />} />
        <Route path="/details/:id" Component={DetailsPage} />
      </Routes>
    </Router>
  );
}

export default App;
