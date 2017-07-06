import { Row, Col, Menu, Icon } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './Navigator.scss'


class Bar extends Component {
  state = {
    current: 'mail',
  }

  
  render() {
    const { clickTitle } = this.props
    return (
      <Row className="navigator">
        <Col >
            <Menu
              selectedKeys={[clickTitle.clickTitle]}
              mode="horizontal"
              className="menu-wrapper"
            >
              <Menu.Item key="home">
                <Icon type="mail" />
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="tag">
                <Icon type="appstore" />
                <Link to="/tag">Tag</Link>
              </Menu.Item>
              <Menu.Item key="about">
                <Icon type="smile" />
                <Link to="/about">about</Link>
              </Menu.Item>
            </Menu>
        </Col>
      </Row>
    )
  }
}

function select(state) {
  return {
    clickTitle: state.clickTitle
  }
}

export default connect(select)(Bar)