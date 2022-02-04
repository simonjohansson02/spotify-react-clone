import * as actionTypes from './actionTypes';
import { getAccessToken } from '../../login-to-spotify';

export const fetchTokenStart = () => {
	return { type: actionTypes.AUTH_START };
};

export const fetchTokenFail = (error) => {
	return { type: actionTypes.AUTH_FAIL, payload: error };
};

export const fetchTokenSuccess = (data) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		payload: data
	};
};

export const fetchToken = (spotifyApi) => {
	return async (dispatch) => {
		dispatch(fetchTokenStart());
		try {
			const token = getAccessToken();
			await spotifyApi.setAccessToken(token);
			dispatch(fetchTokenSuccess(token));
		} catch (error) {
			dispatch(fetchTokenFail(error));
		}
	};
};

export const fetchUserStart = () => {
	return { type: actionTypes.FETCH_CURRENT_USER_START };
};

export const fetchUserFail = (error) => {
	return { type: actionTypes.FETCH_CURRENT_USER_FAIL, payload: error };
};

export const fetchUserSuccess = (data) => {
	return {
		type: actionTypes.FETCH_CURRENT_USER_SUCCESS,
		payload: data
	};
};

export const fetchUser = (spotifyApi) => {
	return async (dispatch) => {
		dispatch(fetchUserStart());
		try {
			const me = await spotifyApi.getMe();
			dispatch(fetchUserSuccess(me));
		} catch (error) {
			dispatch(fetchUserFail(error));
		}
	};
};
