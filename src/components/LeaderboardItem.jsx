import PropTypes from 'prop-types';
import { ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import userShape from '../data/types/user-shape';

export default function LeaderboardItem({ user, score }) {
  return (
    <ListItem secondaryAction={<Typography variant="subtitle1">{score}</Typography>}>
      <ListItemAvatar>
        <Avatar alt="User Avatar" src={user.avatar} />
      </ListItemAvatar>
      <ListItemText primary={user.name} />
    </ListItem>
  );
}

LeaderboardItem.propTypes = {
  user: PropTypes.shape(userShape).isRequired,
  score: PropTypes.number.isRequired,
};
