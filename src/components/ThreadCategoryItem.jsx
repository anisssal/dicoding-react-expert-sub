import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { red } from '@mui/material/colors';

export default function ThreadCategoryItem({ category, selected, onClick }) {
  return (
    <ListItemButton key={category} selected={selected} onClick={!selected ? onClick : null}>
      <ListItemIcon>
        <TagIcon />
      </ListItemIcon>
      <ListItemText primary={category} />
      {selected && <CloseIcon style={{ color: red[500] }} onClick={onClick} />}
    </ListItemButton>
  );
}
ThreadCategoryItem.propTypes = {
  category: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
