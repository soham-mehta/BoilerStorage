import React from 'react';
import Home from './Components/Home/Home';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import NavBar from './Components/Home/NavBar';
import Login from './Components/Home/Login';
import SignUp from './Components/Home/SignUp';

/* 
<Route path='/home/:authenticated/:name' Component={Home} />
<Route path='/login' Component={Login}/>
<Route path='/signup' Component={Signup} />
<Route path='/failed' Component={Error}/>
<Route path='/upload/:id' Component={Listing} />
<Route path= '/retrieve/:id' Component={RetrieveListing} />
*/

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/SignUp/' Component={SignUp} />
        <Route exact path='/Login/' Component={Login} />
        <Route exact path='/' Component={Home} />
        
      </Routes>
    </Router>
  );
}

export default App;
