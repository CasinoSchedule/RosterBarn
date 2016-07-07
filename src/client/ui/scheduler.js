import React from 'react';
import store from 'store';
import SidePanel from 'ui/sidePanel';
import EmployeeToSchedule from 'ui/employeeToSchedule';
import EmployeeMonthlySchedule from 'ui/employeeMonthlySchedule';
import { calendar, getWeekByWeek, getEmployeeSchedule, caltest } from 'api/data';

require("assets/styles/scheduler.scss");
var image = require("assets/images/logo.png");

var month = new Date().getMonth(), 
	year = new Date().getFullYear(),
	date = new Date().getDate(), 
	days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	day = days[new Date().getDay()], 
	pythonMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], 
	daysInMonths = [31, (((year%4==0)&&(year%100!=0))||(year%400==0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], 
	forward = 0

export default React.createClass({
	getInitialState: function() {
		return ({
			weeklyCalendar: [],
			employeeWeeklySchedule: [],
			flexbox_size: ""
		})
	},
	componentWillMount: function(){
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				weeklyCalendar: currentStore.calendarReducer.weeklyCalendar,
				employeeWeeklySchedule: currentStore.adminReducer.employeeWeeklySchedule,
				flexbox_size: currentStore.calendarReducer.flexbox_size
			})
		}.bind(this));
		getEmployeeSchedule(year, pythonMonth[month], date);
		getWeekByWeek(year, month, date);
	},
	
	componentDidMount: function(){
		
	},
	nextSchedule: function(){
		forward += 7;
		getEmployeeSchedule(year, pythonMonth[month], (date + forward));
		getWeekByWeek(year, month, date + forward);
	},
	previousSchedule: function(){
		forward -= 7;
		getEmployeeSchedule(year, pythonMonth[month], (date + forward));
		getWeekByWeek(year, month, date + forward);
	},
	submitSchedule: function(obj){
		// e.preventDefault();
		console.log(obj);
	},
	render: function(){
		return (
			<div className="adminBg">

				<SidePanel />

				<div className="adminHeader">
					<img src={image} />
				</div>

				<div className="monthLabel">Week of <span className="weekLabel"> {this.state.weeklyCalendar[0].monthString} {this.state.weeklyCalendar[0].day}, {this.state.weeklyCalendar[0].year}</span> </div>	
					<div className="nextButtons">
						<div>
							<div className="publish"><button onClick={this.submitSchedule}>Publish Schedule</button></div>
						</div>
						<div className="backForward">
							<div><button onClick={this.previousSchedule}>Previous week</button></div>
							<div><button onClick={this.nextSchedule}>Next week</button></div>
						</div>
					</div>
					{/* <button onClick={this.submitSchedule}>Publish Schedule</button>	*/}

				<div className={"scheduleFlex " + this.state.flexbox_size}>
					
					<div className="schedule">
						<div className="scheduledays">
							<div className="blankDayBox"></div>
							<div>MON</div>
							<div>TUE</div>
							<div>WED</div>
							<div>THUR</div>
							<div>FRI</div>
							<div>SAT</div>
							<div>SUN</div>
						</div>
						
						<div className="weekOf">
							<div className="blankEmployeeBox">Employees</div>
							
							{this.state.weeklyCalendar.map(function(item, i){
								return (
										<div key ={i} className="weekOfDay">
											<p>{item.monthString}, {item.day}</p>
										</div>
								)
							}.bind(this))}  
							
						</div>
						
							<div className="eachRow">
						
								{this.state.employeeWeeklySchedule.map(function(item, i){
									return (
										<EmployeeToSchedule sched={this.state.employeeWeeklySchedule} item={item} i={i}/>
									)
								}.bind(this))}
							
							</div>
						
					</div>
				</div>
						
						
			</div>
		)
	}
})