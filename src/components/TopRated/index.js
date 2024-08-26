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

class TopRated extends Component {
  state = {apiStatus: apiStatusConstants.initial, topRated: [], pageNo: 1}

  componentDidMount() {
    this.getTopRatedMovies()
  }

  onClickNextPage = () => {
    this.setState(
      prevState => ({pageNo: prevState.pageNo + 1}),
      this.getTopRatedMovies,
    )
  }

  onClickPrevPage = () => {
    const {pageNo} = this.state

    if (pageNo > 1) {
      this.setState(
        prevState => ({pageNo: prevState.pageNo - 1}),
        this.getTopRatedMovies,
      )
    }
  }

  getTopRatedMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const {pageNo} = this.state

    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=6e077499d3465c6f3708cbff69edcd12&language=en-US&page=${pageNo}`

    try {
      const response = await fetch(apiUrl)
      if (response.ok) {
        const data = await response.json()
        const updatedData = data.results.map(eachItem => ({
          backdropPath: eachItem.backdrop_path,
          id: eachItem.id,
          originalTitle: eachItem.original_title,
          posterPath: eachItem.poster_path,
          title: eachItem.title,
          voteAverage: eachItem.vote_average,
        }))

        this.setState({
          topRated: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      console.error('fetch error::', error)
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
    this.getTopRatedMovies()
  }

  renderSuccessView = () => {
    const {topRated, pageNo} = this.state
    const moreThanOnePage = pageNo > 1
    return (
      <div>
        <ul className="unorder-popular-movies">
          {topRated.map(eachItem => (
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

  renderTopRateMovies = () => {
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
        {this.renderTopRateMovies()}
      </div>
    )
  }
}

export default TopRated
