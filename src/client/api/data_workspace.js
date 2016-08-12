import api from 'api/api';
import store from 'store';
import { v4 } from 'uuid';



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
			day: startDate.addDays(i).getDate(),
			currentClass: ((i < 0 || i >= daysInMonth) ? 'inactiveMonth' : 'activeMonth')
		}
	}

	store.dispatch({
		type: 'GET_MONTHLYCALENDAR',
		monthlyCalendar: calendarDays
	})

	console.log(calendarDays);
}

export function getEmployeeMonthlySchedule(date){
	let month = date.getMonth() + 1;
	let year = date.getFullYear();
	return api.get('/schedules/employeemonth/?month=' + month + '&year=' + year).then(function(resp){
		let allShifts = resp.data.reduce(function(a, b, i){
			a['date_' + b.calendar_date] = b
			return a;
		}, {});
		store.dispatch({
			type: 'GET_EMPLOYEEMONTHLYSCHEDULE',
			employeeMonthlySchedule: allShifts
		})
		console.log('allShifts', allShifts)
	});
}

