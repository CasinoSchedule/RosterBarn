import React from 'react';
import store from 'store';

require('assets/styles/calendarTitleBar.scss');

var months = ["January", "February", "March", "April", "May", 
				"June", "July", "August", "September", "October", 
					"November", "December"];

export default React.createClass({
	next: function(days){
		this.props.nextMonth(days);
	},
	render: function(){
		return (
			<div className={this.props.calendarHeader}>
				<div className="previousButton" onClick={this.next.bind(this, -30)}>&lang;</div>
				<div className="month-year">{months[new Date(this.props.currentDate).getMonth()]} {new Date(this.props.currentDate).getFullYear()}</div>
				<div className="nextButton" onClick={this.next.bind(this, 30)} style={{textAlign: 'right'}}>&rang;</div>
			</div>
		)
	}
})