import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const backgrounds = {
	base: '#121212',
	highlight: '#1a1a1a',
	press: '#000',
	elevatedBase: '#242424',
	elevatedHighlight: '#2a2a2a',
	elevatedPress: '#000',
	tintedBase: 'hsla(0,0%,100%,0.07)',
	tintedHighlight: 'hsla(0,0%,100%,0.1)',
	tintedPress: 'hsla(0,0%,100%,0.04)',
	unsafeForSmallTextBase: '#121212',
	unsafeForSmallTextHighlight: ' #121212',
	unsafeForSmallTextPress: '#121212'
};

const text = {
	base: '#fff',
	secondary: '#b3b3b3',
	subdued: '#a7a7a7',
	brightAccent: '#1ed760',
	negative: '#f15e6c',
	warning: '#ffa42b',
	positive: '#1ed760',
	announcement: '#3d91f4'
};

const mainTheme = createTheme({
	palette: {
		background: {
			paper: backgrounds.base,
			default: '#fff'
		},

		text: {
			primary: text.base,
			secondary: text.secondary
		},

		primary: {
			main: '#1db954',
			light: '#1ed760',
			dark: '#3B5249',
			contrastText: '#fff'
		}
	},
	typography: {
		fontFamily: [
			'Roboto',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(',')
	}
});

export default responsiveFontSizes(mainTheme);
