import { List, Paper, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterCategory } from '../../store/threads/threads_slice';
import { selectThreadsCategory } from '../../store/threads/selectors';
import ThreadCategoryItem from '../ThreadCategoryItem';

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
            <ThreadCategoryItem key={category} category={category} selected={category === filterCategory} onClick={() => categoryClickHandler(category)} />
          ))}
        </List>
      </Paper>
    </Stack>
  );
}
