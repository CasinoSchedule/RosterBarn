const cssInitialState = {
	publishButton: "noChanges",
	shiftColor: "",
	shiftNum: 0

}

export default function(state = cssInitialState, action){

	switch (action.type) {

		case 'CHANGE_PUBLISHBUTTON':
			return {
				...state,
				publishButton: action.publishButton
			}

		case 'CHANGE_SHIFTBOX':
		// console.log('It hits');
			return {
				...state,
				shiftColor: action.shiftColor,
				shiftNum: action.shiftNum
			}

	default:
		return state;
	
	}
}