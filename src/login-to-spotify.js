// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#
const authEndpoint = 'https://accounts.spotify.com/authorize';
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = '19a259550a4f4f6eac1ba512eb8cd49d';
const liveUri = 'https://spotify-react-clone-sj.vercel.app/';
const devUri = 'http://localhost:3000/';
const redirectUrl = liveUri;
const scopes = [
	'user-read-currently-playing',
	'user-read-recently-played',
	'user-read-playback-state',
	'user-top-read',
	'user-modify-playback-state',
	'streaming'
];

export const getAccessToken = () => {
	const params = new URLSearchParams(window.location.hash.replace('#', '?'));
	return params.get('access_token');
};

export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join(
	'%20'
)}&response_type=token&show_dialog=true`;
