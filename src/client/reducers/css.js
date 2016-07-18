const cssInitialState = {
	publishButton: "noChanges",
	shiftColor: ""

}

export default function(state = cssInitialState, action){

	switch (action.type) {

		case 'CHANGE_PUBLISHBUTTON':
			return {
				publishButton: action.publishButton,
				shiftColor: state.shiftColor
			}

		case 'CHANGE_SHIFTBOX':
		// console.log('It hits');
			return {
				publishButton: state.publishButton,
				shiftColor: action.shiftColor
			}

	default:
		return state;
	
	}
}