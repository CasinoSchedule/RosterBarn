import React from 'react';
import store from 'store';

require('assets/styles/callIn.scss');

export default React.createClass({
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
				<button type="submit" className="employeeOptions" onClick={this.close}>Test (Close Box)</button>
			</div>
		)
	}
})