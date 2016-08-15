import React from 'react';
import store from 'store';
import EachCalendarDay from 'ui/eachCalendarDay'

export default React.createClass({
	render: function(){
		return (
			<div className="calendarContainer">
				{this.props.monthlyCalendar.map(function(each, i){
					let match = 'date_' + each.calendar_date;
					return (
						<EachCalendarDay 
							key={i}
							match={match}
							each={each}
							shiftTime={((this.props.employeeMonthlySchedule[match]) ? this.props.employeeMonthlySchedule[match].string_rep : '')} 
							shiftArea={((this.props.employeeMonthlySchedule[match]) ? this.props.employeeMonthlySchedule[match].area : '')} 
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