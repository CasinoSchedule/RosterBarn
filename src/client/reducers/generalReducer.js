const objectInitialState = {
	exampleKey: ""

}

export default function(state = objectInitialState, action){

	switch (action.type) {

		case 'CHANGE_EXAMPLE':
			return {
				exampleKey: action.exampleKey
			}

	default:
		return state;
	
	}
}