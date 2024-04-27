import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import ForumIcon from '@mui/icons-material/Forum';
import PropTypes from 'prop-types';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import HomeIcon from '@mui/icons-material/Home';
import MobileDrawer from './MobileDrawer';
import userShape from '../../data/types/user-shape';
import NavItem from './NavItem';
import { grey, primary } from '../../themes/palette';
import { HOME_ROUTE, LEADERBOARDS_ROUTE } from '../../utils/route-name';
import AppBarAction from './AppBarAction';

const navPages = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    path: HOME_ROUTE,
  },
  {
    title: 'Leaderboard',
    icon: <LeaderboardIcon />,
    path: LEADERBOARDS_ROUTE,
  },
];

function MyAppBar({ user, onSignOut }) {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  const handleMobileNavOpen = () => {
    setMobileNavOpen(true);
  };
  const handleCloseMobileNav = () => {
    setMobileNavOpen(false);
  };

  const title = 'REACT DISCUSSION';
  const displayOnlyShowOnMobile = { xs: 'flex', sm: 'none' };
  const displayHideOnMobile = { xs: 'none', sm: 'flex' };
  return (
    <AppBar sx={{ bgcolor: 'grey.200', color: 'text' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: displayOnlyShowOnMobile }}>
            <IconButton
              size="medium"
              onClick={handleMobileNavOpen}
              color={grey[900]}
            >
              <MenuIcon />
            </IconButton>
            <MobileDrawer
              isOpen={mobileNavOpen}
              onClose={handleCloseMobileNav}
              pages={navPages}
            />
          </Box>
          <ForumIcon
            sx={{
              color: primary.dark,
              mr: 1,
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontWeight: 600,
              color: 'grey.900',
              flexGrow: 1,
              textDecoration: 'none',
            }}
          >
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1, display: displayHideOnMobile }}>
            {navPages.map((page) => (
              <NavItem key={page.path} title={page.title} path={page.path} />
            ))}
          </Box>

          <AppBarAction onSignOut={onSignOut} user={user} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MyAppBar;

MyAppBar.defaultProps = {
  user: null,
};
MyAppBar.propTypes = {
  user: PropTypes.shape(userShape),
  onSignOut: PropTypes.func.isRequired,
};
