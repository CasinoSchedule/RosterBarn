const messageInitialState = {
	message: ""
}

export default function(state = messageInitialState, action){

	switch (action.type) {

		case 'GET_MESSAGE':
			return {
				message: action.message
			}
	
	default:
		return state;

	}
}