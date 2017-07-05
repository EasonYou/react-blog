import { Row, Col, Menu, Icon } from 'antd'
import React, { Component } from 'react'
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './Navigator.scss'

console.log(Link)

class Bar extends Component {
  state = {
    current: 'mail',
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <Row className="navigator">
        <Col >
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
              className="menu-wrapper"
            >
              <Menu.Item key="mail">
                <Icon type="mail" />
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="app">
                <Icon type="appstore" />
                <Link to="/tag">Tag</Link>
              </Menu.Item>
              <Menu.Item key="alipay">
                <Icon type="smile" />
                {/*<Link to="/about">about</Link>*/}
              </Menu.Item>
            </Menu>
        </Col>
      </Row>
    )
  }
}

export default Bar