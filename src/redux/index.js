import { createStore, combineReducers } from 'redux'
import * as reducers from './reducers'


export default function(data) {
  var reducer = combineReducers(reducers.default)
  var store = createStore(reducer, 
                          data, 
                          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  return store
}

