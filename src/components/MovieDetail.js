import React, { useState, useEffect } from 'react';
import '../App.css'; // Import your custom CSS for MovieDetails component

const MovieDetails = (props) => {
  const [movieDetails, setMovieDetails] = useState({});
  const back ="< Back"
  useEffect(() => {
    search();
  }, []);

  const search = async () => {
    // Replace with your actual API key
    const url = `https://www.omdbapi.com/?i=${props.id}&apikey=72024e41`;

    const response = await fetch(url);
    const responseJson = await response.json();
    setMovieDetails(responseJson);
  };

  // Generate the dynamic link based on movieDetails
  const generateLink = () => {
    const title = movieDetails.Title
      ? movieDetails.Title
          .toLowerCase()
          .replace(/[^\w\s]/g, '-') // Replace special characters with a hyphen
          .replace(/\s+/g, '-') // Replace consecutive spaces with a single hyphen
          .replace(/-+/g, '-') // Replace consecutive hyphens with a single hyphen
          .replace(/^-|-$/g, '') // Remove hyphens from the beginning or end
      : '';

    const year = movieDetails.Released ? movieDetails.Released.substring(movieDetails.Released.length - 4) : '';
    const language = movieDetails.Language ? movieDetails.Language.toLowerCase().split(',')[0] : '';

    return `https://ww24.watchmovierulz.to/${title}-${year}-${language}/full-movie-watch-online-free-5-6580.html`;
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
            <strong>Link:</strong>
            <a style={{ textDecoration: "none" }} href={generateLink()} target="_blank" rel="noopener noreferrer">
              Get Movie
            </a>
          </p>
          
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
