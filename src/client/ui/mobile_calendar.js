import React from 'react';
import store from 'store';
import CalendarHeader from 'ui/calendarHeader';
import CalendarDays from 'ui/calendarDays';
import DaysOfWeekHeader from 'ui/daysOfWeekHeader';
import CalendarTitleBar from 'ui/calendarTitleBar';
import CalendarDayContainer from 'ui/calendarDayContainer';
import { getEmployeeMonthlySchedule, getTodaysSchedule } from 'api/data_workspace';
import { createMonthlyCalendar, createWeeklyCalendar, logout } from 'api/data';
import {Link, browserHistory} from 'react-router';
import Cookie from 'js-cookie';


require('assets/styles/mobile.calendar.scss');


Date.prototype.addDays = function(days){
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}
var months = ["January", "February", "March", "April", "May", 
				"June", "July", "August", "September", "October", 
					"November", "December"]; 
var dayString = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var d = new Date();

export default React.createClass({
	getInitialState: function(){
		return {
			currentDate: d,
			day: d.getDate(),
			dayString: dayString[d.getDay()],
			fullDateString: months[d.getMonth()] + ' ' + d.getDate() + ", " + d.getFullYear(), 
			weeklyCalendar: [],
			monthlyCalendar: [],
			employeeMonthlySchedule: {},
			time: '',
			area: '',
			message: '',
			selected: '',
			today: d.getFullYear() + '-' + (d.getMonth() + 1) + "-" + d.getDate(),
			eligible: false,
			epoch: 0
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
	componentDidMount: function(){
		console.log('selected', this.state.selected);
		console.log('today', this.state.today);
		getTodaysSchedule(d, function(time, area, message, bool, epoch){
			this.setState({
				time: time,
				area: area,
				message: message,
				eligible: bool,
				epoch: epoch
			})
		}.bind(this))
		
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
	updateDayContainer: function(day, shifttime, area, epoch){
		console.log('Update', day, shifttime, area);
		this.checkDate(day, shifttime, epoch);
		this.setState({
			day: day.day,
			dayString: day.dayString,
			fullDateString: day.fullDateString,
			time: shifttime,
			area: area
		})
	
	},
	updateMessage: function(message, bool){
		this.setState({
				eligible: bool
		})
		store.dispatch({
			type: 'CHANGE_MESSAGE',
			message: message
		})
	},
	checkDate: function(day, shifttime, epoch){
		
		var timeOfDay = new Date().getTime();
		var today = new Date();
		var dayToCompare = new Date();
		dayToCompare.setFullYear(day.year, day.month, day.day);

		console.log('epoch', epoch, 'timeOfDay', timeOfDay);
		console.log(today, ' vs ', dayToCompare);
		if (today.toDateString() === dayToCompare.toDateString() && timeOfDay > epoch && (shifttime)){
			this.updateMessage('Scheduled Today', false);
		} else if(dayToCompare < today && (shifttime)){
			this.updateMessage('Shift Completed', false);
		} else if(dayToCompare > today && (shifttime)){
			this.updateMessage('Scheduled', true);
		} else {
			store.dispatch({
				type: 'CHANGE_MESSAGE',
				message: ''
			})
		}
	},
	callin: function(){
		
	},
	logout: function(){
		logout();
		Cookie.remove('token');
		localStorage.clear();
		browserHistory.push('/');
	},
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	render: function(){
		return (
			<div className='mobileCalendar'>
				<CalendarHeader />
					<div className='calendarFrame'>
						<div className='calendarFrameContainer'>
							
							<CalendarTitleBar 
								previousMonth={this.previousMonth}
								nextMonth={this.nextMonth} 
								currentDate={this.state.currentDate} />
							
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
							dayString={this.state.dayString}
							fullDateString={this.state.fullDateString} 
							time={this.state.time}
							area={this.state.area}
							message={this.state.message}
							today={this.state.today}
							selected={this.state.selected}
							eligible={this.state.eligible}
							callin={this.callin}
							/>

					</div>
			</div>

		)
	}
})