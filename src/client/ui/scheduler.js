import React from 'react';
import store from 'store';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SidePanel from 'ui/sidePanel';
import EmployeeToSchedule from 'ui/employeeToSchedule';
import EmployeeInfoForm from 'ui/employeeInfoForm';
import Confirm from 'ui/confirm';
import { calendar, getWeekByWeek, getEmployeeSchedule, caltest, addNewEmployee, updateEmployee } from 'api/data';
import { browserHistory } from 'react-router';

require("assets/styles/scheduler.scss");
var image = require("assets/images/logo2.png");
// var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
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
			flexbox_size: "",
			shiftColor: "",
			shiftNum: 0,
			showForm: false,
			employeeInfo: {},
			showConfirm: false
		})
	},
	componentWillMount: function(){
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				weeklyCalendar: currentStore.calendarReducer.weeklyCalendar,
				employeeWeeklySchedule: currentStore.adminReducer.employeeWeeklySchedule,
				flexbox_size: currentStore.calendarReducer.flexbox_size,
				shiftColor: currentStore.cssReducer.shiftColor,
				shiftNum: currentStore.cssReducer.shiftNum,
				showForm: currentStore.showReducer.showForm,
				employeeInfo: currentStore.employeeReducer.employeeInfo,
				showConfirm: currentStore.showReducer.showConfirm
			})
		}.bind(this));
		getEmployeeSchedule(year, pythonMonth[month], date);
		getWeekByWeek(year, month, date);
	},
	
	componentDidMount: function(){
		
	},
	nextSchedule: function(){
		forward += 7;
		var addOnEndpoint = ((this.state.shiftColor) ? "?shift_title=" + this.state.shiftNum : "");
		getEmployeeSchedule(year, pythonMonth[month], (date + forward), addOnEndpoint);
		getWeekByWeek(year, month, date + forward);
	},
	previousSchedule: function(){
		forward -= 7;
		var addOnEndpoint = ((this.state.shiftColor) ? "?shift_title=" + this.state.shiftNum : "");
		getEmployeeSchedule(year, pythonMonth[month], (date + forward), addOnEndpoint);
		getWeekByWeek(year, month, date + forward);
	},
	submitSchedule: function(obj){
		// e.preventDefault();
		console.log(obj);
	},
	logout: function(){
		browserHistory.push('/')
	},
	addEmployee: function(e){
		e.preventDefault();
		var shift = this.state.shiftNum || 1;
		var addOnEndpoint = ((this.state.shiftColor) ? "?shift_title=" + this.state.shiftNum : "");
		console.log(this.state.shiftNum, shift);
		addNewEmployee({
			first_name: "Add", 
			last_name: "Employee",
			availability: [this.state.shiftNum]
		});
		getEmployeeSchedule(year, pythonMonth[month], (date + forward), addOnEndpoint);
		getWeekByWeek(year, month, date + forward);
		
	},
	filterByShift: function(shift, type){
		var addOnEndpoint = ((shift) ? "?shift_title=" + shift : "");
		getEmployeeSchedule(year, pythonMonth[month], (date + forward), addOnEndpoint);
		getWeekByWeek(year, month, date + forward);
		store.dispatch({
			type: 'CHANGE_SHIFTBOX',
			shiftColor: type,
			shiftNum: ((shift) ? shift : "")
		})
	},
	printSchedule: function(){
		window.print();
		// window.open('', 'mySched', 'height=400,width=600');
	},
	clearSchedule: function(){
		store.dispatch({
			type: 'CHANGE_SHOWCONFIRM',
			showConfirm: true
		})
	},
	render: function(){
		return (
			<div className="adminBg">

				<SidePanel dateString={this.state.weeklyCalendar[0].calendar_date} filterByShift={this.filterByShift} />

				<div className="adminHeader">
					<div>
					 <span className="roster"><span className="letter">R</span>oster</span><span className="barn"><span className="">B</span>arn</span>
					</div>
					<div className="headerOptions">
						<div className="options"><i className="fa fa-bars" aria-hidden="true"></i>Options</div>
						<div className="settings"><i className="fa fa-cogs" aria-hidden="true"></i>Settings</div>
						<div className="logout" onClick={this.logout} ><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</div>
						
					</div>
				</div> 
				<div className="adminContainer">

					<div className="monthLabel">
						<div className={"shiftStatus " + this.state.shiftColor}>
							<div className="shiftTitle">{this.state.shiftColor}</div>
						</div>

						<div className="navigate">
							<div className="leftButton" onClick={this.previousSchedule}><i className="fa fa-angle-left" aria-hidden="true"></i></div>

							<div className="weekLabel"> {this.state.weeklyCalendar[0].monthString} {this.state.weeklyCalendar[0].day}, {this.state.weeklyCalendar[0].year}   

									<span className="dash"> - </span> 

								{this.state.weeklyCalendar[6].monthString} {this.state.weeklyCalendar[6].day}, {this.state.weeklyCalendar[6].year}
							</div> 
							<div className="rightButton" onClick={this.nextSchedule}><i className="fa fa-angle-right" aria-hidden="true"></i></div>
						</div>


						<div className="printClearButtons">
							<button onClick={this.clearSchedule}>Clear Schedule</button>
							<button onClick={this.printSchedule}>Print Schedule</button>
						</div>

					</div>	

					

				<div className={"scheduleFlex " + this.state.flexbox_size}>
					
					<div className="schedule" >
						
						
						<div className="weekOf">
							<div className="roster employee"><span className="letter">R</span>oster<i className="fa fa-user-plus" aria-hidden="true" onClick={this.addEmployee}></i><span className="addUser"></span></div>
							
							{this.state.weeklyCalendar.map(function(item, i){
								return (
										<div key ={i} className="weekOfDay">
											<p>{item.dayString}<span>&#160;</span> {item.day}</p>
										</div>
								)
							}.bind(this))}  
							
						</div>
						
							<div className="eachRow">
						
								{this.state.employeeWeeklySchedule.map(function(item, i){
									return (
										<EmployeeToSchedule key={i} sched={this.state.employeeWeeklySchedule} item={item} i={i}/>
									)
								}.bind(this))}
							
							</div>
						
					</div>
				</div>
						
				</div>	
						<ReactCSSTransitionGroup transitionName="employeeBox" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
						{(this.state.showForm) 
							? <EmployeeInfoForm 
								info={this.state.employeeInfo} key={this.state.employeeInfo.uniqueId} /> 
							: ""}	
						</ReactCSSTransitionGroup>
						<ReactCSSTransitionGroup transitionName="employeeBox" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
						{(this.state.showConfirm) 
							? <Confirm
								key={1} /> 
							: ""}	
						</ReactCSSTransitionGroup>
			</div>
		)
	}
})