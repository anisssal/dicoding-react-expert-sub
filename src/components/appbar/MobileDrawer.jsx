import Toolbar from '@mui/material/Toolbar';
import { Divider, Drawer } from '@mui/material';
import PropTypes from 'prop-types';
import DrawerNavItem from './DrawerNavItem';

const drawerWidth = 240;
export default function MobileDrawer({ isOpen, onClose, pages }) {
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      {pages.map((page) => (
        <DrawerNavItem key={page.path} path={page.path} title={page.title} icon={page.icon} />
      ))}
    </div>
  );

  return (
    <nav>
      <Drawer
        open={isOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </nav>
  );
}

MobileDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  pages: PropTypes.oneOfType([PropTypes.array]).isRequired,
};
