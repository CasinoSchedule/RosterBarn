import React from 'react';
import store from 'store';

require('assets/styles/calendarTitleBar.scss');

var months = ["January", "February", "March", "April", "May", 
				"June", "July", "August", "September", "October", 
					"November", "December"];

export default React.createClass({
	render: function(){
		return (
			<div className="calendarHeader">
				<div className="previousButton" onClick={this.props.previousMonth}>&lang;</div>
				<div className="month-year">{months[new Date(this.props.currentDate).getMonth()]} {new Date(this.props.currentDate).getFullYear()}</div>
				<div className="nextButton" onClick={this.props.nextMonth} style={{textAlign: 'right'}}>&rang;</div>
			</div>
		)
	}
})