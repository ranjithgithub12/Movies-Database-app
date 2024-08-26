import './index.css'
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import ApiGetMovies from '../ApiGetMovies'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstants.initial, popularMovie: [], pageNo: 1}

  componentDidMount() {
    this.getHomePageMovie()
  }

  onClickNextPage = () => {
    this.setState(
      prevState => ({pageNo: prevState.pageNo + 1}),
      this.getHomePageMovie,
    )
  }

  onClickPrevPage = () => {
    const {pageNo} = this.state

    if (pageNo > 1) {
      this.setState(
        prevState => ({pageNo: prevState.pageNo - 1}),
        this.getHomePageMovie,
      )
    }
  }

  getHomePageMovie = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const {pageNo} = this.state

    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=6e077499d3465c6f3708cbff69edcd12&language=en-US&page=${pageNo}`

    const options = {
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)

      if (response.ok === true) {
        const data = await response.json()

        const updatedData = data.results.map(eachItem => ({
          adult: eachItem.adult,
          backdropPath: eachItem.backdrop_path,
          genreIds: eachItem.genre_ids,
          id: eachItem.id,
          originalLanguage: eachItem.original_language,
          originalTitle: eachItem.original_title,
          overview: eachItem.overview,
          popularity: eachItem.popularity,
          posterPath: eachItem.poster_path,
          releaseDate: eachItem.release_date,
          title: eachItem.title,
          video: eachItem.video,
          voteAverage: eachItem.vote_average,
          voteCount: eachItem.vote_count,
        }))

        this.setState({
          popularMovie: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      console.log('Fetch error', error)
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div>
      <div className="home-loader-container">
        <Loader type="TailSpin" color="#D81F26" height={50} with={50} />
      </div>
    </div>
  )

  onClickRetry = () => {
    this.getHomePageMovie()
  }

  renderSuccessView = () => {
    const {popularMovie, pageNo} = this.state

    console.log(pageNo)
    return (
      <div>
        <ul className="unorder-popular-movies">
          {popularMovie.map(eachItem => (
            <ApiGetMovies popularMoviePoster={eachItem} key={eachItem.id} />
          ))}
        </ul>
        <div className="page-no-container">
          <button
            type="button"
            className="page-no-button"
            onClick={this.onClickNextPage}
          >
            Next
          </button>
          <p>{pageNo}</p>

          <button
            type="button"
            className="page-no-button"
            onClick={this.onClickPrevPage}
          >
            Prev
          </button>
        </div>
      </div>
    )
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

  renderHomePageList = () => {
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
    return (
      <div>
        <Header />
        {this.renderHomePageList()}
      </div>
    )
  }
}

export default Home
