import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import { ThemeProvider } from '@mui/system';
import mainTheme from './style/material-themes';
import configureStore from './reduxStore/configureStore';
import { Provider } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-node';
const spotifyApi = new SpotifyWebApi();
const store = configureStore(spotifyApi);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={mainTheme}>
				<App spotifyApi={spotifyApi} />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
