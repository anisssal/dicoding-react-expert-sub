import { List, ListItemButton, ListItemIcon, ListItemText, Paper, Stack, Typography } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterCategory } from '../../store/threads/threads_slice';
import { selectThreadsCategory } from '../../store/threads/selectors';

export default function ThreadCategoriesList() {
  const categories = useSelector((states) => selectThreadsCategory(states.threads));
  const { filterCategory } = useSelector((states) => states.threads);
  const { globalLoading } = useSelector((states) => states.common);
  const dispatch = useDispatch();

  function categoryClickHandler(category) {
    dispatch(setFilterCategory(category));
  }

  if (globalLoading) {
    return null;
  }
  return (
    <Stack direction="column">
      <Typography variant="h5" sx={{ mb: 2 }}>
        Category
      </Typography>
      <Paper>
        <List component="nav" aria-label="category-list">
          {categories.map((category) => (
            <ListItemButton key={category} selected={category === filterCategory} onClick={() => categoryClickHandler(category)}>
              <ListItemIcon>
                <TagIcon />
              </ListItemIcon>
              <ListItemText primary={category} />
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </Stack>
  );
}
