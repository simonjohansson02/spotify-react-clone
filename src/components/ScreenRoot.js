import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { ROUTES } from '../routes/routes';
import SideNav from './SideNav/SideNav';
import MobileNav from './MobileNav/MobileNav';
import Player from './Player/Player';
import Login from './Login/Login';
import { fetchUser, fetchPlaylist, addDevice } from '../reduxStore/actions/index';

const setupSpotifyConnect = (token, addDevice, spotifyApi) => {
	const player = new window.Spotify.Player({
		name: 'Web Playback SDK Quick Start Player',
		getOAuthToken: (cb) => {
			cb(token);
		},
		volume: 0.5
	});

	// Ready
	player.addListener('ready', ({ device_id }) => {
		addDevice(device_id);
		spotifyApi.transferMyPlayback([device_id]);
	});

	// Not Ready
	player.addListener('not_ready', ({ device_id }) => {
		console.log('Device ID has gone offline', device_id);
	});

	player.addListener('initialization_error', ({ message }) => {
		console.error(message);
	});

	player.addListener('authentication_error', ({ message }) => {
		console.error(message);
	});

	player.addListener('account_error', ({ message }) => {
		console.error(message);
	});

	player.connect();
};

const ScreenRoot = ({ spotifyApi, token, fetchUser, fetchPlaylist, addDevice }) => {
	useEffect(() => {
		const getData = async () => {
			fetchUser(spotifyApi);
			fetchPlaylist(spotifyApi);
		};
		if (token) {
			window.onSpotifyWebPlaybackSDKReady = () => {
				setupSpotifyConnect(token, addDevice, spotifyApi);
			};
			getData();
		}
	}, [token, fetchUser]);

	const LogedIn = () => (
		<Router>
			<Box sx={{ paddingBottom: { xs: '146px', md: '90px' } }}>
				<Switch>
					{ROUTES.map((route, i) => (
						<Route
							key={i}
							path={route.path}
							exact={route.exact}
							render={(props) => <route.component spotifyApi={spotifyApi} {...props} />}
						/>
					))}
				</Switch>
				<SideNav />
			</Box>
			<Player spotifyApi={spotifyApi} />
			<MobileNav />
		</Router>
	);

	return token ? <LogedIn /> : <Login />;
};

const mapDispatch = (dispatch) => {
	return {
		fetchUser: (data) => dispatch(fetchUser(data)),
		fetchPlaylist: (data) => dispatch(fetchPlaylist(data)),
		addDevice: (device_id) => dispatch(addDevice(device_id))
	};
};

const mapState = (state) => {
	return {
		token: state.auth.token
	};
};

export default connect(mapState, mapDispatch)(ScreenRoot);
