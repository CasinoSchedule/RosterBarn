import api from 'api/api';
import store from 'store';
import { v4 } from 'uuid';

export function getShifts(year, month, day){
	return api.get('/schedules/weekshift/?date=' + year + "-" + month + "-" + day)
}

export function getEmployeesByShift(shiftFilter){
	return api.get(shiftFilter);
}

export function createEmployeeInfo(employee, type){
	var newItem = {
		nameString: employee.first_name + " " + employee.last_name,
		photo_url: employee.photo_url,
		availability: employee.availability,
		uniqueId: v4(),
		id: employee.id,
		employee_id: employee.employee_id,
		first_name: employee.first_name,
		last_name: employee.last_name,
		phone_number: employee.phone_number,
		email: employee.email,
		position_title: employee.position_title,
		visible: employee.visible,
		classInfoTime: type,
		shift_title: employee.shift_title
	}
	return newItem
}

export function createEmployeeShift(employee, type, currentShift, date){
	var newItem = {
		uniqueId: v4(),
		id: employee.id,
		calendar_date: date,
		starting_time: currentShift.time || '',
		station: currentShift.station || '',
		visible: employee.visible,
		classInfoTime: type
	}
	return newItem
}

export function getEmployeeSchedule(year, month, day, shift){
	var shiftFilter = ((shift) ? '/profiles/employee/' + shift : '/profiles/employee/');
	var workWeekSchedule = [], employees = [], scheduledEmployees = [], weekdays = [];
	

	// takes year, month and day parameters and converts to valid Python date
	var pythonChopDate = new Date(year, month-1, day);
	year = pythonChopDate.getFullYear();
	month = pythonMonth[pythonChopDate.getMonth()];
	day = pythonChopDate.getDate();
	var pythonBackToJavascriptMonth = month - 1;
	
	Promise.all([
		getWeekByWeek(year, pythonBackToJavascriptMonth, day, function(days){
			weekdays = days;
			console.log('weekdays', weekdays);
			console.log(shiftFilter);
	}), getEmployeesByShift(shiftFilter).then(function(resp){
			console.log('employees', resp.data);
			employees = resp.data;

	}), getShifts(year, month, day).then(function(resp){
			console.log('workWeekSchedule', resp.data)
			workWeekSchedule = resp.data;
	})]).then(function(){
		
			for(let i = 0; i < employees.length; i++){
				
				scheduledEmployees.push(createEmployeeInfo(employees[i], "namefield"))
				for(let j = 0; j < 7; j++){
					console.log('In for the next for', workWeekSchedule);
					console.log(weekdays[j].calendar_date, employees[i].id);
					let currentShift = checkIfWorking(weekdays[j].calendar_date, employees[i].id, workWeekSchedule[i]);
					console.log('currentShift', currentShift);
						scheduledEmployees.push(createEmployeeShift(employees[i], 'timefield', currentShift, weekdays[j].calendar_date));
				}
			}
	
			function checkIfWorking(date, id, workWeekSchedule){
					var check = workWeekSchedule;
					console.log('checkIfWorking Hit', check)
					console.log('length', workWeekSchedule.length)
					for(var i = 0; i < workWeekSchedule.length; i++){
						if(check.calendar_date === date && check.employee.id === id) {
							return ((check.starting_time) ? {time: check.starting_time.slice(0, 5), station: ((check.station) ? check.station.title : "")} 
								: "")

						}
						return ""
					}
			}

			var employeeRow = [];
				for(let i = 0; i < employees.length; i++){
					employeeRow.push(scheduledEmployees.splice(0, 8));
				}
				console.log(employeeRow)
				store.dispatch({
					type: 'GET_EMPLOYEEWEEKLYSCHEDULE',
					employeeWeeklySchedule: employeeRow
				})
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


export function getWeekByWeek(date, cb){
		var abbreviatedDayString = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var dayIndex = date.getDay();
		var weekDays = [];
		var dayIndexArray = [[-6, -5, -4, -3, -2, -1, 0],[0, 1, 2, 3, 4, 5, 6],[-1, 0, 1, 2, 3, 4, 5],[-2, -1, 0, 1, 2, 3, 4],[-3, -2, -1, 0, 1, 2, 3],[-4, -3, -2, -1, 0, 1, 2],[-5, -4, -3, -2, -1, 0, 1]];

		for(let i = 0; i < 7; i++){
			let n = dayIndexArray[dayIndex][i]
			var pythonMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
			weekDays[i] = {
				year: date.addDays(n).getFullYear(),
				monthString: months[date.addDays(n).getMonth()],
				dayString: abbreviatedDayString[date.addDays(n).getDay()],
				javascriptMonthNum: date.addDays(n).getMonth(),
				day: date.addDays(n).getDate(),
				calendar_date: date.addDays(n).getFullYear() + "-" + pythonMonth[date.addDays(n).getMonth()] + "-" + date.addDays(n).getDate(),
				currentClass: ""
			}
		}

		((cb) ? cb(weekDays) : "");

		((!cb) ? store.dispatch({
			type: 'GET_WEEKLYCALENDAR',
			weeklyCalendar: weekDays
		})
		: "")
		

		// console.log('weeklyCalendar', weekDays);

}
