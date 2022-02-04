import { Typography, Grid, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import TableOfSongs from '../TableOfSongs/TableOfSongs';

const Playlist = ({ spotifyApi, loading }) => {
	const { playlistId } = useParams();
	const [playlistInfo, setPlaylistInfo] = useState();
	const [songs, setSongs] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const playlistDetails = await spotifyApi.getPlaylist(playlistId);
			setPlaylistInfo({
				image: playlistDetails.body.images[0].url,
				name: playlistDetails.body.name
			});

			const allSongs = await spotifyApi.getPlaylistTracks(playlistId);
			const formattedSongs = formatSongData(allSongs.body.items);
			setSongs(formattedSongs);
		};
		getData();
	}, [playlistId]);

	const formatSongData = (songsInPlaylist) => {
		return songsInPlaylist.map((song, i) => {
			const { track } = song;
			track.contextUri = `spotify:playlist:${playlistId}`;
			track.position = i;
			return { track };
		});
	};

	return (
		<Box
			sx={{
				bgcolor: 'background.paper',
				padding: '30px',
				paddingLeft: { md: '300px', sm: '30px' },
				minHeight: '100vh'
			}}
		>
			{/* Hero */}
			<Grid container spacing={2} mb={6}>
				<Grid item xs={12} lg={2}>
					<img
						src={playlistInfo ? playlistInfo.image : ''}
						style={{ width: '100%' }}
						alt={playlistInfo ? playlistInfo.name : 'Spotify'}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					lg={10}
					sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
				>
					<Typography variant="subtitle1" sx={{ color: 'text.primary', mb: 2 }}>
						Playlist
					</Typography>
					<Typography variant="h1" sx={{ color: 'text.primary' }}>
						{playlistInfo ? playlistInfo.name : ''}
					</Typography>
				</Grid>
			</Grid>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<TableOfSongs loading={loading} spotifyApi={spotifyApi} playlistId={playlistId} songs={songs} />
				</Grid>
			</Grid>
		</Box>
	);
};

const mapState = (state) => {
	return {
		loading: state.playlist.loading
	};
};

export default connect(mapState)(Playlist);
