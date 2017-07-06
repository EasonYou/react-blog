import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import App from './App.js'
import createStore from './redux'
import Mock from './mock.js'

const store = createStore()

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)