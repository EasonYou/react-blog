import { Row, Col } from 'antd'
import React, { Component } from 'react'
import './Header.scss'

class Header extends Component {
	render() {
		return (
			<Row className="header" style={{ height: document.body.clientHeight }}>
				<Col span={24} className="imgCont">
					<div className="title-wrapper">
						<span className="title">Dwyane Wade</span>
						<span className="desc">HEHE</span>
					</div>
				</Col>
			</Row>
		)
	}
}

export default Header