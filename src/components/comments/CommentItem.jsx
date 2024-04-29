import { Avatar, Box, Divider, Stack, Typography } from '@mui/material';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import UpVoteButton from '../action/UpVoteButton';
import DownVoteButton from '../action/DownVoteButton';
import { postedAt } from '../../utils/index';
import commentItemShape from '../../data/types/comment-item-shape';

export default function CommentItem({ id, content, upVotesBy, downVotesBy, createdAt, owner, authUserId, onToggleUpVoted, onToggleDownVoted, isLastItem }) {
  const isUpVoted = upVotesBy.includes(authUserId);
  const isDownVoted = downVotesBy.includes(authUserId);

  function onUpvoteClick() {
    onToggleUpVoted(id, authUserId);
  }

  function onDownVoteClick() {
    onToggleDownVoted(id, authUserId);
  }

  return (
    <Stack sx={{ pl: '16px', pt: '16px' }} direction="column">
      <Stack direction="row" justifyItems="center" alignItems="center">
        <Avatar aria-label="user-avatar" src={owner?.avatar} sx={{ mr: 1 }} />
        <Typography variant="subtitle1" sx={{ mr: 0.5 }}>
          {owner.name}
        </Typography>
        <Box component="span" sx={{ display: 'inline', mr: 0.5 }}>
          &#x2022;
        </Box>
        <Typography variant="body2">{postedAt(createdAt)}</Typography>
      </Stack>
      <Typography
        variant="body2"
        component="span"
        sx={{
          mt: 2,
          mb: 1,
          WebkitLineClamp: 4,
          lineClamp: 4,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
        }}
      >
        {parse(content)}
      </Typography>
      <Stack direction="row" justifyContent="flex-end" sx={{ width: '100%', mb: 1 }}>
        <Stack direction="row" spacing={1.2}>
          <UpVoteButton isUpVoted={isUpVoted} onUpvoteClick={() => onUpvoteClick()} totalVote={upVotesBy.length} />

          <DownVoteButton isDownVoted={isDownVoted} onDownVoteClick={() => onDownVoteClick()} totalVote={downVotesBy.length} />
        </Stack>
      </Stack>
      {!isLastItem && <Divider variant="middle" />}
    </Stack>
  );
}
CommentItem.propTypes = {
  ...commentItemShape,
  authUserId: PropTypes.string.isRequired,
  onToggleUpVoted: PropTypes.func.isRequired,
  onToggleDownVoted: PropTypes.func.isRequired,
  isLastItem: PropTypes.bool.isRequired,
};
