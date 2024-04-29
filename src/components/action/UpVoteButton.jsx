import { IconButton, Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/route-name';

export default function UpVoteButton({ isUpVoted, onUpvoteClick, totalVote }) {
  const { authUser } = useSelector((states) => states.auth);
  const navigate = useNavigate();

  function onBtnClick() {
    if (!authUser) {
      navigate(LOGIN_ROUTE);
      return;
    }
    onUpvoteClick();
  }
  return (
    <Stack direction="row" alignItems="center">
      <IconButton disableRipple onClick={() => onBtnClick()}>
        <Icon icon={isUpVoted ? 'bxs:upvote' : 'bx:upvote'} width="20px" height="20px" />
      </IconButton>
      <Typography variant="subtitle" color="text.secondary">
        {totalVote}
      </Typography>
    </Stack>
  );
}

UpVoteButton.propTypes = {
  isUpVoted: PropTypes.bool.isRequired,
  onUpvoteClick: PropTypes.func.isRequired,
  totalVote: PropTypes.number.isRequired,
};
