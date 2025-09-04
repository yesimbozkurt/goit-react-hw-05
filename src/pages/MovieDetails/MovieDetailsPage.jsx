import React from "react";
import { Link, Outlet } from "react-router-dom";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";

function MovieDetailsPage() {
  return (
    <div>
      <button onClick={() => window.history.back()}>Go Back</button>
      <div>
        <h2>MovieDetailsPage</h2>

      </div>
      <Link to="cast"><MovieCast /></Link>
      <Link to="reviews"><MovieReviews /></Link>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
