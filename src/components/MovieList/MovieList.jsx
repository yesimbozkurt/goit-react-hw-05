import css from './MovieList.module.css'
import { Link } from 'react-router-dom'

const MovieList = () => {
    return (
        <div className={css.MovieListContainer}>
            <h1>MovieList</h1>
            {/* <ul className={css.MovieList}>
                {movies.map((movie) => (
                    <li key={movie.id} className={css.MovieItem}>
                        <Link to={`/movie/${movie.id}`}>
                            <p>{movie.title}</p>
                        </Link>
                    </li>
                ))}
            </ul> */}
        </div>
    )
}

export default MovieList
