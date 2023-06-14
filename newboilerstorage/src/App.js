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
import ListingPage from './Components/Listings/ListingPage';
import ProfilePage from './Components/Home/ProfilePage';
import DetailsPage from "./Components/Listings/DetailsPage";
import EditListing from "./Components/Listings/EditListing";
import EditListingForm from './Components/Listings/EditListingForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/SignUp/' Component={SignUp} />
        <Route exact path='/Login/' Component={Login} />
        <Route exact path='/' element={<Home loggedIn={false}/>} />
        <Route exact path='/home/:id/:isHost' element={<Home loggedIn={true}/>} />
        <Route exact path='/addlisting/:id' Component={AddListing} />
        <Route exact path='/editlisting/:id' Component={EditListing} />
        <Route exact path='/ListingPage' element={<ListingPage />} />
        <Route exact path='/ListingPage/:id/:isHost' element={<ListingPage />} />
        <Route exact path='/profile/:id/:isHost' element={<ProfilePage />} />
        <Route path="/details/:id" Component={DetailsPage} />
        <Route exact path = '/edit/details/:id' element = {<EditListingForm />} />
      </Routes>
    </Router>
  );
}

export default App;
