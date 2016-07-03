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

export function getEmployeeSchedule(month, year){
	return api.get('/schedules/employeemonth/?month=' + month + '&year=' + year).then(function(resp){

		store.dispatch({
			type: 'GET_EMPLOYEEMONTHLYSCHEDULE',
			employeeMonthlySchedule: resp.data
		})
		console.log('From the call', resp.data);
	})
}

export function calendar(month, year, monthdate){
	// console.log('Init', month, year);
	
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], 
		year = parseInt(year, 10), 
		daysInMonths = [31, (((year%4==0)&&(year%100!=0))||(year%400==0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], 
		boxes =[], 
		collection = [],
		x = months.indexOf(month),
		startDay = new Date(year, x, 1).getDay(),
		totalCalendarDays = 42 - daysInMonths[x] - startDay, 
		daysInPreviousMonth = 0,
		format = "";
		
		if(x === 0){
			daysInPreviousMonth = daysInMonths[11];
		} else {
			daysInPreviousMonth = daysInMonths[x - 1]
		}
	
	((startDay === 0) ? createCal(daysInMonths[x], totalCalendarDays, null, year, x) : createCal(daysInMonths[x], totalCalendarDays, startDay, year, x));

	function createCal(a, b, c, d, x){
		var addMonthZero = (x >= 1 && x <= 8) ? "0" + (x + 1) : (x === 9 ) ? x + 1 : (x >= 10) ? x + 1 : (x === 0) ? "01" : "";
		var nextMonthZero = (x >= 0 && x <= 7) ? "0" + (x + 2) : (x >= 8 && x < 11) ? x + 2 : (x === 10) ? x + 1 : (x === 11) ? "01" : "";
		var prevMonthZero = (x === 0) ? 12 : (x === 1) ? "01" : (x >= 2 && x <= 9 ) ? "0" + x : (x >= 10) ? x : "";

		for(var i = 1, n = 0; i <= a; i++, n++){
			format = d + "-" + addMonthZero + "-" + ((i < 10) ? "0" + i : i);
			boxes.push(format);
			collection[n] = {
				year: d,
				month: months[x],
				day: i,
				calendar_date: format,
				currentClass: ""
			}
			boxes.push(collection[n].calendar_date)
		}
		for(var j = 1; j <= b; j++){
			format = ((x === 11) ? d + 1 : d) + "-" + nextMonthZero + "-" + ((j < 10) ? "0" + j : j);
			boxes.push(format);
			collection.push({
				year: ((x === 11) ? d + 1 : d),
				month: ((x === 11) ? months[0] : months[x + 1]),
				day: j,
				calendar_date: format,
				currentClass: "inactiveMonth"
			})
		}
		if(c){
			for(var h = 0; h < c; h++){
				format = ((x === 0) ? d - 1 : d) + "-" + prevMonthZero + "-" + daysInPreviousMonth
				boxes.unshift(format);
				collection.unshift({
					year: ((x === 0) ? d - 1 : d),
					month: ((x === 0) ? months[11] : months[x - 1]),
					day: daysInPreviousMonth,
					calendar_date: format,
					currentClass: "inactiveMonth"
				})
				daysInPreviousMonth -= 1;
			}
		}



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

				
		})

		
	}

		// store.dispatch({
		// 	type: 'GET_CALENDARDAYS',
		// 	calendarDays: boxes
		// })
		// store.dispatch({
		// 	type: 'GET_DATEOBJECTS',
		// 	collection: collection
		// })

	// console.log('calendarDays:', collection);
	// console.log('Days in the month of ' + month, daysInMonths[x]);
}

