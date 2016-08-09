import React from 'react';
import store from 'store';
import EmployeeToSchedule from 'ui/employeeToSchedule';
import {v4} from 'uuid';

require("assets/styles/employeeRow.scss");

export default React.createClass({
	handleClick: function(item){
		store.dispatch({
			type: 'CHANGE_SHOWFORM',
			showForm: true
		})

		store.dispatch({
			type: 'THROW_EMPLOYEEINFO',
			employeeInfo: item
		})
	},
	render: function(){
		return (
			<div>
				{this.props.employees.map(function(employee, i){
					return (
						<div key={v4()} style={{display: 'flex'}}>
							<div className='eachDay'>
									<div className="nameImageBox">
										<div><img src={employee.photo_url} onClick={this.handleClick.bind(this, employee)} /></div>
										<div className="nameIdBox">
											<div className='nameField'>{employee.first_name} {employee.last_name}</div> 
											<div className="idNum">{employee.employee_id}</div>
										</div>
									</div>
							</div>
								<EmployeeToSchedule 
									key={v4()}  
									employee={employee} 
									areas={this.props.areas} 
									weeklyCalendar={this.props.weeklyCalendar}
									weekShifts={this.props.weekShifts} />
							
							</div>
						)
				}.bind(this))}
			</div>
		)
	}
})