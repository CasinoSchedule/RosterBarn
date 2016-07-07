import React from 'react';
import store from 'store';
import EmployeeToSchedule from 'ui/employeeToSchedule';

export default React.createClass({
	render: function(){
		return (
			<div>
				{this.props.employeeWeeklySchedule.map(function(item, i){
					return (
						<EmployeeToSchedule sched={this.props.employeeWeeklySchedule} item={item} i={i}/>
					)
				}.bind(this))}
			</div>
		)
	}
})