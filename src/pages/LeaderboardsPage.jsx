import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import LeaderboardsList from '../components/fragments/LeaderboardsList';
import { asyncPopulateLeaderboard } from '../store/users/action';

export default function LeaderboardsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateLeaderboard());
  }, [dispatch]);

  const { leaderboards } = useSelector((states) => states.users);
  const { globalLoading } = useSelector((states) => states.common);

  if (globalLoading) return null;
  return (
    <Grid container>
      <Grid item sm={0} md={3} />
      <Grid item sm={12} md={7} sx={{ my: 4 }}>
        <Typography variant="h4">Leaderboards Active Users</Typography>
        <LeaderboardsList leaderboards={leaderboards} />
      </Grid>
    </Grid>
  );
}
