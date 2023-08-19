import React, { useState, useEffect } from 'react';
import '../App.css'; // Import your custom CSS for MovieDetails component

const MovieDetails = (props) => {
  const [movieDetails, setMovieDetails] = useState({});
  const back = "< Back";
  
  useEffect(() => {
    search();
  }, []);

  const search = async () => {
  
    const url = `https://www.omdbapi.com/?i=${props.id}&apikey=72024e41`;

    const response = await fetch(url);
    const responseJson = await response.json();
    setMovieDetails(responseJson);
  };

  // Generate the dynamic link based on movieDetails
  const generateLink = () => {
    return `https://www.youtube.com/results?search_query=${movieDetails.Title}+official+trailer`;
  };

  const goBack = () => {
    // Navigate back to the previous page
    props.onBackClick();
  };

  return (
    <div className="movie-details-container">
      <button className="back-button" onClick={goBack}>{back}</button>
      <div className="movie-details">
        
        <div className="movie-poster">
          {movieDetails.Poster !== 'N/A' ? (
            <img src={movieDetails.Poster} alt="poster" />
          ) : (
            <p></p>
          )}
        </div>
        <div className="movie-info">
          <h2 className="title1">{movieDetails.Title}</h2>
          <p><strong>Released:</strong> {movieDetails.Released}</p>
          <p><strong>Runtime:</strong> {movieDetails.Runtime}</p>
          <p><strong>Genre:</strong> {movieDetails.Genre}</p>
          <p><strong>Director:</strong> {movieDetails.Director}</p>
          <p><strong>Writer:</strong> {movieDetails.Writer}</p>
          <p><strong>Actors:</strong> {movieDetails.Actors}</p>
          <p><strong>Language:</strong> {movieDetails.Language}</p>
          <p><strong>Awards:</strong> {movieDetails.Awards}</p>
          <p><strong>IMDb Rating:</strong> {movieDetails.imdbRating}</p>
          <p><strong>Box Office:</strong> {movieDetails.BoxOffice}</p>
          <p>
            <strong>Trailer:</strong>
            <a style={{ textDecoration: "none" }} href={generateLink()} target="_blank" rel="noopener noreferrer">
              Watch Trailer
            </a>
          </p>
          
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
