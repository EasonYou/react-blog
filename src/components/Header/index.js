import { Row, Col } from 'antd'
import React, { Component } from 'react'
import './Header.scss'

class Header extends Component {
	render() {
		const { match, headerData } = this.props
		console.log(headerData)
		return (
			<Row className="header" style={{ height: document.body.clientHeight }}>
				<Container match={match} headerData={headerData} />
			</Row>
		)
	}
}


function Container ({ match, headerData }) {
	console.log(headerData)
	return (
		<Col span={24} className="imgCont">
			<img className="pic" src={headerData.picUrl} alt="hehe" />
			<div className="shadow" />
			<div className="title-wrapper">
				<span className="title">{headerData.title}</span>
				<span className="desc">{headerData.desc}</span>
			</div>
		</Col>
	)
}
export default Header