const 	year = new Date().getFullYear(),
		month = new Date().getMonth() + 1,
		months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		daysInMonths = [31, (((year%4==0)&&(year%100!=0))||(year%400==0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		

const calendarInitialState = {
	year: new Date().getFullYear(),
	month: new Date().getMonth(),
	calendarDays: [],
	collection: []
}

export default function(state = calendarInitialState, action){

	switch (action.type) {

		case 'GET_CALENDAR':
			return {
				year: action.year,
				month: action.month,
				calendarDays: state.calendarDays,
				collection: state.collection
			}

		case 'GET_CALENDARDAYS':
			return {
				year: state.year,
				month: state.month,
				calendarDays: action.calendarDays,
				collection: state.collection
			}

		case 'GET_DATEOBJECTS':
			return {
				year: state.year,
				month: state.month,
				calendarDays: state.calendarDays,
				collection: action.collection
			}

	default:
		return state;

	}
}

