import React, { useState, useEffect } from 'react';


const MovieDetails = (props) => {
  const [movieDetails, setMovieDetails] = useState({});
  const [trailerLink, setTrailerLink] = useState(null);
  const back = "< Back";

  useEffect(() => {
    search();
  }, []);

  const search = async () => {
    const url = `https://www.omdbapi.com/?i=${props.id}&apikey=72024e41`;
    const response = await fetch(url);
    const responseJson = await response.json();
    setMovieDetails(responseJson);
    const titleWithoutSpecialChars = removeSpecialChars(responseJson.Title);
    console.log(titleWithoutSpecialChars);

    
    fetchTrailerLink(titleWithoutSpecialChars);
  };

  const removeSpecialChars = (title) => {
    return title.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '');
  };

  const fetchTrailerLink = async (title) => {
    try {
      const apiUrl = `https://pipedapi.kavin.rocks/search?q=${title}+official+trailer&filter=all`;
      console.log(apiUrl);
      const response = await fetch(apiUrl);
      
      const searchData = response.data;

      if (searchData.items && searchData.items.length > 0) {
        const firstVideoUrl = searchData.items[0].url;
        console.log('url', firstVideoUrl);
        const youtubeUrl = 'https://www.youtube.com';
        const videoLink = `${youtubeUrl}${firstVideoUrl}`;
        setTrailerLink(videoLink);
      }
    } catch (error) {
      console.error('Error fetching trailer link:', error);
    }
  };

  const goBack = () => {
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
          {trailerLink && (
            <p>
              <strong>Trailer:</strong>
              <a style={{ textDecoration: "none" }} href={trailerLink} target="_blank" rel="noopener noreferrer">
                Watch Trailer
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
