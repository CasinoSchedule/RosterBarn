import api from 'api/api';
import store from 'store';
import { v4 } from 'uuid';


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
		console.log('All Shifts Object', allShifts)
		store.dispatch({
			type: 'GET_WEEKSHIFTS',
			weekShifts: allShifts
		})
	})
}

export function getEmployeesByShift(shiftId, departmentId){
	var employeeParams = {};
	employeeParams['shift_title'] = shiftId;
	employeeParams['department'] = departmentId;
	var employeeQuery = queryStringFromDict(employeeParams);

	return api.get('/profiles/employee/' + employeeQuery).then(function(resp){
		console.log('Employees', resp.data)
		store.dispatch({
			type: 'GET_EMPLOYEES',
			employees: resp.data
		})
	})
}

export function getWeekByWeek(date){
		var abbreviatedDayString = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var dayIndex = date.getDay();
		var dumbWay = [-6, 0, -1, -2, -3, -4, -5];
		var smartWay = (dayIndex + 6) % 7;
		var daysToNearestMonday = dumbWay[dayIndex];
		var weekStartDate = date.addDays(daysToNearestMonday);
		var weekDays = [];
		

		for(let i = 0; i < 7; i++){
			weekDays[i] = {
				uniqueId: v4(),
				year: weekStartDate.addDays(i).getFullYear(),
				monthString: months[weekStartDate.addDays(i).getMonth()],
				dayString: abbreviatedDayString[weekStartDate.addDays(i).getDay()],
				javascriptMonthNum: weekStartDate.addDays(i).getMonth(),
				day: weekStartDate.addDays(i).getDate(),
				calendar_date: weekStartDate.addDays(i).getFullYear() + "-" + (weekStartDate.addDays(i).getMonth() + 1) + "-" + weekStartDate.addDays(i).getDate(),
				currentClass: ""
			}
		}

		store.dispatch({
			type: 'GET_WEEKLYCALENDAR',
			weeklyCalendar: weekDays
		})
		console.log('weeklyCalendar', weekDays)

}

