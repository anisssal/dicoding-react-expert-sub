import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import usePathname from '../../hooks/usePathname';

export default function NavItem({ title, path }) {
  const pathname = usePathname();
  const active = path === '/' ? pathname === '/' : pathname.includes(path);

  return (
    <Button
      href={path}
      sx={{
        ...(active && {
          bgcolor: (theme) => alpha(theme.palette.primary.dark, 0.2),
        }),
      }}
    >
      {title}
    </Button>
  );
}

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
