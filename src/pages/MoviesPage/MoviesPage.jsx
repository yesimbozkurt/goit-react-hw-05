import { useEffect, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { fetchSearchedMovies } from "../../utils/api";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error | empty

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchSearchedMovies();
        setMovies(data);
      } catch (error) {
        console.error(error);
      }
    };
    getMovies();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query) {
      alert("Please enter a search term");
      return;
    }
    setStatus("loading");
    try {
      const data = await fetchSearchedMovies(query);
      setMovies(Array.isArray(data) ? data : (data?.results ?? []));
      const hasAny =
        (Array.isArray(data) && data.length > 0) ||
        (Array.isArray(data?.results) && data.results.length > 0);

      setStatus(hasAny ? "idle" : "empty");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };
  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  return (
    <div>
      <h3>MoviesPage</h3>
      <form>
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
      {status === "loading" && <p>Aranıyor...</p>}
      {status === "error" && (
        <p>Bir şeyler ters gitti. Lütfen daha sonra tekrar dene.</p>
      )}
      {status === "empty" && (
        <p>"{inputValue}" için sonuç bulunamadı.</p>
      )}
      {movies.length > 0 && (
        <ul>
          {movies.map((movie) => {
            const year =
              movie?.release_date?.slice(0, 4) ||
              movie?.first_air_date?.slice(0, 4) ||
              "";
            return (
              <li key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  {movie.title || movie.name} {year && `(${year})`}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

    </div >
  );
}

export default MoviesPage;
