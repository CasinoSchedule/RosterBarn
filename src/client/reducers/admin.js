const adminInitialState = {
	employeeWeeklySchedule: []
}

export default function(state = adminInitialState, action){

	switch (action.type) {

		case 'GET_EMPLOYEEWEEKLYSCHEDULE':
			console.log(action.employeeWeeklySchedule);
			return {
				employeeWeeklySchedule: action.employeeWeeklySchedule
			}
	default:
		return state;

	}
}

