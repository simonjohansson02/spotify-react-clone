import * as actionTypes from '../actions/actionTypes';

const initialState = {
	loading: false,
	error: null,
	device_id: null,
	playing: false,
	title: null,
	image: null,
	artist: null,
	duration: null,
	progress: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_DEVICE_ID:
			return {
				...state,
				device_id: action.payload
			};
		case actionTypes.PLAY:
			return {
				...state,
				playing: true
			};
		case actionTypes.PAUSE:
			return {
				...state,
				playing: false
			};
		case actionTypes.SET_PROGRESS:
			return {
				...state,
				progress: action.payload
			};
		// API calls
		case actionTypes.UPDATE_PLAYER_START:
			return {
				...state,
				error: null,
				loading: true
			};
		case actionTypes.UPDATE_PLAYER_SUCCESS:
			return {
				...state,
				error: null,
				loading: false,
				...action.payload
			};
		case actionTypes.UPDATE_PLAYER_FAIL:
			return {
				...state,
				error: action.payload,
				loading: false
			};
		default:
			return state;
	}
};

export default reducer;
