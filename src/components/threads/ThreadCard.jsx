import { ButtonBase, Card, CardActions, CardContent, Divider, IconButton, Stack, Typography } from '@mui/material';
import parse from 'html-react-parser';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import Link from '@mui/material/Link';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import threadItemShape from '../../data/types/thread-item-shape';
import { DETAIL_THREAD_ROUTE, LOGIN_ROUTE } from '../../utils/route-name';
import ThreadCardHeader from './ThreadCardHeader';
import ThreadTagChip from './ThreadTagChip';
import VoteButton from '../action/VoteButton';

function ThreadCard({ id, title, body, category, createdAt, user, authUserId, upVotesBy, downVotesBy, totalComments, onToggleDownVoted, onToggleUpVoted }) {
  const { authUser } = useSelector((states) => states.auth);
  const navigate = useNavigate();

  const isUpVoted = upVotesBy.includes(authUserId);
  const isDownVoted = downVotesBy.includes(authUserId);

  function checkAuth() {
    if (!authUser) {
      navigate(LOGIN_ROUTE);
      return false;
    }
    return true;
  }

  function onUpvoteClick() {
    if (checkAuth()) onToggleUpVoted(id, authUserId);
  }

  function onDownVoteClick() {
    if (checkAuth()) onToggleDownVoted(id, authUserId);
  }

  return (
    <Card sx={{ mt: 2 }}>
      <ThreadCardHeader id={id} user={user} title={title} createdAt={createdAt} />
      <Divider />
      <ButtonBase component={Link} sx={{ width: '100%', justifyContent: 'left' }} underline="none" color="inherit" href={`${DETAIL_THREAD_ROUTE}/${id}`}>
        <CardContent>
          <Typography
            variant="body2"
            component="span"
            sx={{
              WebkitLineClamp: 4,
              lineClamp: 4,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {parse(body)}
          </Typography>
        </CardContent>
      </ButtonBase>

      <CardActions>
        <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
          <ThreadTagChip category={category} />
          <Stack direction="row" spacing={1.2}>
            <VoteButton iconType="upvote" isVoted={isUpVoted} onVoteClick={() => onUpvoteClick()} totalVote={upVotesBy.length} />
            <VoteButton iconType="downvote" isVoted={isDownVoted} onVoteClick={() => onDownVoteClick()} totalVote={downVotesBy.length} />

            <Stack direction="row" alignItems="center">
              <Link component={IconButton} disableRipple href={`${DETAIL_THREAD_ROUTE}/${id}`}>
                <Icon icon="material-symbols:comment" width="20px" height="20px" sx={{ fontSize: '18px' }} />
              </Link>
              <Typography variant="subtitle" color="text.secondary">
                {totalComments}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardActions>
    </Card>
  );
}

ThreadCard.propTypes = {
  ...threadItemShape,
  onToggleUpVoted: PropTypes.func.isRequired,
  onToggleDownVoted: PropTypes.func.isRequired,
};

export default ThreadCard;
