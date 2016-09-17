import React from 'react';
import {v4} from 'uuid';
import EmployeeInfoForm from 'ui/employeeInfoForm';

require("assets/styles/employeeInfoForm.scss");

export default React.createClass({
	getInitialState: function(){
		return {
			open: false
		}
	},
	handleClick: function(){
		this.setState({
			open: !this.state.open
		})
	},
	render: function(){
		return (
			<div className="nameImageBox">
				<div><img src={this.props.employee.photo_url} onClick={this.handleClick} /></div>
				<div className="nameIdBox">
					<div className='nameField'>{this.props.employee.first_name} {this.props.employee.last_name}</div> 
					<div className="idNum">{this.props.employee.employee_id}</div>	
				</div>

				{this.state.open 
					? <EmployeeInfoForm
						open={this.handleClick}
						info={this.props.employee} 
						key={v4()} 
						confirmDelete={this.props.confirmClear} 
						deleteEmployee={this.props.deleteEmployee} 
						shiftNum={this.props.shiftNum}
						departmentId={this.props.departmentId} /> 
					: null
				}	
			</div>
		)
	}
})