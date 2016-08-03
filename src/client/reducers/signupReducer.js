const InitialState = {
	
	errorMessage:''	

}

export default function(state = InitialState, action){

	switch (action.type) {

		case 'HANDLE_ERROR':
			console.log(action.errorMessage)
			return {
				...state,
				errorMessage: action.errorMessage
			}

	default:
		return state;
	
	}
}