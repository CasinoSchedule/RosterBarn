import React from 'react';
import store from 'store';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SidePanel from 'ui/sidePanel';
import EmployeeToSchedule from 'ui/employeeToSchedule';
import EmployeeRow from 'ui/employeeRow';
import EmployeeInfoForm from 'ui/employeeInfoForm';
import Confirm from 'ui/confirm';
import { addNewEmployee, getEmployeeSchedule, getWeekbyWeek, updateEmployee, clearAllSchedule, logout, getAreas } from 'api/data';
import { getWeekByWeek } from 'api/workspace'
import { browserHistory } from 'react-router';
import {v4} from 'uuid';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Cookie from 'js-cookie';
import AdminHeader from 'ui/adminHeader';
import AdminWeekdayHeader from 'ui/adminWeekdayHeader';
import AdminWeekHeader from 'ui/adminWeekHeader';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

require("assets/styles/scheduler.scss");

var image = require("assets/images/logo2.png"),
	days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], 
	day = days[new Date().getDay()], 
	months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

Date.prototype.addDays = function(days){
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

export default React.createClass({
	getInitialState: function() {
		console.log("hello", Cookie.get('token'));
		return ({
			currentDate: new Date(),
			employeeWeeklySchedule: [],
			flexbox_size: "",
			shiftColor: "",
			shiftNum: 0,
			showForm: false,
			employeeInfo: {},
			showClearConfirm: false,
			areas: []
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
				showClearConfirm: currentStore.showReducer.showClearConfirm,
				areas: currentStore.adminReducer.areas
			})
		}.bind(this));
		this.refreshCurrentState(new Date());
	},
	refreshCurrentState: function(date, shiftId, clearAll){
		var departmentId = localStorage.getItem("departmentId");

		var shiftId = ((shiftId) ? shiftId : this.state.shiftNum);
		getEmployeeSchedule(date, shiftId, departmentId, clearAll);
		getWeekByWeek(date);
		getAreas();
	},
	handleDateChange: function(next){
		var newWeekDate = this.state.currentDate.addDays(next);
		this.refreshCurrentState(newWeekDate);
		this.setState({
			currentDate: newWeekDate
		})
	},
	nextSchedule: function(){
		this.handleDateChange(7);
	},
	previousSchedule: function(){
		this.handleDateChange(-7);
	},
	addEmployee: function(e){
		addNewEmployee({
			first_name: "New", 
			last_name: "Employee",
			department: localStorage.getItem("departmentId")
		});
		this.refreshCurrentState(this.state.currentDate);
	},
	filterByShift: function(shiftId, type){
		this.refreshCurrentState(this.state.currentDate, shiftId)
		
		store.dispatch({
			type: 'CHANGE_SHIFTBOX',
			shiftColor: type,
			shiftNum: ((shiftId) ? shiftId : "")
		})
	},
	printSchedule: function(){
		window.print();
	},
	confirmClear: function(){
		store.dispatch({
			type: 'CHANGE_SHOWCLEARCONFIRM',
			showClearConfirm: true
		})
	},
	clearSchedule: function(){
		var shiftId = this.state.shiftNum;
		var employees = this.state.employeeWeeklySchedule;
		var clearAll = [];
		for(let i = 0; i < employees.length; i++){
			for(let j = 0; j < 7; j++){
				clearAll.push({
					day: this.state.weeklyCalendar[j].calendar_date,
					employee: employees[i][j].id,
					starting_time: ""
				})
			}
		}
		clearAllSchedule(clearAll);
		
		this.refreshCurrentState(this.state.currentDate, shiftId, true);
		 
		 store.dispatch({
			type: 'CHANGE_SHOWCLEARCONFIRM',
			showClearConfirm: false
		})
	},
	setColor: function(val){
		var fieldToChange = val
		var test = [];
		var colors = ['red', 'yellow', 'pink', 'orange'];
		var cut = this.state.employeeWeeklySchedule;
		for(let i = 0; i < cut.length; i++){
			for(let j = 1; j < 8; j++){
				if(cut[i][j][fieldToChange]) {
					if(test.indexOf(cut[i][j][fieldToChange]) === -1){ 
						test.push(cut[i][j][fieldToChange]) 
					}
				}
			}
		}
		for(let i = 0; i < cut.length; i++){
			for(let j = 1; j < 8; j++){
				if(cut[i][j][fieldToChange]) {
					if(test.indexOf(cut[i][j][fieldToChange]) !== -1){ 
						cut[i][j].val =  colors[test.indexOf(cut[i][j][fieldToChange])]
					}
				}
			}
		}
		store.dispatch({
			type: 'GET_EMPLOYEEWEEKLYSCHEDULE',
			employeeWeeklySchedule: cut
		})
		// console.log('test', test);
		// console.log('cut', cut);
	},
	logout: function(){
		localStorage.clear();
		logout();
		Cookie.remove('token');
		store.dispatch({
			type: 'USER_LOGOUT'
		})
	
		browserHistory.push('/')
	},
	settings: function(){

	},
	render: function(){
		return (
			<div className="adminBg">

				<SidePanel 
					dateString={this.state.weeklyCalendar[0].calendar_date} 
					filterByShift={this.filterByShift} 
					setColor={this.setColor} />

				<AdminHeader 
					logout={this.logout} />

				
				<div className="adminContainer">


					<AdminWeekHeader
						shiftColor={this.state.shiftColor}
						previousSchedule={this.previousSchedule}
						weeklyCalendar={this.state.weeklyCalendar}
						nextSchedule={this.nextSchedule}
						confirmClear={this.confirmClear}
						printSchedule={this.printSchedule} />

					

					<div className={"scheduleFlex " + this.state.flexbox_size}>
						
						<div className="schedule">
							
							<AdminWeekdayHeader 
								weeklyCalendar={this.state.weeklyCalendar} 
								addEmployee={this.addEmployee} />
							
							<EmployeeRow 
								employeeWeeklySchedule={this.state.employeeWeeklySchedule} 
								areas={this.state.areas} />
								
						</div>

					</div>
						
				</div>	

					<ReactCSSTransitionGroup transitionName="employeeBox" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
						{(this.state.showForm) 
							? <EmployeeInfoForm
								info={this.state.employeeInfo} 
								key={v4()} 
								refreshCurrentState={this.refreshCurrentState} 
								currentDate={this.state.currentDate}
								confirmDelete={this.confirmClear} /> 
							: ""}	
					</ReactCSSTransitionGroup>


					<ReactCSSTransitionGroup transitionName="employeeBox" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
						{(this.state.showClearConfirm) 
							? <Confirm
								key={v4()} 
								confirm={this.clearSchedule} 
								message={"Please confirm to clear schedule."} 
								header={"Clear Schedule"} /> 
							: ""}	
					</ReactCSSTransitionGroup>

			</div>
		)
	}
})