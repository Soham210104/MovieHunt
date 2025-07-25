import React, {useEffect ,useState } from 'react'
import Search from './component/Search'
import Spinner from './component/Spinner';
import MovieCard from './component/MovieCard';


const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers:{
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const[errorMessage, setErrorMessage] = useState('');
  const[movieList, setMovieList] = useState([]);
  const[isLoading, setIsLoading] = useState(true);
  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try{
      const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS); 

      if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
      }

      const data = await response.json();

      if(data.Response === "False") {
        setErrorMessage(data.Error);
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

    }
    catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm]);

  return (
    <main>
      <div className="pattern" />

        <div className="wrapper">
          <header>
            <img src="./hero-img.png" alt="logo" />
            <h1>Find <span className="text-gradient">Movies</span> You will enjoy Without the Hassle</h1>
          </header>

          <section className="all-movies">
            <h2 className="mt-[20px]">All Movies</h2>

        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>  
            {isLoading ?(
              <p className='text-white'>
              <Spinner />
              </p>
            ) : errorMessage ? (
              <p className='text-red-500'>{errorMessage}</p>
            ) : (
              <ul>
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie}/>
                ))}
              </ul>
            )}
          </section>
      </div>
    </main>
  )
}

export default App