import './index.css'

import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {IoSearch} from 'react-icons/io5'
import {MdMenuOpen} from 'react-icons/md'

class Header extends Component {
  state = {mobileViewHeader: false}

  onClickMobileBar = () => {
    this.setState({mobileViewHeader: true})
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
        <div>
          <Link to="/search" className="link-header link-search">
            <input type="search" className="input-search" />
            <button type="button" className="search-button">
              <IoSearch size={15} />
            </button>
          </Link>
        </div>
        <div className="mobile-nav-container">
          <button
            type="button"
            className="mobile-menu-button"
            onClick={this.onClickMobileBar}
          >
            <MdMenuOpen size={25} className="mobile-view-icons" />
          </button>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
