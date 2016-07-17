const cssInitialState = {
	publishButton: "noChanges"

}

export default function(state = cssInitialState, action){

	switch (action.type) {

		case 'CHANGE_PUBLISHBUTTON':
		console.log(action.publishButton);
			return {
				publishButton: action.publishButton
			}

	default:
		return state;
	
	}
}