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

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/SignUp/' Component={SignUp} />
        <Route exact path='/Login/' Component={Login} />
        <Route exact path='/' Component={Home} />
        <Route exact path='/addlisting' Component={AddListing} />
        <Route exact path='/listings' Component={ListingCard} />
        <Route exact path='/listings' Component={ListingPage} />
      </Routes>
    </Router>
  );
}

export default App;
