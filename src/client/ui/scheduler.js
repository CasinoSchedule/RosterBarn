import React from 'react';
import store from 'store';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SidePanel from 'ui/sidePanel_workspace';
import EmployeeInfoForm from 'ui/employeeInfoForm';
import Confirm from 'ui/confirm';
import Settings from 'ui/settings_new';
import { addNewEmployee, deleteEmployee, getEmployeeSchedule, updateEmployee, 
		clearAllSchedule, logout, getAreas, getShiftStrings, autoPopulateSchedule, 
		createWeeklyCalendar, getShifts, getEmployeesByShift, checkPublish, checkPublish2, getEmployeeInfo, publish } from 'api/data';
import { browserHistory } from 'react-router';
import {v4} from 'uuid';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Cookie from 'js-cookie';
import AdminHeader from 'ui/adminHeader';
import AdminWeekdayHeader from 'ui/adminWeekdayHeader';
import AdminWeekHeader from 'ui/adminWeekHeader';
import NameImageBox from 'ui/nameImageBox';
// import { getWeekByWeek, getShifts, getEmployeesByShift } from 'api/data_workspace';
import Workday from 'ui/workday';


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
		// console.log("hello", Cookie.get('token'));
		return ({
			currentDate: new Date(),
			employeeWeeklySchedule: [],
			flexbox_size: "",
			shiftColor: "",
			shiftNum: 0,
			employeeInfo: {},
			areas: [],
			shiftStrings: [],
			employees: [],
			weekShifts: {},
			departmentId: localStorage.getItem("departmentId"),
			publishButton: ''
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
				employeeInfo: currentStore.employeeReducer.employeeInfo,
				areas: currentStore.adminReducer.areas,
				employees: currentStore.adminReducer.employees,
				weekShifts: currentStore.adminReducer.weekShifts,
				shiftStrings: currentStore.adminReducer.shiftStrings,
				publishButton: currentStore.cssReducer.publishButton
			})
		}.bind(this));
		this.refreshCurrentState(new Date());
	},
	componentDidMount: function(){

	},
	handlePublish: function(){
		console.log('hit on Blur');
		
			store.dispatch({
				type: 'CHANGE_PUBLISHBUTTON',
				publishButton: 'publish'
			})
		
	},
	refreshShifts: function(date, shiftId){
		// var shiftId = ((shiftId) ? shiftId : this.state.shiftNum);
		createWeeklyCalendar(date);
		getEmployeesByShift(this.state.shiftNum, this.state.departmentId);
		getShifts(date, this.state.departmentId);
		
	},
	refreshCurrentState: function(date, shiftId){
		var departmentId = localStorage.getItem("departmentId");
		var shiftId = ((shiftId) ? shiftId : this.state.shiftNum);
		createWeeklyCalendar(date);
		getEmployeesByShift(shiftId, departmentId);
		getShifts(date, departmentId);
		getShiftStrings();
		getAreas();
		checkPublish(date, departmentId);

	},
	handleDateChange: function(next){
		// console.log('handleDateChange', next);
		var newWeekDate = this.state.currentDate.addDays(next);
		this.refreshShifts(newWeekDate);
		this.setState({
			currentDate: newWeekDate
		})
	},
	nextSchedule: function(days){
		// console.log('nextSchedule', days);
		this.handleDateChange(days);
	},
	dateChangefromCalendar: function(date){
		this.refreshShifts(date);
		this.setState({
			currentDate: date
		})
	},
	addEmployee: function(e){
		addNewEmployee({
			first_name: "New", 
			last_name: "Employee",
			department: this.state.departmentId
		}, this.state.shiftNum, this.state.departmentId);
	},
	deleteEmployee: function(id){
		deleteEmployee(id, this.state.shiftNum, this.state.departmentId);
		
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
	
	showModule: function(key){
		this.setState({
			[key]: !this.state[key]
		})
	},
	clearSchedule: function(){
		var shiftId = this.state.shiftNum;
		var week = this.state.weekShifts;
		var clearAll = [];
		var keys = Object.keys(week);

		for(let i = 0; i < keys.length; i++){
			clearAll.push(
				{day: week[keys[i]].calendar_date, 
				 employee: week[keys[i]].employee.id, 
				 starting_time: '',
				 area: null}
				 )
		}

		clearAllSchedule(clearAll, this.state.currentDate, this.state.departmentId);
		 
	},
	// setColor: function(val){
	// 	var fieldToChange = val
	// 	var test = [];
	// 	var colors = ['red', 'yellow', 'pink', 'orange'];
	// 	var cut = this.state.employeeWeeklySchedule;
	// 	for(let i = 0; i < cut.length; i++){
	// 		for(let j = 1; j < 8; j++){
	// 			if(cut[i][j][fieldToChange]) {
	// 				if(test.indexOf(cut[i][j][fieldToChange]) === -1){ 
	// 					test.push(cut[i][j][fieldToChange]) 
	// 				}
	// 			}
	// 		}
	// 	}
	// 	for(let i = 0; i < cut.length; i++){
	// 		for(let j = 1; j < 8; j++){
	// 			if(cut[i][j][fieldToChange]) {
	// 				if(test.indexOf(cut[i][j][fieldToChange]) !== -1){ 
	// 					cut[i][j].val =  colors[test.indexOf(cut[i][j][fieldToChange])]
	// 				}
	// 			}
	// 		}
	// 	}
	// 	store.dispatch({
	// 		type: 'GET_EMPLOYEEWEEKLYSCHEDULE',
	// 		employeeWeeklySchedule: cut
	// 	})
	// 	// console.log('test', test);
	// 	// console.log('cut', cut);
	// },
	setColor: function(val){
		let keys = Object.keys(this.state.weekShifts);
		for(let i = 0; i < keys.length; i++){
			console.log(this.state.weekShifts[keys[i]]);
		}
	},
	publish: function(){
		var year = this.state.currentDate.getFullYear();
		var month = this.state.currentDate.getMonth() + 1;
		var day = this.state.currentDate.getDate();
		var dateString = year + '-' + month + '-' + day;
		if(this.state.publishButton  === "publish"){
			publish({date: dateString});
			
			console.log('reset button');
		}
		console.log('Publish button hit', dateString);
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
	handleClick: function(item){
		// this.refreshCurrentState(this.state.currentDate);
		getShifts(this.state.currentDate, this.state.departmentId);
		store.dispatch({
			type: 'THROW_EMPLOYEEINFO',
			employeeInfo: item
		})

		store.dispatch({
			type: 'CHANGE_SHOWFORM',
			showForm: true
		})

	},
	getEmployeeInfo: function(id){
		getEmployeeInfo(id);
	},
	autoPopulate: function(method){
		autoPopulateSchedule(
			this.state.currentDate,
		 	localStorage.getItem("departmentId"),
		 	method
		 	);
	},
	render: function(){

		return (
			<div className="adminBg">

				<SidePanel	
					publish={this.publish}
					publishButton={this.state.publishButton}
					dateChangefromCalendar={this.dateChangefromCalendar}
					filterByShift={this.filterByShift} 
					setColor={this.setColor} />

				<AdminHeader
					areas={this.state.areas} 
					shiftStrings={this.state.shiftStrings}
					shiftNum={this.state.shiftNum} 
					logout={this.logout} 
					show={this.showModule} />

				
				<div className="adminContainer">


					<AdminWeekHeader
						autoPopulate={this.autoPopulate}
						shiftColor={this.state.shiftColor}
						weeklyCalendar={this.state.weeklyCalendar}
						nextSchedule={this.nextSchedule}
						clear={this.clearSchedule}
						printSchedule={this.printSchedule} />

					

					<div className={"scheduleFlex " + this.state.flexbox_size}>
						
						<div className="schedule">
							
							<AdminWeekdayHeader 			
								weeklyCalendar={this.state.weeklyCalendar} 
								addEmployee={this.addEmployee} />

	
							 {this.state.employees.map(function(employee, index){
								return (
										<div key={v4()} className='eachRowNew'>
											
											<NameImageBox 
												key={v4()}
												employee={employee} 
												confirmClear={this.confirmClear}
												shiftNum={this.state.shiftNum}
												departmentId={this.state.departmentId}
												deleteEmployee={this.deleteEmployee} />


											<Workday
												key={index}
												employee={employee} 
												weeklyCalendar={this.state.weeklyCalendar} 
												weekShifts={this.state.weekShifts} 
												areas={this.state.areas} 
												shiftStrings={this.state.shiftStrings}
												handlePublish={this.handlePublish}
												shiftId={this.state.shiftNum}
												currentDate={this.state.currentDate} />

										</div>
								)
							}.bind(this))} 

								
						</div>

					</div>
						
				</div>	

		

					{/* <ReactCSSTransitionGroup transitionName="employeeBox" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
						{(this.state.showClearConfirm) 
							? <Confirm
								key={v4()} 
								confirm={this.clearSchedule} 
								message={"Please confirm to clear schedule."} 
								header={"Clear Schedule"} /> 
							: ""}	
					</ReactCSSTransitionGroup>   */}

					

					<footer>
						
					</footer>

			</div>
		)
	}
})