import PropTypes from 'prop-types';
import { Stack, Typography } from '@mui/material';
import CommentItem from './CommentItem';
import commentItemShape from '../../data/types/comment-item-shape';

export default function CommentList({ comments, authUserId, onToggleDownVoted, onToggleUpVoted }) {
  return (
    <Stack direction="column" sx={{ pt: 1 }}>
      <Typography variant="h6" sx={{ ml: 1, mb: 0.5 }}>
        {`${comments.length} Comment${comments.length > 1 ? 's' : ''}`}{' '}
      </Typography>
      {comments.map((comment, index) => (
        <CommentItem
          key={comment.id}
          id={comment.id}
          owner={comment.owner}
          createdAt={comment.createdAt}
          content={comment.content}
          authUserId={authUserId}
          downVotesBy={comment.downVotesBy}
          upVotesBy={comment.upVotesBy}
          onToggleUpVoted={onToggleUpVoted}
          onToggleDownVoted={onToggleDownVoted}
          isLastItem={index === comments.length - 1}
        />
      ))}
    </Stack>
  );
}
CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
  authUserId: PropTypes.string.isRequired,
  onToggleUpVoted: PropTypes.func.isRequired,
  onToggleDownVoted: PropTypes.func.isRequired,
};
