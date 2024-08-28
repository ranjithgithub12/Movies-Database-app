import './index.css'

import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

class Header extends Component {
  onClickSearchIcon = () => {
    const {onClicksearch, match} = this.props
    const {path} = match
    if (path === '/search') {
      onClicksearch()
    }
  }

  onChangeSearchInput = event => {
    const {changeSearchInput} = this.props
    changeSearchInput(event.target.value)
  }

  enterKeyDown = event => {
    const {onEnterKeyDown} = this.props
    if (event.key === 'Enter') {
      onEnterKeyDown()
    }
  }

  render() {
    const {match} = this.props
    const {path} = match

    let homeStyleClassName
    let topratedClassName
    let upcomingClassName

    switch (path) {
      case '/':
        homeStyleClassName = 'active'
        topratedClassName = 'inactive'
        upcomingClassName = 'inactive'
        break
      case '/top-rated':
        homeStyleClassName = 'inactive'
        topratedClassName = 'active'
        upcomingClassName = 'inactive'
        break
      case '/upcoming':
        homeStyleClassName = 'inactive'
        topratedClassName = 'inactive'
        upcomingClassName = 'active'
        break
      default:
        homeStyleClassName = 'inactive'
        topratedClassName = 'inactive'
        upcomingClassName = 'inactive'
        break
    }
    const {searchInput} = this.props
    return (
      <nav className="nav-container">
        <h1 className="header-heading">movieDB</h1>
        <div className="unorder-list-header">
          <Link to="/" className="link-header">
            <h1 className={`list-of-header ${homeStyleClassName}`}>Popular</h1>
          </Link>
          <Link to="/top-rated" className="link-header">
            <h1 className={`list-of-header ${topratedClassName}`}>Top Rated</h1>
          </Link>
          <Link to="/upcoming" className="link-header">
            <h1 className={`list-of-header ${upcomingClassName}`}>Upcoming</h1>
          </Link>
        </div>
        <div className="search-container">
          <Link to="/search" className="link-header link-search">
            <input
              type="text"
              className="input-search"
              value={searchInput}
              onChange={this.onChangeSearchInput}
              onKeyDown={this.enterKeyDown}
            />
          </Link>
          <button
            type="button"
            className="search-button"
            onClick={this.onClickSearchIcon}
          >
            Search
          </button>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
