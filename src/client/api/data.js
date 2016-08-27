import api from 'api/api';
import store from 'store';
import { browserHistory } from 'react-router';
import Cookie from 'js-cookie';
import { v4 } from 'uuid';

api.new('https://sheltered-springs-57964.herokuapp.com/');
// api.new('http://10.68.0.45:8000/');

const abbreviatedDayString = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
const dayString = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		


Date.prototype.addDays = function(days){
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

Date.prototype.subtractDays = function(days){
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() - days);
    return dat;
}


export function login(user, pass) {
  return api.login(user, pass);
}

export function logout() {
 return api.logout();
}

export function checkAdmin(){
	console.log("api", api);
	console.log("check_admin", Cookie.get('token'));
	return api.get('/profiles/check/').then(function(resp){
		console.log("After api.get", Cookie.get('token'));
		console.log('checkAdmin function', resp.data, resp.data.type, resp.data.department, resp.data.department_title);
		if(resp.data.type === "manager"){
			localStorage.setItem("departmentId", resp.data.department);
			localStorage.setItem("departmentTitle", resp.data.department_title);
			browserHistory.push('/scheduler')
		} else {
			browserHistory.push('/mobile_calendar')
		}
	})
}

export function registerNewEmail(obj){
	console.log('New Email registered');
	return api.post('/profiles/notify/employee/', obj);

}



// 			*********     Employee Info     *********

export function getEmployeeInfo(id, cb){
	return api.get('/profiles/employee/'+ id + "/").then(function(resp){
		console.log('employee', resp.data)
		store.dispatch({
			type: 'THROW_EMPLOYEEINFO',
			employeeInfo: resp.data
		})
		cb(); 

		// store.dispatch({
		// 	type: 'CHANGE_SHOWFORM',
		// 	showForm: true
		// })
	});

}

// promise (.then) refreshes state
export function addNewEmployee(obj, shiftId, departmentId){
	return api.post('/profiles/employee/', obj).then(function(){
		getEmployeesByShift(shiftId, departmentId);
	});
}
// promise (.then) refreshes state
export function updateEmployee(id, obj, shiftId, departmentId){
	return api.put('/profiles/employee/update/' + id + "/", obj).then(function(){
		getEmployeesByShift(shiftId, departmentId);
	});

}
// promise (.then) refreshes state
export function deleteEmployee(id, shiftId, departmentId){
	return api.delete('/profiles/employee/' + id + "/").then(function(){
		getEmployeesByShift(shiftId, departmentId);
	});

}

export function getEmployeesByShift(shiftId, departmentId){
	var employeeParams = {};
	employeeParams['shift_title'] = shiftId;
	employeeParams['department'] = departmentId;
	var employeeQuery = queryStringFromDict(employeeParams);

	return api.get('/profiles/employee/' + employeeQuery).then(function(resp){
		// console.log('Employees', resp.data)
		store.dispatch({
			type: 'GET_EMPLOYEES',
			employees: resp.data
		})
	})
}

export function getDaysOff(id){
	return api.delete('/profiles/employee/' + id + "/").then(function(){
		store.dispatch({
			type: 'GET_DAYSOFF',
			employees: resp.data
		})
	});

}

// 		*****************************************





// 			*******     Area and Stations     *******

export function getAreas(){
	return api.get('/schedules/area/').then(function(resp){
		console.log('areas', resp.data)
		store.dispatch({
			type: 'GET_AREAS',
			areas: resp.data
		})
	})
}
// promise (.then) refreshes state
export function deleteArea(id){
	return api.delete('/schedules/area/' + id + '/').then(function(){
		getAreas();
	});

}
// promise (.then) refreshes state
export function addArea(obj){
	return api.post('/schedules/area/', obj).then(function(){
		getAreas();
	});
	
}
// 		*****************************************





export function publish(obj){
	return api.post('/schedules/shift/publish/', obj).then(function(){
		store.dispatch({
			type: 'CHANGE_PUBLISHBUTTON',
			publishButton: "noChanges"
		})
		// getShifts();
	});
}




// 			***********     Shifts   ************

