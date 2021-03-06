import React from 'react';
import store from 'store';
import EachCalendarDay from 'ui/eachCalendarDay'

require('assets/styles/calendarDays.scss');

export default React.createClass({
	render: function(){
		return (
			<div className="calendarContainer">
				{this.props.monthlyCalendar.map(function(each, i){
					let match = 'date_' + each.calendar_date;
					let areaTitle = ((this.props.employeeMonthlySchedule[match]) ? this.props.employeeMonthlySchedule[match].area : '');
					let callin = ((this.props.employeeMonthlySchedule[match]) ? this.props.employeeMonthlySchedule[match].called_out : false);
					let shift = ((this.props.employeeMonthlySchedule[match]) ? this.props.employeeMonthlySchedule[match] : null);
					return (
						<EachCalendarDay 
							shift={shift}
							key={i}
							match={match}
							each={each}
							callin={callin}
							shiftTimeString={((this.props.employeeMonthlySchedule[match]) ? this.props.employeeMonthlySchedule[match].string_rep : '')} 
							epoch={((this.props.employeeMonthlySchedule[match]) ? this.props.employeeMonthlySchedule[match].epoch_milliseconds : '')} 
							shiftArea={((areaTitle) ? areaTitle.title : '')} 
							updateDayContainer={this.props.updateDayContainer}
							selected={this.props.selected}
							highlight={((this.props.selected === each.calendar_date) ? 'highlight' : 'none')} 
							/>
					)
				}.bind(this))}
			</div>
		)
	}
})