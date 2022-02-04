import './App.css';
import ScreenRoot from '../ScreenRoot';

function App({ spotifyApi }) {
	return (
		<div className="App">
			<ScreenRoot spotifyApi={spotifyApi} />
		</div>
	);
}

export default App;
