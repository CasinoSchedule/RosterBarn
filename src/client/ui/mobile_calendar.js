import React from 'react';
import store from 'store';
import AdminHeader from 'ui/adminHeader';
import { createWeeklyCalendar, createMonthlyCalendar, getEmployeeMonthlySchedule } from 'api/data_workspace';

require('assets/styles/mobile.calendar.scss');

export default React.createClass({
	getInitialState: function(){
		return {
			currentDate: new Date(),
			weeklyCalendar: []
		}
	},
	componentWillMount: function(){
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				weeklyCalendar: currentStore.calendarReducer.weeklyCalendar,
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
			</div>
		)
	}
})