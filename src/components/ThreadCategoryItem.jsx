import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { red } from '@mui/material/colors';

/** * Component for showing category item inside category filter on home page */
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
  /**
   * String category name that will be displayed
   */
  category: PropTypes.string.isRequired,
  /**
   * condition whether the category has been selected as a filter
   */
  selected: PropTypes.bool.isRequired,
  /**
   * on item click handler
   */
  onClick: PropTypes.func.isRequired,
};
