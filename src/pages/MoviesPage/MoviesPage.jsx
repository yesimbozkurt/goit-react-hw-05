import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchSearchedMovies } from "../../utils/api";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader";
import css from './MoviesPage.module.css';

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchSearchedMovies("");
        setMovies(Array.isArray(data) ? data : data?.results ?? []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query) {
      toast.error("Please enter a search term");
      return;
    }
    setLoading(true);
    try {
      const data = await fetchSearchedMovies(query);
      if (data.length === 0) {
        toast.error("No movies found");
      }
      setMovies(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  return (
    <div className={css.MoviesPage}>
      <h3 className={css.title}>
        The movie you are looking for is here.</h3>
      <form
        className={css.form}
        onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Search movies"
        />
        <button
          className={css.button}
          type="submit"
          disabled={!inputValue.trim()}
        >search</button>
      </form>
      {loading && <Loader />}
      {movies.length > 0 && (
        <ul className={css.list}>
          {movies.map((movie) => (
            <li className={css.item} key={movie.id}>
              <Link to={`/movies/${movie.id}`} className={css.link}>
                <img
                  src={movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://dummyimage.com/200x300/a6aae3/131a78.jpg&text=image+not+found'}
                  alt={movie.title || movie.name}
                  className={css.image}
                />
                {movie.title || movie.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Toaster position="bottom-right" />
    </div >
  );
}

export default MoviesPage;
