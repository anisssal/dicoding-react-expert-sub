import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ThreadList from '../components/threads/ThreadList';
import { asyncPopulateUsersAndThreads } from '../store/shared/shared_action';

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

  function onCommentClickHandler() {}

  function onToggleDownVotedHandler(id, authUserId ) {

  }

  function onToggleUpVotedHandler(id, authUserId ) {

  }

  return (
    <Grid container>
      <Grid item sm={3}>
        {' '}
      </Grid>
      <Grid item sm={6}>
        <ThreadList
          authUserId={authUser?.id}
          threads={threadsData}
          onCommentsClick={() => onCommentClickHandler()}
          onToggleDownVoted={(id, authUserId ) => onToggleDownVotedHandler(id, authUserId)}
          onToggleUpVoted={(id, authUserId ) => onToggleUpVotedHandler(id, authUserId)}
        />
      </Grid>
      <Grid item sm={3} />
    </Grid>
  );
}
