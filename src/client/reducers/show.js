const showInitialState = {
	showCallIn: false

}

export default function(state = showInitialState, action){

	switch (action.type) {

		case 'CHANGE_SHOWCALLIN':
			return {
				showCallIn: action.showCallIn
			}

	default:
		return state;
	
	}
}