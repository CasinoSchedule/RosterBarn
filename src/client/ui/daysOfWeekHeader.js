import React from 'react';
import store from 'store';

require('assets/styles/daysOfWeekHeader.scss');

export default React.createClass({
	render: function(){
		return (
			<div className={this.props.weekdays}>
				<div>SUN</div>
				<div>MON</div>
				<div>TUE</div>
				<div>WED</div>
				<div>THUR</div>
				<div>FRI</div>
				<div>SAT</div>
			</div>
			)
	}
})