import React from 'react';
import store from 'store';
import { v4 } from 'uuid';
import Workshift from 'ui/workshift';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

require('assets/styles/workday.scss');

export default React.createClass({
	
	render: function(){
		return (
			<div className='mapContainer'>
				
				{this.props.weeklyCalendar.map(function(eachday, i){
					let idToCheck = 'date_' + eachday.calendar_date + '_employee_id_' + this.props.employee.id;
					let available = '';
					let location = '';
					let areaId = ((this.props.weekShifts[idToCheck]) ? this.props.weekShifts[idToCheck].area : '');

					if(this.props.employee.regular_days_off.indexOf(eachday.dayIndex) !== -1 && !(this.props.weekShifts[idToCheck])){
						// console.log('Day Off Acknowledged', this.props.employee.regular_days_off, eachday.dayIndex)	
						available = 1000
						} else if(this.props.weekShifts[idToCheck]){
							available = this.props.weekShifts[idToCheck].starting_time
							location = ((areaId) ? areaId.id : '')
						} else {
							available = '';
							location = '';
						}
				
					return(
						<div key={i} className='eachDay'>
							
							<Workshift 
								key={i}
								area={location}
								handlePublish={this.props.handlePublish}
								areas={this.props.areas}
								location={this.props.weekShifts[idToCheck]}
								employee={this.props.employee}
								eachday={eachday}
								weekShifts={this.props.weekShifts} 
								shiftStrings={this.props.shiftStrings} 
								shift={available}
								shiftId={this.props.shiftId} 
								currentDate={this.props.currentDate} />

						</div>
						)
				}.bind(this))}

			</div>
		)
	}
})


