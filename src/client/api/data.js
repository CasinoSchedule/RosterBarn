import api from 'api/api';
import store from 'store';

api.new('https://sheltered-springs-57964.herokuapp.com/');
// api.new('http://10.68.0.45:8000/');

export function login(user, pass) {
  return api.login(user, pass);
}

export function logout() {
 return api.logout();
}

export function getEmployeeSchedule(year, month, day){
	var pythonMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	var pythonChopDate = new Date(year, month-1, day);
	year = pythonChopDate.getFullYear();
	month = pythonMonth[pythonChopDate.getMonth()];
	day = pythonChopDate.getDate();
	var workWeekSchedule = [];
	var employees = [];
	var pythonBackToJavascriptMonth = month - 1;
	var scheduledEmployees = [];
	var weekdays = [];
	var myArr = [];
	return api.get('/schedules/weekshift/?date=' + year + "-" + month + "-" + day).then(function(resp){
		workWeekSchedule = resp.data;
		return api.get('/profiles/employee/').then(function(resp){
			employees = resp.data;
			
			getWeekByWeek(year, pythonBackToJavascriptMonth, day, function(weekdays){
					weekdays = weekdays;

					for(var i = 0, n = 0; i < employees.length; i++, n++){
						scheduledEmployees.push({
								nameString: employees[i].first_name + " " + employees[i].last_name,
								employee_id: employees[i].employee_id,
								classInfoName: "nameField"
								
							})
						for(var j = 0; j < 7; j++){
							// console.log(employees[i].employee_id)
							let uniqueId = weekdays[j].calendar_date + '-' + employees[i].id;
							let obj = {
								id: employees[i].id,
								name: employees[i].first_name + " " + employees[i].last_name,
								calendar_date: weekdays[j].calendar_date,
								employee_id: employees[i].employee_id,
								starting_time: checkSchedule2(weekdays[j].calendar_date, employees[i].employee_id),
								uniqueId: uniqueId,
								classInfoTime: "timeField"
							}

							scheduledEmployees.push(obj);
						}
					}
			})
				
				function checkSchedule2(date, id){
					for(var i = 0; i < workWeekSchedule.length; i++){
						if(workWeekSchedule[i].calendar_date === date && workWeekSchedule[i].employee.employee_id === id) {
							return ((workWeekSchedule[i].starting_time) ? workWeekSchedule[i].starting_time.slice(0, 5) : "")
						}
					}
					return ""
				}


				var newarr = [];
				for(let i = 0; i < employees.length; i++){
					newarr.push(scheduledEmployees.splice(0, 8));
				}

				store.dispatch({
					type: 'GET_EMPLOYEEWEEKLYSCHEDULE',
					employeeWeeklySchedule: newarr
				})


				console.log('newarr', newarr);
				// console.log('scheduledEmployees', scheduledEmployees);
				// console.log('Cb', weekdays);
				// console.log('workWeekSchedule', workWeekSchedule);
				// console.log('employees', employees);

		})	

		
		// console.log('From the call', resp.data);
	})
}

export function getWeekByWeek(year, month, day, cb){
	Date.prototype.addDays = function(days){
		    var dat = new Date(this.valueOf());
		    dat.setDate(dat.getDate() + days);
		    
		    return dat;
		}
		var abbreviatedDayString = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
		var dat = new Date(year, month, day);
		
		var dayIndex = dat.getDay();
		
		var dayIndexArray = [[-6, -5, -4, -3, -2, -1, 0],[0, 1, 2, 3, 4, 5, 6],[-1, 0, 1, 2, 3, 4, 5],[-2, -1, 0, 1, 2, 3, 4],[-3, -2, -1, 0, 1, 2, 3],[-4, -3, -2, -1, 0, 1, 2],[-5, -4, -3, -2, -1, 0, 1]];


		var weekDays = [];
		for(let i = 0; i < 7; i++){
			let n = dayIndexArray[dayIndex][i]
			var pythonMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
			weekDays[i] = {
				year: dat.addDays(n).getFullYear(),
				monthString: months[dat.addDays(n).getMonth()],
				dayString: abbreviatedDayString[dat.addDays(n).getDay()],
				javascriptMonthNum: dat.addDays(n).getMonth(),
				day: dat.addDays(n).getDate(),
				calendar_date: dat.addDays(n).getFullYear() + "-" + pythonMonth[dat.addDays(n).getMonth()] + "-" + dat.addDays(n).getDate(),
				currentClass: ""
			}
		}

		((cb) ? cb(weekDays) : "");

		((!cb) ? store.dispatch({
			type: 'GET_WEEKLYCALENDAR',
			weeklyCalendar: weekDays
		})
		: "")
		

		// console.log(weekDays);

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

export function publish(obj){
	return api.post('/schedules/shift/publish', obj);
}

export function setNewSchedule(uniqueId, arr, newScheduleItem) {
	console.log('Set New Schedule ', newScheduleItem);
	var newArr = arr.map(function(indArr){
		return indArr.map(function(item){
			if (item.uniqueId === uniqueId) {
				return newScheduleItem;
				// return new schedule item with date attached
			} else {
				return item;
			}
		});
	});
	// console.log('After function', newArr)
	store.dispatch({
		type: 'GET_EMPLOYEEWEEKLYSCHEDULE',
		employeeWeeklySchedule: newArr
	})
}

export function sendEmployeeShiftObj(obj){
	console.log('Send Employee Shift Obj', obj);
	return api.post('/schedules/shift/many', obj)
}


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

export function stringDate(date) {
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

export function calendar(month, year, monthdate, employee){
	// console.log('Init', month, year, monthdate);
	
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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
				year: date.getFullYear()
			};
			return newItem;
		}

		for(var i=0; i < 42; i++) {
			if(i < preceding_days || i >= 42 - trailing_days){
				collection.push(collectionDate(start_day.addDays(i), 'inactiveMonth'));
			}
			else{
				collection.push(collectionDate(start_day.addDays(i), ""));
			}
		}

		console.log('collection', collection);

		if (employee){

		 return api.get('/schedules/employeemonth/?month=' + monthdate + '&year=' + year).then(function(resp){

			var scheduleInfo = collection.map(function(item, i){
					return ({
						year: item.year,
						month: item.month,
						day: item.day,
						calendar_date: item.calendar_date,
						currentClass: item.currentClass,
						starting_time: checkSchedule(item.calendar_date)
					})
				})

				store.dispatch({
					type: 'GET_DATEOBJECTS',
					collection: scheduleInfo
				})

				function checkSchedule(check){
					for(var i = 0; i < resp.data.length; i++){
						if(resp.data[i].calendar_date === check) {
							return ((resp.data[i].starting_time) ? resp.data[i].starting_time.slice(0, 5) : "")
						}
					}
					return ""
				}
		})} else { 

			store.dispatch({
				type: 'GET_DATEOBJECTS',
				collection: collection
			})}
}



		// store.dispatch({
		// 	type: 'GET_CALENDARDAYS',
		// 	calendarDays: boxes
		// })
		

	// console.log('calendarDays:', collection);
	// console.log('Days in the month of ' + month, daysInMonths[x]);

	// export function calendar(month, year, monthdate, employee){
