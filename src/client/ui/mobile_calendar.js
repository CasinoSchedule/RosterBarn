import React from 'react';
import store from 'store';
import AdminHeader from 'ui/adminHeader';
import CalendarDays from 'ui/calendarDays';
import DaysOfWeekHeader from 'ui/daysOfWeekHeader';
import CalendarDayContainer from 'ui/calendarDayContainer';
import { getEmployeeMonthlySchedule } from 'api/data_workspace';
import { createMonthlyCalendar, createWeeklyCalendar } from 'api/data';

require('assets/styles/mobile.calendar.scss');


Date.prototype.addDays = function(days){
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}
var months = ["January", "February", "March", "April", "May", 
				"June", "July", "August", "September", "October", 
					"November", "December"]; 

export default React.createClass({
	getInitialState: function(){
		return {
			currentDate: new Date(),
			weeklyCalendar: [],
			monthlyCalendar: [],
			employeeMonthlySchedule: {},
			day: {}, 
			time: '',
			area: '',
			message: '',
			selected: '',
			dateString: ''
		}
	},
	componentWillMount: function(){
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				weeklyCalendar: currentStore.calendarReducer.weeklyCalendar,
				monthlyCalendar: currentStore.calendarReducer.monthlyCalendar,
				employeeMonthlySchedule: currentStore.employeeReducer.employeeMonthlySchedule,
				message: currentStore.calendarReducer.message,
				selected: currentStore.calendarReducer.selected
			})
		}.bind(this));
		
		this.refreshCurrentState(new Date());
	},
	
	refreshCurrentState: function(date){
		// createWeeklyCalendar(date);
		createMonthlyCalendar(date);
		getEmployeeMonthlySchedule(date);
	},
	handleDateChange: function(next){
		var newWeekDate = this.state.currentDate.addDays(next);
		this.refreshCurrentState(newWeekDate);
		this.setState({
			currentDate: newWeekDate
		})
	},
	nextMonth: function(){
		this.handleDateChange(30);
	},
	previousMonth: function(){
		this.handleDateChange(-30);
	},
	updateDayContainer: function(day, time, area){
		console.log(day, time, area, string)
		this.setState({
			day: day,
			time: time,
			area: area
		})
	},
	render: function(){
		return (
			<div className='mobileCalendar'>
				<AdminHeader />
					<div className='calendarFrame'>
						<div style={{width: '70%'}}>
							<div className="header">
								<div className="previous" onClick={this.previousMonth}>&lang;</div>
								<div className="month-year">{months[new Date(this.state.currentDate).getMonth()]} {new Date(this.state.currentDate).getFullYear()}</div>
								<div className="next" onClick={this.nextMonth} style={{textAlign: 'right'}}>&rang;</div>
							</div>
							
							<DaysOfWeekHeader />

							<CalendarDays 
								monthlyCalendar={this.state.monthlyCalendar}
								employeeMonthlySchedule={this.state.employeeMonthlySchedule}
								updateDayContainer={this.updateDayContainer}
								selected={this.state.selected} 
								/>
						</div>

						<CalendarDayContainer 
							day={this.state.day} 
							time={this.state.time}
							area={this.state.area}
							message={this.state.message} 
							
							/>

					</div>
			</div>

		)
	}
})