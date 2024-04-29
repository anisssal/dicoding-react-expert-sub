import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ThreadList from '../components/threads/ThreadList';
import { asyncPopulateUsersAndThreads } from '../store/shared/shared_action';
import {
  asyncToggleDownVotedThread,
  asyncToggleUpVotedThread,
} from '../store/threads/action';

export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const { threads } = useSelector((states) => states.threads);
  const { authUser } = useSelector((states) => states.auth);
  const { users = [] } = useSelector((states) => states);

  const threadsData = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }));


  function onToggleDownVotedHandler(id, authUserId) {
    dispatch(asyncToggleDownVotedThread({ id, authUserId }));
  }

  function onToggleUpVotedHandler(id, authUserId) {
    dispatch(asyncToggleUpVotedThread({ id, authUserId }));
  }

  return (
    <Grid container>
      <Grid item sm={0} md={3} />
      <Grid item sm={12} md={7} sx={{ px: { xs: 2, md: 0 } }}>
        <ThreadList
          authUserId={authUser?.id}
          threads={threadsData}
          onToggleDownVoted={(id, authUserId) =>
            onToggleDownVotedHandler(id, authUserId)
          }
          onToggleUpVoted={(id, authUserId) =>
            onToggleUpVotedHandler(id, authUserId)
          }
        />
      </Grid>
      <Grid item sm={3} />
    </Grid>
  );
}
