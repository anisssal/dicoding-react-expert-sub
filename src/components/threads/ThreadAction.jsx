import { IconButton, Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';

export default function ThreadAction({
  id,
  authUserId,
  votedBy,
  downVotedBy,
  totalComments,
  onToggleUpVoted,
  onToggleDownVoted,
  onCommentsClick,
}) {
  const isUpVoted = votedBy.includes(authUserId);
  const isDownVoted = downVotedBy.includes(authUserId);


  function onUpvoteClick(){
    onToggleUpVoted(id, authUserId)
  }
  function onDownVoteClick(){
    onToggleDownVoted(id, authUserId)
  }
  return (
    <Stack direction="row" spacing={1.8}>
      <Stack direction="row"   alignItems="center">
        <IconButton disableRipple onClick={()=>onUpvoteClick()}>
          <Icon
            icon={isUpVoted ? 'bxs:upvote' : 'bx:upvote'}
            width="20px"
            height="20px"
            sx={{ fontSize: '18px' }}
          />
        </IconButton>
        <Typography  variant="subtitle" color="text.secondary">
          {votedBy.length}
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center">
        <IconButton disableRipple onClick={()=>onDownVoteClick()}>
          <Icon
              icon={isDownVoted ? 'bxs:downvote' : 'bx:downvote'}
              width="20px"
              height="20px"
              sx={{ fontSize: '18px' }}
          />
        </IconButton>
        <Typography  variant="subtitle" color="text.secondary">
          {downVotedBy.length}
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center">
        <IconButton disableRipple onClick={onCommentsClick}>
          <Icon
              icon="material-symbols:comment"
              width="20px"
              height="20px"
              sx={{ fontSize: '18px' }}
          />
        </IconButton>
        <Typography  variant="subtitle" color="text.secondary">
          {totalComments}
        </Typography>
      </Stack>



    </Stack>
  );
}
ThreadAction.defaultProps = {
  authUserId: null,
};

ThreadAction.propTypes = {
  id: PropTypes.string.isRequired,
  authUserId: PropTypes.string,
  votedBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotedBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  onToggleUpVoted: PropTypes.func.isRequired,
  onToggleDownVoted: PropTypes.func.isRequired,
  onCommentsClick: PropTypes.func.isRequired,
};
