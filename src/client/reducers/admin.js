const adminInitialState = {
	employeeWeeklySchedule: [],
	areas: [],
	shiftStrings: [],
	weekShifts: [],
	employees: []
}

export default function(state = adminInitialState, action){

	switch (action.type) {

		case 'GET_EMPLOYEEWEEKLYSCHEDULE':
			return {
				...state,
				employeeWeeklySchedule: action.employeeWeeklySchedule
			}

		case 'GET_AREAS':
			return {
				...state,
				areas: action.areas
			}

		case 'GET_SHIFTSTRINGS':
			return {
				...state,
				shiftStrings: action.shiftStrings
			}

		case 'GET_WEEKSHIFTS':
			return {
				...state,
				weekShifts: action.weekShifts
			}

		case 'GET_EMPLOYEES':
			return {
				...state,
				employees: action.employees
			}
		
		case 'USER_LOGOUT':
			return adminInitialState
			

	default:
		return state;

	}
}

