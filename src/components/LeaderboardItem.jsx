import PropTypes from 'prop-types';
import { ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import userShape from '../data/types/user-shape';

/** * Component for leaderboard item on leaderboard list */
export default function LeaderboardItem({ user, score }) {
  return (
    <ListItem className="leaderboard-item" secondaryAction={<Typography variant="subtitle1">{score}</Typography>}>
      <ListItemAvatar>
        <Avatar alt="User Avatar" src={user.avatar} />
      </ListItemAvatar>
      <ListItemText primary={user.name} />
    </ListItem>
  );
}

LeaderboardItem.propTypes = {
  /**
   * User object that will represent this leaderboard item
   */
  user: PropTypes.shape(userShape).isRequired,
  /**
   * The score that will be displayed
   */
  score: PropTypes.number.isRequired,
};
