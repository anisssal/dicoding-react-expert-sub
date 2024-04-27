import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Divider, Popover } from '@mui/material';
import PropTypes from 'prop-types';
import userShape from '../../data/types/user-shape';

export default function UserPopover({ user, onLogout }) {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>

      <Popover
        open={!!anchorElUser}
        anchorEl={anchorElUser}
        onClose={handleCloseUserMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          p: 0,
          mt: 1,
          ml: 0.75,
          width: 200,
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem onClick={() => onLogout()}>Logout</MenuItem>
      </Popover>
    </Box>
  );
}

UserPopover.propTypes = {
  user: PropTypes.shape(userShape).isRequired,
  onLogout: PropTypes.func.isRequired,
};
