import css from './MovieList.module.css'
import { Link } from 'react-router-dom'

const MovieList = ({ data }) => {
    return (
        <div className={css.MovieListContainer}>
            <ul className={css.MovieList}>
                {data.map((movie) => (
                    <li key={movie.id} className={css.MovieItem}>
                        <Link to={`/movies/${movie.id}`}>
                            <div className={css.MovieCard}>
                                <img
                                    src={
                                        movie.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                            : 'https://dummyimage.com/200x300/000000/fff.jpg&text=image+not+found'
                                    }
                                    alt={movie.title}
                                    className={css.MoviePoster}
                                />
                                <p className={css.MovieTitle}>{movie.title}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MovieList
