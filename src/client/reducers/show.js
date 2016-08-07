const showInitialState = {
	showCallIn: false,
	showForm: false,
	showClearConfirm: false,
	showDeleteConfirm: false,
	showSettings: false

}

export default function(state = showInitialState, action){

	switch (action.type) {

		case 'CHANGE_SHOWCALLIN':
			return {
				...state,
				showCallIn: action.showCallIn
			}

		case 'CHANGE_SHOWFORM':
			return {
				...state,
				showForm: action.showForm
			}

		case 'CHANGE_SHOWCLEARCONFIRM':
			return {
				...state,
				showClearConfirm: action.showClearConfirm
			}

		case 'CHANGE_SHOWDELETECONFIRM':
			return {
				...state,
				showDeleteConfirm: action.showDeleteConfirm
			}

		case 'SHOW_SETTINGS':
			return {
				...state,
				showSettings: action.showSettings
			}

	default:
		return state;
	
	}
}