export function checkPublish(date, departmentId){
	var weekShiftParams = {};
	weekShiftParams['date'] = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	weekShiftParams['department'] = departmentId;
	var shiftQuery = queryStringFromDict(weekShiftParams);

	return api.get('/schedules/weekshift/' + shiftQuery).then(function(resp){
				store.dispatch({
					type: 'CHANGE_PUBLISHBUTTON',
					publishButton: 'noChanges'
				})
		resp.data.forEach(function(shift, i){
			if (shift.visible === false) {
				store.dispatch({
					type: 'CHANGE_PUBLISHBUTTON',
					publishButton: 'publish'
				})
			} 
		})
	})
}

// get week's shifts for all employees
export function getShifts(date, departmentId){
	var weekShiftParams = {};
	weekShiftParams['date'] = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	weekShiftParams['department'] = departmentId;
	var shiftQuery = queryStringFromDict(weekShiftParams);

	return api.get('/schedules/weekshift/' + shiftQuery).then(function(resp){
		console.log('Shifts', resp.data)  

		var allShifts = resp.data.reduce(function(o, v, i) {
			  o['date_' + v.calendar_date + '_employee_id_' + v.employee.id] = v;
			  return o;
			}, {});

		store.dispatch({
			type: 'GET_WEEKSHIFTS',
			weekShifts: allShifts
		})
	})
}


export function sendSingleEmployeeShiftObj(obj, date, departmentId, shiftId){
	return api.post('/schedules/shift/many/', obj);
	// .then(function(){
	// 	checkPublish(date, departmentId);
		// createWeeklyCalendar(date);
		// getEmployeesByShift(shiftId, departmentId);
		// getShifts(date, departmentId);
	// });
}


export function clearAllSchedule(array, date, departmentId){
	return api.post('/schedules/shift/many/', array).then(function(){
		getShifts(date, departmentId);
	});
}



// 		*****************************************





// 			*******     Shift Strings     *******

export function getShiftStrings(){
	return api.get('/schedules/shift/template/').then(function(resp){
		var sortedStrings = resp.data.sort(function(a, b){
			if (parseInt(a.starting_time) > parseInt(b.starting_time)) {
			    return 1;
			  }
			  if (parseInt(a.starting_time) < parseInt(b.starting_time)) {
			    return -1;
			  }
			  // a must be equal to b
			  return 0;
		});
		store.dispatch({
			type: 'GET_SHIFTSTRINGS',
			shiftStrings: sortedStrings
		})
	})
}
// promise (.then) refreshes state
export function deleteShiftString(id){
	return api.delete('/schedules/shift/template/' + id + '/').then(function(){
		getShiftStrings();
	});

}
// promise (.then) refreshes state
export function addShiftString(obj){
	return api.post('/schedules/shift/template/', obj).then(function(){
		getShiftStrings();
	});
	
}
// 		*****************************************





// 			**********     Build Calendars     **********

export function createCalendarDay(start, i, type){
	var newItem = {
		uniqueId: v4(),
		dayString: dayString[start.addDays(i).getDay()],
		abbreviatedDayString: abbreviatedDayString[start.addDays(i).getDay()],
		monthString: months[start.addDays(i).getMonth()],
		fullDateString: months[start.addDays(i).getMonth()] + ' ' + start.addDays(i).getDate() + ', ' + start.addDays(i).getFullYear(),
		javascriptMonthNum: start.addDays(i).getMonth(),
		year: start.addDays(i).getFullYear(),
		month: start.addDays(i).getMonth(), 
		day: start.addDays(i).getDate(),
		calendar_date: start.addDays(i).getFullYear() + "-" + (start.addDays(i).getMonth() + 1) + "-" + start.addDays(i).getDate(),
		currentClass: ((type) ? type : ''),
		dayIndex: start.addDays(i).getDay() + 1		// Python Index

	}

	return newItem
}

export function createWeeklyCalendar(date){
		var dayIndex = date.getDay();
		var dumbWay = [-6, 0, -1, -2, -3, -4, -5];
		var smartWay = (dayIndex + 6) % 7;
		var daysToNearestMonday = dumbWay[dayIndex];
		var weekStartDate = date.addDays(daysToNearestMonday);
		var weekDays = [];
		
		for(let i = 0; i < 7; i++){
			weekDays.push(createCalendarDay(weekStartDate, i));
		}

		store.dispatch({
			type: 'GET_WEEKLYCALENDAR',
			weeklyCalendar: weekDays
		})
}

