import React from 'react';
import store from 'store';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import SidePanel from 'ui/sidePanel';
import EmployeeInfoForm from 'ui/employeeInfoForm';
import Confirm from 'ui/confirm';
import Settings from 'ui/settings';
import { addNewEmployee, deleteEmployee, getEmployeeSchedule, updateEmployee, 
		clearAllSchedule, logout, getAreas, getShiftStrings, autoPopulateSchedule, 
		createWeeklyCalendar, getShifts, getEmployeesByShift, checkPublish, getEmployeeInfo } from 'api/data';
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
			showForm: false,
			employeeInfo: {},
			showClearConfirm: false,
			showSettings: false,
			areas: [],
			shiftStrings: [],
			employees: [],
			weekShifts: {},
			departmentId: localStorage.getItem("departmentId")
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
				weekShifts: currentStore.adminReducer.weekShifts,
				shiftStrings: currentStore.adminReducer.shiftStrings
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
		const shiftId = this.state.shiftNum;
		const week = this.state.weekShifts;
		const clearAll = [];

		for(var key in week){
			clearAll.push(
				{day: week[key].calendar_date, 
				 employee: week[key].employee.id, 
				 starting_time: '',
				 area: null}
				 )
		}

		clearAllSchedule(clearAll, this.state.currentDate, this.state.departmentId);
		 
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
		// this.refreshCurrentState(this.state.currentDate);
	},
	render: function(){

		return (
			<div className="adminBg">

				<SidePanel	
					dateString={this.state.weeklyCalendar[0].calendar_date} 
					filterByShift={this.filterByShift} 
					setColor={this.setColor} />

				<AdminHeader 
					logout={this.logout} 
					showSettingsPanel={this.showSettingsPanel} />

				
				<div className="adminContainer">


					<AdminWeekHeader
						autoPopulate={this.autoPopulate}
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

							 {/* <EmployeeRow 
								employees={this.state.employees} 
								areas={this.state.areas} 
								weeklyCalendar={this.state.weeklyCalendar}
								weekShifts={this.state.weekShifts} 
								handleClick={this.handleClick} />	*/}	


							 {this.state.employees.map(function(employee, index){
								return (
										<div key={v4()} className='eachRowNew'>
											
											
												<div className="nameImageBox">
													<div><img src={employee.photo_url} onClick={this.handleClick.bind(this, employee)} /></div>
													<div className="nameIdBox">
														<div className='nameField'>{employee.first_name} {employee.last_name}</div> 
														<div className="idNum">{employee.employee_id}</div>
													</div>
												</div>
											
										
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

					<ReactCSSTransitionGroup transitionName="employeeBox" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
						{(this.state.showForm) 
							? <EmployeeInfoForm
								info={this.state.employeeInfo} 
								key={v4()} 
								refreshCurrentState={this.refreshCurrentState} 
								currentDate={this.state.currentDate}
								confirmDelete={this.confirmClear} 
								deleteEmployee={this.deleteEmployee} 
								shiftNum={this.state.shiftNum}
								departmentId={this.state.departmentId} /> 
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

					<ReactCSSTransitionGroup transitionName="employeeBox" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
						{(this.state.showSettings) 
							? <Settings
								key={v4()} 
								areas={this.state.areas} 
								shiftStrings={this.state.shiftStrings} 
								shiftNum={this.state.shiftNum} /> 
							: ""}	
					</ReactCSSTransitionGroup>

			</div>
		)
	}
})