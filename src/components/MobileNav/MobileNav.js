import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ListIcon from '@mui/icons-material/List';
import { Link } from 'react-router-dom';

const MobileNav = () => {
	const [value, setValue] = React.useState(0);

	return (
		<Box sx={{ display: { xs: 'block', md: 'none' }, position: 'fixed', bottom: 0, left: 0, right: 0 }}>
			<BottomNavigation
				showLabels
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
			>
				<BottomNavigationAction component={Link} to={'/'} value="home" label="Home" icon={<HomeIcon />} />
				<BottomNavigationAction
					component={Link}
					to={'/search'}
					value="seach"
					label="Search"
					icon={<SearchIcon />}
				/>
				<BottomNavigationAction
					component={Link}
					to={'/playlist'}
					value="playlist"
					label="Library"
					icon={<ListIcon />}
				/>
			</BottomNavigation>
		</Box>
	);
};

export default MobileNav;
