import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import App from './App.js'
import createStore from './redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const store = createStore()

ReactDom.render(
<Router>
  <Provider store={store}>
    <App />
  </Provider>
</Router>,
  document.getElementById('root')
)