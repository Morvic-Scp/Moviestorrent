import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MovieDetails from './page/MovieDetails'
import Home from "./page/Home"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import Movies from './components/Movies'

function App() {
  
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/movies/:movieID">
           
              <MovieDetails />
            
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App



