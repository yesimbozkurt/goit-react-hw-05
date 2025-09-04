import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import { fetchSearchedMovies } from "../../utils/api";

function MoviesPage() {
  const id = 1;
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
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

  return (
    <div>
      <h3>MoviesPage</h3>
      <MovieList movies={movies} />
      <button onClick={() => navigate("/movie/" + id)}>more details</button>
    </div >
  );
}

export default MoviesPage;
