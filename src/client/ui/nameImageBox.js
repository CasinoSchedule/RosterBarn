import React from 'react';

export default React.createClass({
	handleClick: function(){
		this.props.handleClick(this.props.employee.id)
	},
	render: function(){
		return (
			<div className="nameImageBox">
				<div><img src={this.props.employee.photo_url} onClick={this.handleClick} /></div>
				<div className="nameIdBox">
					<div className='nameField'>{this.props.employee.first_name} {this.props.employee.last_name}</div> 
					<div className="idNum">{this.props.employee.employee_id}</div>	
				</div>
			</div>
		)
	}
})