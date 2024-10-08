import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import FullMovieDetails from '../FullMovieDetails'
import CastMovieDetails from '../CastMovieDetails'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class SingleMovieDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    singleMovieDetail: [],
    movieId: '',
  }

  componentDidMount() {
    this.getSingleMoviesDetails()
  }

  getSingleMoviesDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({movieId: id})
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=6e077499d3465c6f3708cbff69edcd12&language=en-US`

    try {
      const response = await fetch(apiUrl)
      if (response.ok) {
        const data = await response.json()

        const updatedata = {
          id: data.id,
          title: data.title,
          posterPath: data.poster_path,
          overview: data.overview,
          voteAverage: data.vote_average,
          runtime: data.runtime,
          genres: data.genres,
          releaseDate: data.release_date,
        }

        this.setState({
          singleMovieDetail: updatedata,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      console.error('Fetch error:', error)
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {singleMovieDetail} = this.state

    return (
      <div>
        <FullMovieDetails movieDetails={singleMovieDetail} />
      </div>
    )
  }

  renderLoadingView = () => (
    <div>
      <div className="home-loader-container">
        <Loader type="TailSpin" color="#D81F26" height={50} with={50} />
      </div>
    </div>
  )

  onClickRetry = () => {
    this.getSingleMoviesDetails()
  }

  renderFailureView = () => (
    <div>
      <div className="failure-view-container-home">
        <img
          src="https://res.cloudinary.com/dl5cirycu/image/upload/v1715853966/uerlyizxuzzpuoqz9f4k.png"
          alt="failure view"
          className="failure-view-home"
        />
        <p className="failure-view-content-home">
          Something went wrong. Please try again
        </p>
        <button
          type="button"
          className="retry-button-home"
          onClick={this.onClickRetry}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderSingleMovieDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {movieId} = this.state
    return (
      <div className="full-movie-details">
        <Header />
        <div className="movie-details-container">
          {this.renderSingleMovieDetails()}
        </div>
        <h1 className="cast-heading">Cast Details</h1>
        <div className="cast-movie-contianers">
          <CastMovieDetails movieId={movieId} />
        </div>
      </div>
    )
  }
}

export default SingleMovieDetails
