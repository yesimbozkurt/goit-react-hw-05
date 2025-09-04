import { useEffect, useState } from "react";
import css from "./HomePage.module.css"
import MovieList from "../../components/MovieList/MovieList";
import { fetchTrendingMovies } from "../../utils/api";

function HomePage() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
        console.log(data);

      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);
  return (
    <div className={css.home}>
      <MovieList data={movies} />
    </div>
  );
}

export default HomePage;
