import { Link, Outlet, useParams } from "react-router-dom";
import css from "./MovieDetailsPage.module.css"
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../../utils/api";
import Loader from "../../components/Loader";

function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovie = async () => {
      setLoading(true);
      try {
        if (!movieId) {
          setError("Geçersiz film ID'si.");
          return;
        }
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Film bilgileri alınamadı.");
      } finally {
        setLoading(false);
      }
    };
    getMovie();
  }, [movieId]);
  return (
    <div className={css.detailsContainer}>
      {loading && <Loader />}
      <button className={css.backButton} onClick={() => window.history.back()}>Go Back</button>
      <h2 className={css.title}>Movie Details</h2>
      <div className={css.detailsContent}>
        {movie && (
          <div className={css.detailsContent}>
            <div>
              <img className={css.poster} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            </div>
            <div className={css.detailsContext}>
              <h3>{movie.title}</h3>
              <p className={css.bold}>Overview:</p><p>{movie.overview}</p>
              <p className={css.bold}>Genres:</p> <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
              <p className={css.bold}>Release Date:</p> <p> {movie.release_date}</p>
              <p className={css.bold}>Rating:</p> <p>{Math.round(movie.vote_average)}/10</p>
            </div>
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <Link to="cast" className={css.link}>Casts</Link>
      <Link to="reviews" className={css.link}>Reviews</Link>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
