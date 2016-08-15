var year = new Date().getFullYear(), month = new Date().getMonth(), day = new Date().getDate()

var calendarInitialState = {
	// year: year,
	// month: month,
	// calendarDays: [],
	// collection: [],
	// weeklyCalendar: [],
	// flexbox_size: "",
	// working_today: {},
	monthlyCalendar: [],
	message: '',
	selected: year + '-' + (month + 1) + '-' + day
}

export default function(state = calendarInitialState, action){

	switch (action.type) {

		

		case 'GET_MONTHLYCALENDAR':
			return {
				...state,
				monthlyCalendar: action.monthlyCalendar
			}

		case 'CHANGE_MESSAGE':
			return {
				...state,
				message: action.message
			}

		case 'SELECTED':
			return {
				...state,
				selected: action.selected
			}

		case 'GET_CALENDAR':
			return {
				year: action.year,
				month: action.month,
				calendarDays: state.calendarDays,
				collection: state.collection,
				weeklyCalendar: state.weeklyCalendar,
				flexbox_size: state.flexbox_size,
				working_today: state.working_today
			}

		case 'GET_CALENDARDAYS':
			return {
				year: state.year,
				month: state.month,
				calendarDays: action.calendarDays,
				collection: state.collection,
				weeklyCalendar: state.weeklyCalendar,
				flexbox_size: state.flexbox_size,
				working_today: state.working_today
			}

		case 'GET_DATEOBJECTS':
			return {
				year: state.year,
				month: state.month,
				calendarDays: state.calendarDays,
				collection: action.collection,
				weeklyCalendar: state.weeklyCalendar,
				flexbox_size: state.flexbox_size,
				working_today: action.working_today
			}

		case 'GET_WEEKLYCALENDAR':
		// console.log('Gets to reducer');
			return {
				year: state.year,
				month: state.month,
				calendarDays: state.calendarDays,
				collection: state.collection,
				weeklyCalendar: action.weeklyCalendar,
				flexbox_size: state.flexbox_size,
				working_today: state.working_today
			}

		case 'ALTER_FLEXBOXSIZE':
			return {
				year: state.year,
				month: state.month,
				calendarDays: state.calendarDays,
				collection: state.collection,
				weeklyCalendar: state.weeklyCalendar,
				flexbox_size: action.flexbox_size,
				working_today: state.working_today
			}
		case 'USER_LOGOUTS':
			return calendarInitialState

	default:
		return state;

	}
}

