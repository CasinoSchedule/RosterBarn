const adminInitialState = {
	employeeWeeklySchedule: [],
	areas: [],
	shiftStrings: []
}

export default function(state = adminInitialState, action){

	switch (action.type) {

		case 'GET_EMPLOYEEWEEKLYSCHEDULE':
			return {
				...state,
				employeeWeeklySchedule: action.employeeWeeklySchedule
			}

		case 'USER_LOGOUT':
		console.log('Admin reducer', adminInitialState);
		return adminInitialState

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
	
	default:
		return state;

	}
}

