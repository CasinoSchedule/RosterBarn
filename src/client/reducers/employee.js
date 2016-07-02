const employeeInitialState = {
	employeeMonthlySchedule: []
}

export default function(state = employeeInitialState, action){

	switch (action.type) {

		case 'GET_EMPLOYEEMONTHLYSCHEDULE':
			return {
				employeeMonthlySchedule: action.employeeMonthlySchedule
			}

	default:
		return state;

	}
}

