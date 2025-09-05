import css from "./MovieCast.module.css";
import { useEffect, useState } from "react";
import { fetchMovieCasts } from "../../utils/api";
import { useParams } from "react-router-dom";
const MovieCast = () => {
  const [casts, setCasts] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    const getCast = async () => {
      try {
        const data = await fetchMovieCasts(movieId);
        setCasts(data);
      } catch (error) {
        console.error(error);
      }
    };
    getCast();
  }, [movieId]);
  return (
    <div className={css.castContainer}>
      <p>Cast</p>
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
            <p className={css.actorName}>{cast.name}</p>
            <p className={css.actorRole}>{cast.character}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MovieCast;
