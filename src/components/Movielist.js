import React, { useState } from 'react';
import '../App.css'; // Import your custom CSS file
import MovieDetail from './MovieDetail';

const Movielist = (props) => {
  const [showDetails, setShowDetails] = useState(true);
  const [id, setId] = useState('');

  const handleImageClick = (imdbID, poster) => {
    console.log('Image clicked:', imdbID);
    setShowDetails(false);
    setId(imdbID);
  };

  const handleBackClick = () => {
    setShowDetails(true);
    setId('');
  };

  // Filter out movies with "N/A" posters
  const filteredMovies = props.movies.filter(movie => movie.Poster !== 'N/A');

  return (
    <div>
      {showDetails ? (
        <div>
          {/* Movie list */}
          <div className="movie-container">
            {filteredMovies.map((movie, index) => (
              <div
                key={index}
                className="movie-item"
                onClick={() => handleImageClick(movie.imdbID, movie.Poster)}
              >
                <p style={{ color: 'grey' }}>{movie.Title}</p>
                <img src={movie.Poster} alt="movie poster" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <MovieDetail id={id} onBackClick={handleBackClick} />
      )}
    </div>
  );
};

export default Movielist;
