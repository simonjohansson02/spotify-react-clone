import { Box, Stack, Slider } from '@mui/material';
import { VolumeDown, VolumeUp, VolumeOff } from '@mui/icons-material';
import { useState, useMemo, useEffect } from 'react';
import debounce from 'lodash.debounce';

const VolumeController = ({ spotifyApi }) => {
	const defaultVolume = 40;
	const [volume, setVolume] = useState(defaultVolume);

	const apiCall = (v) => {
		spotifyApi.setVolume(v);
	};

	const debouncedApiCall = (v) => {
		return debounce(apiCall, 1000, {
			leading: false,
			trailing: true
		});
	};

	const handleVolumeChange = (e, v) => {
		setVolume(v);
		changeVolume(v);
	};

	const changeVolume = useMemo(debouncedApiCall, []);

	useEffect(() => {
		// spotifyApi.setVolume(defaultVolume);
		return () => {
			changeVolume.cancel();
		};
	}, []);

	return (
		<Box sx={{ width: 200 }}>
			<Stack spacing={2} direction="row" alignItems="center">
				{volume === 0 ? <VolumeOff /> : <VolumeDown />}
				<Slider min={0} max={100} step={1} aria-label="Volume" value={volume} onChange={handleVolumeChange} />
				<VolumeUp />
			</Stack>
		</Box>
	);
};

export default VolumeController;
