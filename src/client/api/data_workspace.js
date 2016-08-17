import api from 'api/api';
import store from 'store';
import { v4 } from 'uuid';




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

export function getTodaysSchedule(date, cb){
	let eligible = date.getTime();				// check epoch if shift has already started to determine call in options
	let month = date.getMonth() + 1;
	let year = date.getFullYear();
	let calendar_date = year + '-' + month + '-' + date.getDate();
	let time = {};

	return api.get('/schedules/employeemonth/?month=' + month + '&year=' + year).then(function(resp){
		resp.data.forEach(function(shift){
			if(calendar_date === shift.calendar_date){
				time = shift
			}

		})
		// 3rd paramater determines whether or not call in options will be displayed
		cb(time.string_rep, time.area.title, 'Scheduled Today', ((eligible < time.epoch_milliseconds) ? true : false), time.epoch_milliseconds)
	})	
}
