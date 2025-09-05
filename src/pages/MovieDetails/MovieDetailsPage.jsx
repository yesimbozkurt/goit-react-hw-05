import { Link, Outlet } from "react-router-dom";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import css from "./MovieDetailsPage.module.css"
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../../utils/api";


function MovieDetailsPage() {
  const { movie, setMovie } = useState([]);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const data = await fetchMovieDetails();
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    };
    getMovie();
  })
  return (
    <div className={css.detailsContainer}>
      <button className={css.backButton} onClick={() => window.history.back()}>Go Back</button>
      <h2 className={css.title}>Movie Details</h2>
      <div className={css.detailsContent}>

        {/* Movie details content goes here */}
        <div>buraya film görseli gelecek</div>
        <div>buraya film bilgileri gelecek</div>
      </div>
      <Link to="cast" className={css.link}><MovieCast /></Link>
      <Link to="reviews" className={css.link}><MovieReviews /></Link>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
