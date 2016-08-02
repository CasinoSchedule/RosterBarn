import React from 'react';
import store from 'store';

require('assets/styles/confirm.scss');

export default React.createClass({
	close: function(){
		store.dispatch({
			type: 'CHANGE_SHOWCLEARCONFIRM',
			showClearConfirm: false
		})

		store.dispatch({
			type: 'CHANGE_SHOWDELETECONFIRM',
			showDeleteConfirm: false
		})
	},
	render: function(){
		return (
			<div className="confirmBox">
				<div className="shade"></div>
				<div className="confirmBox">
					<div className="confirmHeader">{this.props.header}
					</div>
					<div className="confirmMessage">
						{this.props.message}
					</div>
					<div className="confirmButtons">
						<button onClick={this.close}>Cancel</button>
						<button onClick={this.props.confirm}>Confirm</button>
					</div>
				</div> 
				
			</div>
		)
	}
})