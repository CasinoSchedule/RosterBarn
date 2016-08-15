import React from 'react';
import store from 'store';

export default React.createClass({
	render: function(){
		return (
			<div className='daySelectedContainer'>
				<div className='headerDay'>
					
				</div>	
				<div>
					<div>{this.props.day.fullDateString}</div>
					<div>{this.props.time}</div>
					<div>{this.props.area}</div>
					<div>{this.props.message}</div>
				</div>		
			</div>
		)
	}
})