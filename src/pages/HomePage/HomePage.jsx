import { useEffect, useState } from "react";
import css from "./HomePage.module.css"
import MovieList from "../../components/MovieList/MovieList";
import { fetchTrendingMovies } from "../../utils/api";
import Loader from "../../components/Loader";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);
  return (
    <div className={css.home}>
      {loading && <Loader />}
      <h1 className={css.title}>Trending Movies</h1>
      <MovieList data={movies} />
    </div>
  );
}

export default HomePage;
