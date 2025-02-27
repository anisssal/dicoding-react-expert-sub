import PropTypes from 'prop-types';
import { Paper } from '@mui/material';
import leaderboardShape from '../../data/types/leaderboard-shape';
import LeaderboardItem from '../LeaderboardItem';

export default function LeaderboardsList({ leaderboards }) {
  return (
    <Paper sx={{ my: 2, py: 1 }}>
      {leaderboards.map((leaderboard) => (
        <LeaderboardItem key={leaderboard.user.id} user={leaderboard.user} score={leaderboard.score} />
      ))}
    </Paper>
  );
}

LeaderboardsList.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.shape(leaderboardShape)).isRequired,
};
