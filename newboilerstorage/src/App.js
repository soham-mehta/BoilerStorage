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
import PreviewListing from './Components/Home/PreviewListing';
import { ListingContext, ListingProvider } from './Components/Home/AddListingContext';
import { EditContext, EditProvider } from './Components/Listings/EditListingContext';
import PreviewEdit from './Components/Listings/PreviewEdits';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/SignUp/' Component={SignUp} />
        <Route exact path='/Login/' Component={Login} />
        <Route exact path='/' element={<Home loggedIn={false} />} />
        <Route exact path='/home/:id/:isHost' element={<Home loggedIn={true} />} />
        <Route exact path='/addlisting/:id' element={<ListingProvider><AddListing /></ListingProvider>} />
        <Route exact path='/editlisting/:id' Component={EditListing} />
        <Route exact path='/ListingPage' element={<ListingPage />} />
        <Route exact path='/ListingPage/:id/:isHost' element={<ListingPage />} />
        <Route exact path='/profile/:id/:isHost' element={<ProfilePage />} />
        <Route path="/details/:id" Component={DetailsPage} />
        <Route exact path='/edit/details/:id' element={<EditProvider> <EditListingForm /> </EditProvider>} />
        <Route exact path='/edit/preview/:id' element={<EditProvider><PreviewEdit /></EditProvider>} />
        <Route exact path="/PreviewListing/:id" element={<ListingProvider><PreviewListing /></ListingProvider>} />
      </Routes>
    </Router>
  );
}

export default App;
