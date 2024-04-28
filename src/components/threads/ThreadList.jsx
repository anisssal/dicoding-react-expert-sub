import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import ThreadCard from './ThreadCard';
import threadItemShape from '../../data/types/thread-item-shape';

export default function ThreadList({
  threads,
  authUserId,
  onToggleDownVoted,
  onToggleUpVoted,
  onCommentsClick,
}) {
  return (
    <Box sx={{ my: { xs: 1, md: 3 } }}>
      {threads.map((thread) => (
        <ThreadCard
          key={thread.id}
          id={thread.id}
          createdAt={thread.createdAt}
          body={thread.body}
          user={thread.user}
          category={thread.category}
          title={thread.title}
          totalComments={thread.totalComments}
          authUserId={authUserId}
          downVotesBy={thread.downVotesBy}
          upVotesBy={thread.upVotesBy}
          onToggleUpVoted={onToggleUpVoted}
          onToggleDownVoted={onToggleDownVoted}
          onCommentsClick={onCommentsClick}
        />
      ))}
    </Box>
  );
}
ThreadList.defaultProps = {
  authUserId: null,
};
ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  authUserId: PropTypes.string,
  onToggleUpVoted: PropTypes.func.isRequired,
  onToggleDownVoted: PropTypes.func.isRequired,
  onCommentsClick: PropTypes.func.isRequired,
};
