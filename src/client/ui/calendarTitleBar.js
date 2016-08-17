import React from 'react';
import store from 'store';

require('assets/styles/callIn.scss');

var months = ["January", "February", "March", "April", "May", 
				"June", "July", "August", "September", "October", 
					"November", "December"];

export default React.createClass({
	render: function(){
		return (
			<div className="header">
				<div className="previous" onClick={this.props.previousMonth}>&lang;</div>
				<div className="month-year">{months[new Date(this.props.currentDate).getMonth()]} {new Date(this.props.currentDate).getFullYear()}</div>
				<div className="next" onClick={this.props.nextMonth} style={{textAlign: 'right'}}>&rang;</div>
			</div>
		)
	}
})