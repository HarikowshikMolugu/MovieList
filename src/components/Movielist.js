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

  return (
    <div>
      {showDetails ? (
        <div className="movie-container">
          {props.movies.map((movie, index) => (
            <div
              key={index}
              className="movie-item"
              onClick={() => handleImageClick(movie.imdbID, movie.Poster)}
            >
              <p style={{ color: 'grey' }}>{movie.Title}</p>
              {movie.Poster !== 'N/A' ? (
                <img src={movie.Poster} alt="movie" />
              ) : (
                <p style={{color:'red'}}>Poster not available</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <MovieDetail id={id}></MovieDetail>
      )}
    </div>
  );
};

export default Movielist;
