import React, { Component } from 'react';
// eslint-disable-next-line
import actions from './redux/actions'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Bar from './components/Navigator'
import About from './views/About.js'
import Home from './views/Home.js'
import Tag from './views/Tag.js'
import './App.scss'

class App extends Component {
  render (){
    return (
      <Router>
        <div>
          <Bar />
          <Route exact path="/" component={Home} />
          <Route path="/tag" component={Tag} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    )
  }
}

export default connect()(App)
