import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchMovieReviews } from "../../utils/api";
import css from "./MovieReviews.module.css"

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load reviews");
      }
    }
    getReviews();
  }, [movieId]);
  return (
    <div>
      <p>Movie Reviews</p>
      <div className={css.reviewsContainer}>{reviews && reviews.map((review) =>
        <p key={review.id}><span>{review.author}:</span> {review.content}</p>
      )}
      </div>
    </div>
  );
};

export default MovieReviews;
