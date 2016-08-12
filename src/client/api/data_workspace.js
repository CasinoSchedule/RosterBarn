import api from 'api/api';
import store from 'store';
import { v4 } from 'uuid';


// var day = function createCalendarDays(date){
// 	let day = {
// 		this.calendar_date: 
// 	}
// }

export function createMonthlyCalendar(date){
	let month = date.getMonth();
	let year = date.getFullYear();
	let daysInMonth = new Date(year, month, 0).getDate();
	let firstDayOfMonth = new Date(year, month, 1).getDay();
	let lastDayOfMonth = new Date(year, month, daysInMonth).getDay();
	let calendarStartDay = ((firstDayOfMonth) ? -(firstDayOfMonth) : 0);
	let endDay = 5 - lastDayOfMonth;
	let totalCalendarDays = Math.abs(calendarStartDay) + daysInMonth + endDay;
	let startDate = new Date(year, month, 1);
	let calendarDays = [];
	

	for(let i = calendarStartDay, n = 0; i < totalCalendarDays; i++, n++){
		calendarDays[n] = {
			calendar_date: startDate.addDays(i).getFullYear() + "-" + (startDate.addDays(i).getMonth() + 1) + "-" + startDate.addDays(i).getDate(),
			days: startDate.addDays(i),
			currentClass: ((i < 0 || i >= daysInMonth) ? 'inactiveMonth' : 'activeMonth')
		}
	}

	console.log(calendarDays);
}

export function getEmployeeMonthlySchedule(date){
	let month = date.getMonth() + 1;
	let year = date.getFullYear();
	return api.get('/schedules/employeemonth/?month=' + month + '&year=' + year).then(function(resp){
		console.log(resp.data)
	});
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

export function calendar(month, year, monthdate, employee){
	console.log('Init', month, year, monthdate);
	
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

