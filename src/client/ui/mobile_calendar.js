import React from 'react';
import store from 'store';
import AdminHeader from 'ui/adminHeader';
import { createMonthlyCalendar, getEmployeeMonthlySchedule } from 'api/data_workspace';
import { createWeeklyCalendar } from 'api/data';

require('assets/styles/mobile.calendar.scss');

export default React.createClass({
	getInitialState: function(){
		return {
			currentDate: new Date(),
			weeklyCalendar: [],
			monthlyCalendar: [],
			employeeMonthlySchedule: {}
		}
	},
	componentWillMount: function(){
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				weeklyCalendar: currentStore.calendarReducer.weeklyCalendar,
				monthlyCalendar: currentStore.calendarReducer.monthlyCalendar,
				employeeMonthlySchedule: currentStore.employeeReducer.employeeMonthlySchedule
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
	render: function(){
		return (
			<div className='mobileCalendar'>
				<AdminHeader />

				<div className="calendarContainer">
					{this.state.monthlyCalendar.map(function(each, i){
						let match = 'date_' + each.calendar_date;
						return (
							<div key={i} className='calendarDay'>
								<div>{each.day}</div>
							{/*}	<div>{((this.state.employeeMonthlySchedule[match]) ? this.state.employeeMonthlySchedule.starting_time: '')}</div>
								<div>{((this.state.employeeMonthlySchedule[match]) ? this.state.employeeMonthlySchedule.string_rep: '')}</div> */}
							</div>
						)
					})}
				</div>
			</div>
		)
	}
})