const showInitialState = {
	showCallIn: false,
	showForm: false,
	showClearConfirm: false,
	showDeleteConfirm: false

}

export default function(state = showInitialState, action){

	switch (action.type) {

		case 'CHANGE_SHOWCALLIN':
			return {
				showCallIn: action.showCallIn,
				showForm: state.showForm,
				showClearConfirm: state.showClearConfirm,
				showDeleteConfirm: state.showDeleteConfirm
			}

		case 'CHANGE_SHOWFORM':
			return {
				showCallIn: state.showCallIn,
				showForm: action.showForm,
				showClearConfirm: state.showClearConfirm,
				showDeleteConfirm: state.showDeleteConfirm
			}

		case 'CHANGE_SHOWCLEARCONFIRM':
			return {
				showCallIn: state.showCallIn,
				showForm: state.showForm,
				showClearConfirm: action.showClearConfirm,
				showDeleteConfirm: state.showDeleteConfirm
			}

		case 'CHANGE_SHOWDELETECONFIRM':
			return {
				showCallIn: state.showCallIn,
				showForm: state.showForm,
				showClearConfirm: state.showClearConfirm,
				showDeleteConfirm: action.showDeleteConfirm
			}

	default:
		return state;
	
	}
}