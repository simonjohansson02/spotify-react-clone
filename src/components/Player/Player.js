import { useEffect } from 'react';
import { Box, Grid, Typography, Avatar, Stack, Slider, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { connect } from 'react-redux';
import { pause, updateSongInfoStart, playNewSong, setProgress } from '../../reduxStore/actions/index';
import VolumeController from '../VolumeController/VolumeController';
import SongProgress from '../SongProgress/SongProgress';

const Player = ({
	spotifyApi,
	deviceId,
	pause,
	playing,
	updateSongInfoStart,
	title,
	image,
	artist,
	duration,
	progress,
	loading,
	playNewSong,
	setProgress
}) => {
	useEffect(() => {
		updateSongInfoStart(spotifyApi);
	}, []);

	const togglePlay = async () => {
		if (loading) return;

		if (!playing) {
			try {
				await spotifyApi.transferMyPlayback([deviceId]);
				playNewSong(spotifyApi);
			} catch (e) {
				console.error(e);
			}
		} else {
			pause();
			await spotifyApi.pause();
		}
	};

	const handeOnSkipPrev = async () => {
		if (loading) return;
		await spotifyApi.skipToPrevious();
		playNewSong(spotifyApi);
	};

	const handleOnSkipNext = async () => {
		if (loading) return;
		await spotifyApi.skipToNext();
		playNewSong(spotifyApi);
	};

	return (
		<Box
			p={1}
			sx={{
				bgcolor: 'background.paper',
				height: 90,
				width: '100%',
				position: 'fixed',
				bottom: { xs: 56, md: 0 },
				left: 0,
				right: 0,
				boxSizing: 'border-box'
			}}
		>
			<Grid container spacing={2}>
				<Grid item xs={4} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
					<Stack direction="row" spacing={4}>
						<Avatar
							alt={title}
							src={image ? image.url : ''}
							variant="square"
							sx={{ width: 56, height: 56, display: { xs: 'none', md: 'block' } }}
						/>
						<Box>
							<Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
								{title}
							</Typography>
							<Typography variant="caption" sx={{ color: 'text.secondary' }}>
								{artist}
							</Typography>
						</Box>
					</Stack>
				</Grid>
				<Grid item xs={8} md={6}>
					<Stack spacing={0} direction="column" alignItems="center">
						<Stack spacing={2} direction="row" alignItems="center">
							<IconButton size="small" sx={{ color: 'white' }} onClick={handeOnSkipPrev}>
								<SkipPreviousIcon />
							</IconButton>
							<IconButton size="small" sx={{ color: 'white' }} onClick={togglePlay}>
								{playing ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
							</IconButton>
							<IconButton size="small" sx={{ color: 'white' }} onClick={handleOnSkipNext}>
								<SkipNextIcon />
							</IconButton>
						</Stack>
						<SongProgress spotifyApi={spotifyApi} />
					</Stack>
				</Grid>
				<Grid
					item
					xs={0}
					md={3}
					sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'end', alignItems: 'center' }}
				>
					<VolumeController spotifyApi={spotifyApi} />
				</Grid>
			</Grid>
		</Box>
	);
};

const mapState = (state) => {
	const { title, image, artist, duration, progress, device_id, playing, loading } = state.player;
	return {
		deviceId: device_id,
		playing,
		title,
		image,
		artist,
		duration,
		progress,
		loading
	};
};

const mapDispatch = (dispatch) => {
	return {
		pause: () => dispatch(pause()),
		updateSongInfoStart: (api) => dispatch(updateSongInfoStart(api)),
		playNewSong: (api) => dispatch(playNewSong(api)),
		setProgress: (progress) => dispatch(setProgress(progress))
	};
};

export default connect(mapState, mapDispatch)(Player);
