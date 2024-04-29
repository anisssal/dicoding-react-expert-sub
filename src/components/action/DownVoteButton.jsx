import { IconButton, Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/route-name';

export default function DownVoteButton({ isDownVoted, onDownVoteClick, totalVote }) {
  const { authUser } = useSelector((states) => states.auth);
  const navigate = useNavigate();

  function onBtnClick() {
    if (!authUser) {
      navigate(LOGIN_ROUTE);
      return;
    }
    onDownVoteClick();
  }
  return (
    <Stack direction="row" alignItems="center">
      <IconButton disableRipple onClick={() => onBtnClick()}>
        <Icon icon={isDownVoted ? 'bxs:downvote' : 'bx:downvote'} width="20px" height="20px"  />
      </IconButton>
      <Typography variant="subtitle" color="text.secondary">
        {totalVote}
      </Typography>
    </Stack>
  );
}


DownVoteButton.propTypes = {
  isDownVoted: PropTypes.bool.isRequired,
  onDownVoteClick: PropTypes.func.isRequired,
  totalVote: PropTypes.number.isRequired,
};
