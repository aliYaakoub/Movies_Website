import { useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';

import './App.scss';
import MoviesHomePage from './Pages/MoviesHomePage';
import MovieDetails from './Pages/MovieDetails';
// import NowPlaying from './Components/movies/Movies';
// import TopRated from './Components/movies/TopRated';
// import Upcoming from './Components/movies/Upcoming';
import NotFound from './Pages/NotFound';

import TvHomePage from './Pages/TvHomePage';
// import Latest from './Components/tvShows/Latest';
// import OnTheAir from './Components/tvShows/OnTheAir';
import TvShowDetails from './Pages/TvShowDetails';
import TvSeasonDetails from './Pages/TvSeasonDetails';
// import AiringToday from './Components/tvShows/AiringToday';
// import Popular from './Components/tvShows/Popular';

function App() {

  const Base_Endpoint = `https://api.themoviedb.org/3`;
  const api_key = process.env.REACT_APP_API_KEY;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{
    const getConfig = async () => {
      let result;
      result = await axios.get(`${Base_Endpoint}/configuration?api_key=${api_key}`);
      localStorage.setItem('configData', JSON.stringify(result.data.images));
    }

    const getConfigData = JSON.parse(localStorage.getItem('configData'));

    if(!getConfigData){
      getConfig()
    }
  }, [Base_Endpoint, api_key])

  useEffect(()=>{
    if(location.pathname === '/'){
      navigate('/movies');
    }
  }, [location, navigate])

  return (
    <div className='container mx-auto max-w-screen-xl'>
      {/* <NavBar /> */}
      <AnimatePresence exitBeforeEnter>
        <Routes>
          <Route path='/movies' element={<MoviesHomePage />} />
          <Route path='/tvshows' element={<TvHomePage />} />
          <Route path='/movie/:id' element={<MovieDetails />} />
          <Route path='/tvshow/:id' element={<TvShowDetails />} />
          <Route path='/tvshow/:id/season_details/:season_number' element={<TvSeasonDetails />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
