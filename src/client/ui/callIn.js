import React from 'react';
import store from 'store';

require('assets/styles/callIn.scss');

export default React.createClass({
	handleSubmit: function(e){
		e.preventDefault();
	},
	close: function(e){
		e.preventDefault();
		store.dispatch({
			type: 'CHANGE_SHOWCALLIN',
			showCallIn: false
		})
	},
	render: function(){
		return (
			<div className="callInBox">
				<div className="shade"></div>
				
				<div className="callin">
					You have requested to Call in for {this.props.callin}.
				</div>
				<button className="employeeOptions" onClick={this.close}>Cancel</button>
				<button className="employeeOptions" onClick={this.handleSubmit}>Submit</button>
			</div>
		)
	}
})