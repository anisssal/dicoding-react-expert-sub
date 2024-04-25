import { Link } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import {  ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import usePathname from '../../hooks/usePathname';

export default function DrawerNavItem({ title, icon, path }) {
  const pathname = usePathname();

  const active = path === '/' ? pathname === '/' : pathname.includes(path);
  return (
    <ListItemButton
      component={Link}
      href={path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <ListItemIcon sx={{ ...(active && { color: 'primary.main' }) }}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={title} />

    </ListItemButton>
  );
}

DrawerNavItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};
