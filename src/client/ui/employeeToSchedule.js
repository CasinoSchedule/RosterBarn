import React from 'react';
import store from 'store';
import EachEmployeeOnSchedule2 from 'ui/eachEmployeeOnSchedule2';
import {v4} from 'uuid';

require('assets/styles/employeeToSchedule.scss');

export default React.createClass({
	render: function(){
		return (
					<div className='namesAcross'>
						{this.props.weeklyCalendar.map(function(day, index){
							return (
								<EachEmployeeOnSchedule2 
									key={v4()} 
									day={day} 
									employee={this.props.employee}
									areas={this.props.areas} 
									weekShifts={this.props.weekShifts} />
							)
						}.bind(this))}
					</div>		
		)
	}
})