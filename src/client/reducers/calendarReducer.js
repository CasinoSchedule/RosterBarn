const calendarInitialState = {
	year: new Date().getFullYear(),
	month: new Date().getMonth(),
	calendarDays: [],
	collection: [],
	weeklyCalendar: [],
	flexbox_size: ""
}

export default function(state = calendarInitialState, action){

	switch (action.type) {

		case 'GET_CALENDAR':
			return {
				year: action.year,
				month: action.month,
				calendarDays: state.calendarDays,
				collection: state.collection,
				weeklyCalendar: state.weeklyCalendar,
				flexbox_size: state.flexbox_size
			}

		case 'GET_CALENDARDAYS':
			return {
				year: state.year,
				month: state.month,
				calendarDays: action.calendarDays,
				collection: state.collection,
				weeklyCalendar: state.weeklyCalendar,
				flexbox_size: state.flexbox_size
			}

		case 'GET_DATEOBJECTS':
			return {
				year: state.year,
				month: state.month,
				calendarDays: state.calendarDays,
				collection: action.collection,
				weeklyCalendar: state.weeklyCalendar,
				flexbox_size: state.flexbox_size
			}

		case 'GET_WEEKLYCALENDAR':
		// console.log('Gets to reducer');
			return {
				year: state.year,
				month: state.month,
				calendarDays: state.calendarDays,
				collection: state.collection,
				weeklyCalendar: action.weeklyCalendar,
				flexbox_size: state.flexbox_size
			}

		case 'ALTER_FLEXBOXSIZE':
			return {
				year: state.year,
				month: state.month,
				calendarDays: state.calendarDays,
				collection: state.collection,
				weeklyCalendar: state.weeklyCalendar,
				flexbox_size: action.flexbox_size
			}

	default:
		return state;

	}
}