// 	// console.log('Init', month, year);
	
// 	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], 
// 		year = parseInt(year, 10), 
// 		daysInMonths = [31, (((year%4==0)&&(year%100!=0))||(year%400==0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], 
// 		boxes =[], 
// 		collection = [],
// 		x = months.indexOf(month),
// 		startDay = new Date(year, x, 1).getDay(),
// 		totalCalendarDays = 42 - daysInMonths[x] - startDay, 
// 		daysInPreviousMonth = 0,
// 		format = "",
// 		weeklyCalendar = [];
		
// 		if(x === 0){
// 			daysInPreviousMonth = daysInMonths[11];
// 		} else {
// 			daysInPreviousMonth = daysInMonths[x - 1]
// 		}
	
// 	((startDay === 0) ? createCal(daysInMonths[x], totalCalendarDays, null, year, x) : createCal(daysInMonths[x], totalCalendarDays, startDay, year, x));

// 	function createCal(a, b, c, d, x){
// 		var pythonMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// 		for(var i = 1, n = 0; i <= a; i++, n++){
// 			format = d + "-" + pythonMonth[x] + "-" + i;
// 			boxes.push(format);
// 			collection[n] = {
// 				year: d,
// 				month: months[x],
// 				day: i,
// 				calendar_date: format,
// 				currentClass: ""
// 			}
// 			boxes.push(collection[n].calendar_date)
// 		}
// 		for(var j = 1; j <= b; j++){
// 			format = ((x === 11) ? d + 1 : d) + "-" + pythonMonth[x] + "-" + j;
// 			boxes.push(format);
// 			collection.push({
// 				year: ((x === 11) ? d + 1 : d),
// 				month: ((x === 11) ? months[0] : months[x + 1]),
// 				day: j,
// 				calendar_date: format,
// 				currentClass: "inactiveMonth"
// 			})
// 		}
// 		if(c){
// 			for(var h = 0; h < c; h++){
// 				format = ((x === 0) ? d - 1 : d) + "-" + pythonMonth[x] + "-" + daysInPreviousMonth
// 				boxes.unshift(format);
// 				collection.unshift({
// 					year: ((x === 0) ? d - 1 : d),
// 					month: ((x === 0) ? months[11] : months[x - 1]),
// 					day: daysInPreviousMonth,
// 					calendar_date: format,
// 					currentClass: "inactiveMonth"
// 				})
// 				daysInPreviousMonth -= 1;
// 			}
// 		}


// 		if(employee) {
// 			return api.get('/schedules/employeemonth/?month=' + monthdate + '&year=' + year).then(function(resp){
			
// 				var scheduleInfo = collection.map(function(item, i){
// 					return ({
// 						year: item.year,
// 						month: item.month,
// 						day: item.day,
// 						calendar_date: item.calendar_date,
// 						currentClass: item.currentClass,
// 						starting_time: checkSchedule(item.calendar_date)
// 					})
// 				})
			
// 				store.dispatch({
// 					type: 'GET_DATEOBJECTS',
// 					collection: scheduleInfo
// 				})

// 				function checkSchedule(check){
// 					for(var i = 0; i < resp.data.length; i++){
// 						if(resp.data[i].calendar_date === check) {
// 							return ((resp.data[i].starting_time) ? resp.data[i].starting_time.slice(0, 5) : "")
// 						}
// 					}
// 					return ""
// 				}		
// 			})
// 		} else {
// 			store.dispatch({
// 				type: 'GET_DATEOBJECTS',
// 				collection: collection
// 			})
// 		}
// 	}
// }