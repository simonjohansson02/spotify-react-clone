import { NavLink } from 'react-router-dom';
import { ListItemIcon, ListItem, ListItemButton, ListItemText } from '@mui/material';

function SideNavOption({ name, Icon, to }) {
	return (
		<ListItem disablePadding>
			<ListItemButton
				component={NavLink}
				to={to}
				isActive={(match) => !!match && match.isExact}
				activeStyle={{
					color: '#1db954'
				}}
			>
				{Icon && (
					<ListItemIcon>
						<Icon sx={{ color: 'white' }} />
					</ListItemIcon>
				)}
				<ListItemText primary={name} sx={{ color: 'inherit' }} />
			</ListItemButton>
		</ListItem>
	);
}

export default SideNavOption;