export function createMonthlyCalendar(date){
	let month = date.getMonth();
	let year = date.getFullYear();
	let daysInMonth = new Date(year, month, 0).getDate();
	let firstDayOfMonth = new Date(year, month, 1).getDay();
	let lastDayOfMonth = new Date(year, month, daysInMonth).getDay();
	let calendarStartDay = ((firstDayOfMonth) ? -(firstDayOfMonth) : 0);
	let endDay = 6 - lastDayOfMonth;
	let totalCalendarDays = Math.abs(calendarStartDay) + daysInMonth + endDay;
	let startDate = new Date(year, month, 1);
	let calendarDays = [];

	for(let i = calendarStartDay, n = 0; n < totalCalendarDays; i++, n++){
		let type = ((i < 0 || i > startDate.addDays(i).getDate()) ? 'inactiveMonth' : 'activeMonth');
		calendarDays.push(createCalendarDay(startDate, i, type));
	}
		console.log('calendarDays', calendarDays)
		store.dispatch({
			type: 'GET_MONTHLYCALENDAR',
			monthlyCalendar: calendarDays
		})
}


// 			*****************************************





// convert hour and minute to 12 hour format with am or pm string attached (preceding hour zeros not currently filtered)
// String generator. No error checks
export function ampm(h, m){
	return ((h == '00') ? ('12:' + m + 'am') : (h >= 12) ? ((h - 12) + ':' + m + 'pm') : (h + ':' + m + 'am'));
}

//convert 12 hour time format to 24 hour format
export function twelveToTwentyFour(hour, minute, ampm){
	var hourConverted = '';
	var minuteConverted = ((minute.length === 1) ? '0' + minute.toString() : minute);
	
	if(hour == '12' && ampm == 'am'){
		hourConverted = '00';
	} else if(ampm == 'pm' && hour != '12'){
		hourConverted = parseInt(hour) + 12
	} else {
		hourConverted = ((hour.length === 1) ? '0' + hour : hour)
	}

	return (hourConverted.toString() + ':' + minuteConverted);
}


// creates shift string ('12pm to 8pm') for display and provides an associated value of start time (12:00)
export function createShiftString(start, end){
	const startTime = ampm(start.slice(0,2), start.slice(3,5)), endTime = ampm(end.slice(0,2), end.slice(3,5));
	
	return {
			shiftString: startTime + ' to ' + endTime,
			value: start
		} 
}




export function getWorkWeekSchedule(month, year){
	return api.get('/schedules/employeemonth/?month=' + month + '&year=' + year).then(function(resp){

		store.dispatch({
			type: 'GET_EMPLOYEEMONTHLYSCHEDULE',
			employeeMonthlySchedule: resp.data
		})
		// console.log('From the call', resp.data);
	})
}



