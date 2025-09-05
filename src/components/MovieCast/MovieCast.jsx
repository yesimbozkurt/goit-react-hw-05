import css from "./MovieCast.module.css";
import { useEffect, useState } from "react";
import { fetchMovieCasts } from "../../utils/api";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../Loader";

const MovieCast = () => {
  const [casts, setCasts] = useState([]);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCast = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieCasts(movieId);
        setCasts(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load casts");
      } finally {
        setLoading(false);
      }
    };
    getCast();
  }, [movieId]);

  return (
    <div className={css.castContainer}>
      {loading && <Loader />}
      {casts && casts.map((cast) => {
        return (
          <div key={cast.id} className={css.castItem}>
            <img
              src={
                cast.profile_path
                  ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={cast.name}
              className={css.castImage}
            />
            <p className={css.castName}>{cast.name}</p>
            <p className={css.actorRole}>The character of: "{cast.character}"</p>
          </div>
        );
      })}
    </div>
  );
};

export default MovieCast;
