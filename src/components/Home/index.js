import './index.css'
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstants.initial, popularMovie: []}

  componentDidMount() {
    this.getHomePageMovie()
  }

  getHomePageMovie = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})

    const apiURL = 'https://api.themoviedb.org/3/movie/popular?api_key=${c38cbc6058c0a23b4abf6f3d56079b1b}&language=en-US&page=1'
    const options = {
      method:'GET'
    }
    const response = await fetch(apiURL,options)
    const data = await response.json()
    console.log(data)
  }

  renderLoadingView = () => (
    <div>
      <div className="home-loader-container" testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} with={50} />
      </div>
    </div>
  )

  onClickRetry = () => {
    this.getHomePageMovie()
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
