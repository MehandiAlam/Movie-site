import {createContext, useState, useContext, useEffect} from "react"

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([])
useEffect(() => {
  const fetchFavorites = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/movies/favorites");
      const data = await response.json();

      setFavorites(data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchFavorites();
}, []);
   
     
    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])
    }

  const removeFromFavorites = (movieId) => {
  setFavorites(prev =>
    prev.filter(movie => (movie.movieId || movie.id) !== movieId)
  )
}

const isFavorite = (movieId) => {
  return favorites.some(movie => (movie.movieId || movie.id) === movieId)
}

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
} 