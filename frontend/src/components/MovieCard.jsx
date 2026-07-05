import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"
import {Link} from "react-router-dom";

function MovieCard({movie}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)

   async function onFavoriteClick(e) {
    console.log("heart click")
  e.preventDefault();

  try {
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
        console.log("sending request")
      await fetch("http://localhost:5000/api/movies/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: 1,
          movieId: movie.id,
          movieTitle: movie.title
        })
      });
    }
  } catch (error) {
    console.log(error);
  }
}

    return ( <Link to ={`/movie/${movie.id}`}>
        <div className="movie-card">
        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                </button>
            </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
            <p>{movie.release_date?.split("-")[0]}</p>
        </div>
    </div>
    </Link>)
}

export default MovieCard