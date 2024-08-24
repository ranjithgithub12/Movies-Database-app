import './index.css'

import {Component} from 'react'
import Loader from 'react-loader-spinner'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class CastMovieDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, castMovieList: []}

  componentDidUpdate(prevProps) {
    const {movieId} = this.props
    if (prevProps.movieId !== movieId) {
      this.getCastMovieDetails()
    }
  }

  getCastMovieDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {movieId} = this.props
    console.log(movieId)
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=6e077499d3465c6f3708cbff69edcd12&language=en-US`
    try {
      const response = await fetch(apiUrl)
      if (response.ok) {
        const data = await response.json()
        const updateData = data.cast.map(eachItem => ({
          id: eachItem.id,
          originalName: eachItem.original_name,
          profilePath: eachItem.profile_path,
          character: eachItem.character,
        }))
        this.setState({
          castMovieList: updateData,
          apiStatus: apiStatusConstants.success,
        })
        console.log(data)
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      console.error('Fetch error:', error)
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {castMovieList} = this.state
    return (
      <div>
        <ul className="unorder-list-of-cast-movie">
          {castMovieList.map(eachItem => (
            <li className="list-of-cast-movie">
              <img
                src={`https://image.tmdb.org/t/p/w500${eachItem.profilePath}`}
                className="cast-movie-image"
              />
              <h3>{eachItem.originalName}</h3>
              <p>CharacterName:{eachItem.character}</p>
            </li>
          ))}
        </ul>
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
    this.getCastMovieDetails()
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

  renderCastMovies = () => {
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
    return <div>{this.renderCastMovies()}</div>
  }
}

export default CastMovieDetails
