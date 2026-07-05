import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieDetails, getMovieTrailer } from "../services/api";
import "../css/Moviedetails.css";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);

        const trailerData = await getMovieTrailer(id);

        const officialTrailer = trailerData.find(
          (video) => video.site === "YouTube"
        );

        setTrailer(officialTrailer?.key);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading || !movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>Rating: {movie.vote_average}</p>

      {trailer && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${trailer}`}
          title="Movie Trailer"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}

export default MovieDetails;