export function stringDate(date) {
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

export function working_today(scheduleInfo){
	var start_time = ""
	scheduleInfo.forEach(function(item, i){
		if(item.day === new Date().getDate() && item.javascriptMonthNum === new Date().getMonth()){
			start_time = item.starting_time
		}
	})
	return start_time || ""
}



export function addNewEmployeeUser(username, password, profile_id, cb){

  return api.post('profiles/useremployee/', {username:username, password:password, profile_id:profile_id}).then(function(){
    api.login(username, password).then(function(){
       cb();
    }).catch(function(err){
      console.log('first', err);
    });
  }).catch(function(err){
    console.log('second', err.data);

    store.dispatch({
		type: 'HANDLE_ERROR',
		errorMessage: err.data
	});
   
  })
}

export function queryStringFromDict(dict) {
	// Takes an object of query params and returns a query string.
	var valuesArray = [];
	for(var key in dict) {
		if(dict[key]) {
			valuesArray.push(String(key) + '=' + String(dict[key]))
		}
	}
	if(valuesArray.length > 0){
		return '?' + valuesArray.join('&');
	}
	else{
		return '';
	}
}

export function autoPopulateSchedule(date, departmentId, method) {
	var obj = {
		"date": date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
		"department": departmentId,
		"method": method
	}
	return api.post('schedules/auto/', obj).then(function(){
		getShifts(date, departmentId);
	});
}







































// export function getShifts(date, departmentId){
// 	var weekShiftParams = {};
// 	weekShiftParams['date'] = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
// 	weekShiftParams['department'] = departmentId;
// 	var shiftQuery = queryStringFromDict(weekShiftParams);

// 	return api.get('/schedules/weekshift/' + shiftQuery).then(function(resp){
// 		console.log('Shifts', resp.data)
// 		var allShifts = resp.data.reduce(function(o, v, i) {
// 			  o['date_' + v.calendar_date + '_employee_id_' + v.employee.id] = v;
// 			  return o;
// 			}, {});
// 		console.log('All Shifts Object', allShifts)
// 		store.dispatch({
// 			type: 'GET_WEEKSHIFTS',
// 			weekShifts: allShifts
// 		})
// 	})
// }


// export function setNewSchedule(uniqueId, arr, newScheduleItem) {
// 	console.log('Set New Schedule ', newScheduleItem);
// 	var newArr = arr.map(function(indArr){
// 		return indArr.map(function(item){
// 			if (item.uniqueId === uniqueId) {
// 				return newScheduleItem;
// 				// return new schedule item with date attached
// 			} else {
// 				return item;
// 			}
// 		});
// 	});
// 	// console.log('After function', newArr)
// 	store.dispatch({
// 		type: 'GET_EMPLOYEEWEEKLYSCHEDULE',
// 		employeeWeeklySchedule: newArr
// 	})
// }



// export function getEmployeeSchedule(date, shiftId, departmentId, clearAll){
// 	var workWeekSchedule = [], employees = [], scheduledEmployees = [], weekdays = [], employeeRow = [];

// 	var weekShiftParams = {};
// 	weekShiftParams['date'] = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
// 	weekShiftParams['department'] = departmentId;
// 	var shiftQuery = queryStringFromDict(weekShiftParams);

// 	var employeeParams = {};
// 	employeeParams['shift_title'] = shiftId;
// 	employeeParams['department'] = departmentId;
// 	var employeeQuery = queryStringFromDict(employeeParams);

// 	return api.get('/schedules/weekshift/' + shiftQuery).then(function(resp){
// 		workWeekSchedule = ((clearAll) ? [] : resp.data);
			
// 		return api.get('/profiles/employee/' + employeeQuery).then(function(resp){
// 			employees = resp.data;
	
// 			getWeekByWeek(date, function(weekdays){
// 					weekdays = weekdays;
// 					for(var i = 0, n = 0; i < employees.length; i++, n++){
// 						scheduledEmployees.push(createEmployeeInfo(employees[i], "nameField"))
// 						for(var j = 0; j < 7; j++){
// 							var currentShift = checkIfWorking(weekdays[j].calendar_date, employees[i].id);
// 							scheduledEmployees.push(createEmployeeShift(employees[i], 'timeField', currentShift, weekdays[j].calendar_date));
// 						}
// 					}
// 			})
				
// 				function checkIfWorking(date, id){
// 					for(var i = 0; i < workWeekSchedule.length; i++){
// 						if(workWeekSchedule[i].calendar_date === date && workWeekSchedule[i].employee.id === id) {
// 							return ((workWeekSchedule[i].starting_time) 
// 								? {
// 									time: workWeekSchedule[i].starting_time.slice(0, 5),
// 									shiftString: createShiftString(workWeekSchedule[i].starting_time, workWeekSchedule[i].end_time),
// 									epoch_milliseconds: workWeekSchedule[i].epoch_milliseconds, 
// 									station: ((workWeekSchedule[i].station) ? workWeekSchedule[i].station.title : ""),
// 									visible: workWeekSchedule[i].visible} 

// 								: "")
// 						}
// 					}
// 					return ""
// 				}

// 				function checkShiftVisibile(shiftData){
// 					// Check shift objects to see if any have visible=false
// 					var rows = shiftData;
// 					for(let i=0; i < rows.length; i++){
// 						var row = rows[i];
// 						for (let j=0; j < row.length; j++) {
// 							if (row[j].visible == false) {
// 								return 'publish';
// 							}
// 						}
// 					}
// 					return 'noChanges';}

// 				// Split array of objects by employee 
// 				for(let i = 0; i < employees.length; i++){
// 					employeeRow.push(scheduledEmployees.splice(0, 8));
// 				}

// 				var publishStatus = checkShiftVisibile(employeeRow);

// 				store.dispatch({
// 				type: 'CHANGE_PUBLISHBUTTON',
// 				publishButton: publishStatus
// 				})

// 				store.dispatch({
// 					type: 'GET_EMPLOYEEWEEKLYSCHEDULE',
// 					employeeWeeklySchedule: employeeRow
// 				})
				
// 		})	

// 	})
// }

// export function createEmployeeInfo(employee, type){
// 	employee.nameString = employee.first_name + " " + employee.last_name
// 	employee.uniqueId = v4();
// 	employee.nameFieldCss = type;
	
// 	return employee
// }

// export function createEmployeeShift(employee, type, currentShift, date){
// 	var newItem = {
// 		id: employee.id,
// 		calendar_date: date,
// 		epoch_milliseconds: currentShift.epoch_milliseconds || null,
// 		uniqueId: v4(),
// 		starting_time: currentShift.time || '',
// 		station: currentShift.station || '',
// 		classInfoTime: type,
// 		position_title: employee.position_title,
// 		visible: currentShift.visible
// 	}
	
// 	return newItem
// }

export function calendar(month, year, monthdate, employee){
	// console.log('Init', month, year, monthdate);
		var month = monthdate - 1;
		var preceding_days = new Date(year, month, 1).getDay();
		var	month_count = new Date(year, month+1, 0).getDate();
		var	trailing_days = 42 - month_count - preceding_days;
		var start_day = new Date(year, month, 1).subtractDays(preceding_days);
		var collection = [];

		function collectionDate(date, type) {
			var newItem = {
				calendar_date: stringDate(date),
				currentClass: type,
				day: date.getDate(),
				month: months[date.getMonth()],
				year: date.getFullYear(),
				javascriptMonthNum: date.getMonth()
			};
			return newItem;
		}

		for(var i=0; i < 42; i++) {
			if(i < preceding_days || i >= 42 - trailing_days){
				collection.push(collectionDate(start_day.addDays(i), 'inactiveMonth'));
			}
			else{
				collection.push(collectionDate(start_day.addDays(i), "activeMonth"));
			}
		}

		// console.log('collection', collection);

		if (employee){

		 return api.get('/schedules/employeemonth/?month=' + monthdate + '&year=' + year).then(function(resp){

		 	var data = resp.data;

			var scheduleInfo = collection.map(function(item, i){
					return ({
						year: item.year,
						month: item.month,
						day: item.day,
						calendar_date: item.calendar_date,
						currentClass: item.currentClass,
						javascriptMonthNum: item.javascriptMonthNum,
						starting_time: checkSchedule(item.calendar_date)
					})
				})

			var working = working_today(scheduleInfo);

				store.dispatch({
					type: 'GET_DATEOBJECTS',
					collection: scheduleInfo,
					working_today: working
				})

				// console.log('scheduleInfo', scheduleInfo);

				console.log("Working Today From Calendar Function:", working);


				// ampm function can be used here. Try out when employee side is refactored. 

				function checkSchedule(check){
					var hour_time_check = 0;
					for(var i = 0; i < data.length; i++){
						if(data[i].calendar_date === check) {
							if(data[i].starting_time){
								hour_time_check = parseInt(data[i].starting_time.slice(0, 2));
								if(hour_time_check === 12){
									return data[i].starting_time.slice(0, 5) + "pm";
								} else if(hour_time_check < 12) {
									return data[i].starting_time.slice(0, 5) + "am"
								} else {
									hour_time_check = hour_time_check - 12
									return hour_time_check + ":" + data[i].starting_time.slice(3, 5) + "pm"
								}
							}
							else {
								return ""
							}
						}
					}
				}
		
		})} else { 

			store.dispatch({
				type: 'GET_DATEOBJECTS',
				collection: collection
			})}
}
