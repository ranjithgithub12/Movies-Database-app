import './index.css'

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ApiGetMovies from '../ApiGetMovies'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SearchBar extends Component {
  state = {
    searchInput: '',
    searchMovieList: [],
    apiStatus: apiStatusConstants.initial,
  }

  changeSearchInput = value => {
    this.setState({searchInput: value})
  }

  onClicksearchIcon = () => {
    const {searchInput} = this.state
    const lengthOfInput = searchInput.length

    if (lengthOfInput > 0) {
      this.getSearchMovies()
    } else {
      this.setState({searchMovieList: []})
    }
  }

  onEnterKeyDown = () => {
    const {searchInput} = this.state
    const lengthOfInput = searchInput.length

    if (lengthOfInput > 0) {
      this.getSearchMovies()
    } else {
      this.setState({searchMovieList: []})
    }
  }

  getSearchMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const {searchInput} = this.state

    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=6e077499d3465c6f3708cbff69edcd12&language=en-US&query=${searchInput}&page=1`

    try {
      const response = await fetch(apiUrl)
      if (response.ok) {
        const data = await response.json()
        const updateData = data.results.map(eachItem => ({
          backdropPath: eachItem.backdrop_path,
          id: eachItem.id,
          originalTitle: eachItem.original_title,
          posterPath: eachItem.poster_path,
          title: eachItem.title,
          voteAverage: eachItem.vote_average,
        }))

        this.setState({
          searchMovieList: updateData,
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

  renderLoadingView = () => (
    <div>
      <div className="home-loader-container">
        <Loader type="TailSpin" color="#D81F26" height={50} with={50} />
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {searchMovieList} = this.state
    return (
      <div>
        <ul className="unorder-popular-movies">
          {searchMovieList.map(eachItem => (
            <ApiGetMovies popularMoviePoster={eachItem} key={eachItem.id} />
          ))}
        </ul>
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

  renderSearchBarView = () => {
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
    const {searchInput} = this.state
    return (
      <div>
        <Header
          onClicksearch={this.onClicksearchIcon}
          changeSearchInput={this.changeSearchInput}
          searchInput={searchInput}
          onEnterKeyDown={this.onEnterKeyDown}
        />
        {this.renderSearchBarView()}
      </div>
    )
  }
}

export default SearchBar
