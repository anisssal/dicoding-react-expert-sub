import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import ThreadCard from './ThreadCard';
import threadItemShape from '../../data/types/thread-item-shape';

export default function ThreadList({ threads }) {
  return (
    <Box sx={{ my: 3 }}>
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
          authUser={thread.authUser}
          downVotesBy={thread.downVotesBy}
          upVotesBy={thread.upVotesBy}
        />
      ))}
    </Box>
  );
}
ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
};
