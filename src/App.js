import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'
import TopRated from './components/TopRated'
import UpcomingMovies from './components/UpcomingMovies'
import SearchBar from './components/SearchBar'

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/top-rated" component={TopRated} />
      <Route exact path="/upcoming" component={UpcomingMovies} />
      <Route exact path="/search" component={SearchBar} /> search
    </Switch>
  </div>
)

export default App
