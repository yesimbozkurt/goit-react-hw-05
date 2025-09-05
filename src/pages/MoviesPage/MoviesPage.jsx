import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchSearchedMovies } from "../../utils/api";
import toast from "react-hot-toast";

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
    console.log(query);
    if (!query) {
      toast.error("Please enter a search term");
      return;
    }
    setLoading(true);
    try {
      const data = await fetchSearchedMovies(query);
      setMovies(Array.isArray(data) ? data : (data?.results ?? []));
      console.log(data);
    } catch (error) {
      console.error(error);
      toast.error("Arama sırasında bir hata oluştu");
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
          {loading && <p>Loading...</p>}
          {!loading && movies.length === 0 && <p>No movies found</p>}
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                {movie.title || movie.name}
              </Link>
            </li>
          ))}
        </ul>
      )}

    </div >
  );
}

export default MoviesPage;
