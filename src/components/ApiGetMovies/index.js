import './index.css'
import {Link} from 'react-router-dom'

const ApiGetMovies = props => {
  const {popularMoviePoster} = props
  const {posterPath, id, title, voteAverage} = popularMoviePoster

  return (
    <li className="list-of-popular-movies">
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
        className="popular-poster-image"
      />
      <h1 className="popular-poster-heading">{title}</h1>
      <p> Rating: {voteAverage}</p>
      <Link to={`/movies/${id}`}>
        <button>View Details</button>
      </Link>
    </li>
  )
}

export default ApiGetMovies
