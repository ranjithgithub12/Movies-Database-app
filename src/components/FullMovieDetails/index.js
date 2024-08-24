import './index.css'

const FullMovieDetails = props => {
  const {movieDetails} = props
  const {
    id,
    posterPath,
    overview,
    title,
    voteAverage,
    runtime,
    genres,
    releaseDate,
  } = movieDetails

  const hour = Math.floor(runtime / 60)
  const minutes = runtime % 60

  return (
    <div className="details-first-container">
      <h1 className="movie-heading">{title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
        className="detail-image"
      />
      <p>{overview}</p>
      <div className="rating-duration-contianer">
        <div>
          <h3 className="headings">Rating</h3>
          <p>{voteAverage}</p>
        </div>
        <div>
          <h3 className="headings">Release Date</h3>
          <p>{releaseDate}</p>
        </div>
        <div>
          <h3 className="headings">Genres</h3>
          <div>
            {genres.map(each => (
              <p key={each.id}>{each.name}</p>
            ))}
          </div>
        </div>
        <div>
          <h3 className="headings">Duration</h3>
          <p>
            {hour}h {minutes}min{' '}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FullMovieDetails
