import React from 'react';
import store from 'store';
import { v4 } from 'uuid';
import Workshift from 'ui/workshift';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

export default React.createClass({
	render: function(){
		return (
			<div style={{display: 'flex', width: '100%'}}>
				
				{this.props.weeklyCalendar.map(function(day, i){
					let idToCheck = 'date_' + day.calendar_date + '_employee_id_' + this.props.employee.id;
					return(
						<div key={i} className='eachDay'>
							
							<Workshift 
								key={i}
								areas={this.props.areas}
								employee={this.props.employee}
								day={day}
								weekShifts={this.props.weekShifts} 
								shiftStrings={this.props.shiftStrings} 
								starting_time={this.props.weekShifts[idToCheck] || 'monkey'} />

						</div>
						)
				}.bind(this))}

			</div>
		)
	}
})





















{/*	<Workshift 
								key={i}
								areas={this.props.areas}
								employee={this.props.employee}
								day={day}
								weekShifts={this.props.weekShifts} 
								shiftStrings={this.props.shiftStrings} />   */}





