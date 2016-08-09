import React from 'react';
import store from 'store';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SidePanel from 'ui/sidePanel';
import EmployeeToSchedule from 'ui/employeeToSchedule';
import EmployeeRow from 'ui/employeeRow';
import EmployeeInfoForm from 'ui/employeeInfoForm';
import Confirm from 'ui/confirm';
import Settings from 'ui/settings';
import { addNewEmployee, getEmployeeSchedule, updateEmployee, clearAllSchedule, logout, getAreas } from 'api/data';
import { getWeekByWeek, getShifts, getEmployeesByShift } from 'api/data_workspace'
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
// injectTapEventPlugin();

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
			showSettings: false,
			areas: [],
			employees: [],
			weekShifts: []
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
				showSettings: currentStore.showReducer.showSettings,
				areas: currentStore.adminReducer.areas,
				employees: currentStore.adminReducer.employees,
				weekShifts: currentStore.adminReducer.weekShifts
			})
		}.bind(this));
		this.refreshCurrentState(new Date(2016, 7, 8));
	},
	refreshCurrentState: function(date, shiftId, clearAll){
		var departmentId = localStorage.getItem("departmentId");
		var shiftId = ((shiftId) ? shiftId : this.state.shiftNum);
		// getEmployeeSchedule(date, shiftId, departmentId, clearAll);
		
		getEmployeesByShift(shiftId, departmentId)
		getShifts(date, departmentId);
		getWeekByWeek(date);
		getAreas();


		// getWeekByWeek, getShifts, getEmployeesByShift
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
	showSettingsPanel: function(){
		console.log('hit in scheduler');

		store.dispatch({
			type: 'SHOW_SETTINGS',
			showSettings: true
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
	render: function(){

		return (
			<div className="adminBg">

				
							
							{this.state.employees.map(function(employee, index){
								return (
										<div key={index} style={{display: 'flex'}}>
											<div style={{width: '150px', height: '90px', border: '1px solid red'}}> {employee.first_name} </div>

											{this.state.weeklyCalendar.map(function(day, i){
												return(
													<div key={i} style={{width: '150px', height: '90px', border: '1px solid blue'}}>
														<div id='datatest'>{day.calendar_date}</div>
														{this.state.weekShifts.map(function(shift, num){
															if(day.calendar_date === shift.calendar_date && employee.id === shift.employee.id){
															return(
																shift.starting_time
																)
														} 
														}.bind(this))}
													</div>
													)
											}.bind(this))}

										</div>
								)
							}.bind(this))}

			</div>
		)
	}
})