import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import * as actions from './actions/index';
import authReducer from './reducers/authReducer';
import playlistReducer from './reducers/playlistReducer';
import playerReducer from './reducers/playerReducer';

import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({ auth: authReducer, playlist: playlistReducer, player: playerReducer });

const configureStore = (spotifyApi) => {
	const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

	// Fetch the token
	store.dispatch(actions.fetchToken(spotifyApi));

	return store;
};

export default configureStore;
