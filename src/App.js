import React, { Component } from 'react';
// eslint-disable-next-line
import actions from './redux/actions'
import { connect } from 'react-redux'
import Bar from './components/Navigator'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import './App.scss'

// console.log(ReactRouterDom)
class App extends Component {
  render (){
    return (
      <div>
        <Bar />
        <Header />
        <Main />
        <Footer />
      </div>
    )
    
  }
}
function select(state) {
  return {
    get: state.get,
    post: state.post
  }
}
export default connect(select)(App)
