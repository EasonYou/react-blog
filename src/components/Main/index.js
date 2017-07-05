import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from '../../views/Home.js'
import Tag from '../../views/Tag.js'

class Main extends Component {
    render () {
        return (
            <div>
                <Route path="/" component={Home}/>
                <Route path="/tag" component={Tag}/>
            </div>
        )
    }
}

export default Main