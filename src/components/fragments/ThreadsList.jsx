import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import ThreadCard from '../threads/ThreadCard';
import threadItemShape from '../../data/types/thread-item-shape';

export default function ThreadsList({ threads, authUserId, onToggleDownVoted, onToggleUpVoted }) {
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
        />
      ))}
    </Box>
  );
}
ThreadsList.defaultProps = {
  authUserId: null,
};
ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  authUserId: PropTypes.string,
  onToggleUpVoted: PropTypes.func.isRequired,
  onToggleDownVoted: PropTypes.func.isRequired,
};
