import React from 'react';
import store from 'store';

export default React.createClass({
	render: function(){
		return (
			<div className="days">
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