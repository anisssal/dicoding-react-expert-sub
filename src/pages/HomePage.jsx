import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ThreadsList from '../components/fragments/ThreadsList';
import { asyncPopulateUsersAndThreads } from '../store/shared/shared_action';
import { asyncToggleDownVotedThread, asyncToggleUpVotedThread } from '../store/threads/action';
import { selectThreadsWithUser } from '../store/shared/selectors';
import ThreadCategoriesList from '../components/fragments/ThreadCategoriesList';

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const threadsData = useSelector((state) => selectThreadsWithUser(state));
  const { authUser } = useSelector((states) => states.auth);

  function onToggleDownVotedHandler(id, authUserId) {
    dispatch(asyncToggleDownVotedThread({ id, authUserId }));
  }

  function onToggleUpVotedHandler(id, authUserId) {
    dispatch(asyncToggleUpVotedThread({ id, authUserId }));
  }

  return (
    <Grid container>
      <Grid item sm={0} md={3} sx={{ pt: 4, px: 3 }}>
        <ThreadCategoriesList />
      </Grid>
      <Grid item sm={12} md={7} sx={{ px: { xs: 2, md: 0 } }}>
        <ThreadsList
          authUserId={authUser?.id}
          threads={threadsData}
          onToggleDownVoted={(id, authUserId) => onToggleDownVotedHandler(id, authUserId)}
          onToggleUpVoted={(id, authUserId) => onToggleUpVotedHandler(id, authUserId)}
        />
      </Grid>
      <Grid item sm={3} />
    </Grid>
  );
}
