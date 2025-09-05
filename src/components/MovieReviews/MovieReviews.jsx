import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchMovieReviews } from "../../utils/api";
import css from "./MovieReviews.module.css"
import Loader from "../Loader";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    }
    getReviews();
  }, [movieId]);
  return (
    <div>
      {loading && <Loader />}
      <div className={css.reviewsContainer}>{reviews && reviews.map((review) =>
        <p key={review.id}><span>{review.author}:</span> {review.content}</p>
      )}
        {reviews.length === 0 && <p>No reviews found</p>}
      </div>
    </div>
  );
};

export default MovieReviews;
