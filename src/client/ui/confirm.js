import React from 'react';
import store from 'store';
import RaisedButton from 'material-ui/FlatButton';

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
						<RaisedButton onClick={this.close} primary={true} label="Cancel" style={{backgroundColor: '#0E4583', color: '#ddd'}}/>
						<RaisedButton onClick={this.props.confirm} primary={true} label="Confirm" style={{backgroundColor: '#0E4583', color: '#ddd'}} />
					</div>
				</div> 
				
			</div>
		)
	}
})