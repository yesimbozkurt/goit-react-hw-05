import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchSearchedMovies } from "../../utils/api";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader";

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
    <div >
      <h3>MoviesPage</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Search movies"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
        >search</button>
      </form>

      {!loading && movies.length > 0 && (
        <ul>
          {loading && <Loader />}
          {/* {!loading && movies.length === 0 && <p>No movies found</p>} */}
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                {movie.title || movie.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Toaster position="top-right" />
    </div >
  );
}

export default MoviesPage;
