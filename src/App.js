import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Movielist from './components/Movielist';
import Footer from './components/Footer';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchType, setSearchType] = useState('movie');
  const [loading, setLoading] = useState(true); // Initial loading state
  const [showMovieList, setShowMovieList] = useState(true); // To control movie list visibility

  useEffect(() => {
    moviesapi();
  }, []);

  const moviesapi = async () => {
    setLoading(true); // Start loading
    let page = 1;
    let allMovies = [];

    // Fetch until there are no more results left
    while (true) {
      const url = `https://www.omdbapi.com/?s=avengers&type=${searchType}&page=${page}&apikey=72024e41`;

      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.Search && responseJson.Search.length > 0) {
        allMovies = allMovies.concat(responseJson.Search);
        page++;
      } else {
        break; // No more results
      }
    }

    setMovies(allMovies);
    setLoading(false); // Stop loading
   
  };

  const search = async () => {
    const name = document.getElementById("searchBar").value;

    setLoading(true); // Start loading
    let page = 1;
    let allMovies = [];

    // Fetch until there are no more results left
    while (true) {
      const url = `https://www.omdbapi.com/?s=${name}&type=${searchType}&page=${page}&apikey=72024e41`;

      const response = await fetch(url);
      const responseJson = await response.json();

      if (responseJson.Search && responseJson.Search.length > 0) {
        allMovies = allMovies.concat(responseJson.Search);
        page++;
      } else {
        break; // No more results
      }
    }

    setMovies(allMovies);

    setLoading(false); // Stop loading
    setShowMovieList(true); // Show movie list after search
    
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleBackToMovieList = () => {
    setShowMovieList(true);
  };

  return (
    <div className='total'>
      <div className='header'>
        <div className='title'>M<span className='span'>o</span>V<span className='span'>i</span>E<span className='span'>s</span></div>
        <div className='search-controls'>
          <input
            type='text'
            id='searchBar'
            placeholder='Search...'
          />
          <div id='search-controls2'>
            <select
              id='searchType'
              value={searchType}
              onChange={handleSearchTypeChange}
            >
              <option value='movie'>Movie</option>
              <option value='series'>Series</option>
            </select>
            <button id='searchButton' onClick={search}>
              Search
            </button>
          </div>
        </div>
      </div>
      {loading ? (
        <div className='loading-container'>
          <div className='loading'>Loading...</div>
        </div>
      ) : (
        <div className='row'>
          {/* Use Bootstrap column class to create a responsive column */}
          {showMovieList ? (
            <Movielist movies={movies}  onMovieClick={() => setShowMovieList(false)} />

          ) : (
            <button className="back-button" onClick={handleBackToMovieList}>
              Back to Movie List
            </button>
          )}
        </div>
      )}

      <Footer></Footer>
    </div>
  );
}

export default App;
