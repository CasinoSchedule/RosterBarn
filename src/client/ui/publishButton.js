import React from 'react';

require('assets/styles/publishButton.scss');


export default React.createClass({
	render: function(){
		return (
			<div className={this.props.publishButton} onClick={this.props.publish}>
				Publish & Notify
			</div> 
		)
	}
})