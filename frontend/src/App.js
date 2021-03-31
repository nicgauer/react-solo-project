import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';
import SignUpFormPage from './components/SignUpFormPage';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import NewArtistPage from './components/NewArtist';
import ArtistPage from './components/ArtistPage';
import CreateNewRelease from './components/CreateNewRelease';
import ReleasePage from './components/ReleasePage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() =>{
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch])

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route path='/new-artist'>
              <NewArtistPage />
            </Route>

            <Route path='/signup'>
              <SignUpFormPage />
            </Route>

            <Route path='/new-release'>
              <CreateNewRelease />
            </Route>

            <Route path='/' exact>
              <HomePage />
            </Route>

            <Route path='/:url' exact>
                <ArtistPage />
            </Route>
   
            <Route path='/:url/:release'>
                <ReleasePage />
            </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
