import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import actions from '../redux/actions'
import axios from 'axios'

class About extends Component {
    componentWillMount() {
        const { dispatch } = this.props
        dispatch(actions.clickTitle('about'))
        setTimeout(() =>

        axios.get('/about').then(data => {
            console.log(data.data)
            dispatch(actions.getHomePage(data.data))
        })
        , 1000)
    }
    render () {
        const { homePage } = this.props
        return (
            <div>
                <Header match={this.props.match} headerData={homePage} />
                About
                <Footer />
            </div>
        )
    }
}

function select(state) {
  return {
    homePage: state.homePage
  }
}

export default connect(select)(About)