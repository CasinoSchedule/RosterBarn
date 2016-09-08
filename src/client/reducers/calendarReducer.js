var year = new Date().getFullYear(), month = new Date().getMonth(), day = new Date().getDate()

var calendarInitialState = {
	monthlyCalendar: [],
	message: '',
	selected: year + '-' + (month + 1) + '-' + day,
	weeklyCalendar: [],
	flexbox_size: ""	
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

		case 'GET_WEEKLYCALENDAR':
			return {
				...state,
				weeklyCalendar: action.weeklyCalendar,
			}

		case 'ALTER_FLEXBOXSIZE':
			return {
				...state,
				flexbox_size: action.flexbox_size,
			}
		case 'USER_LOGOUTS':
			return calendarInitialState

	default:
		return state;

	}
}

