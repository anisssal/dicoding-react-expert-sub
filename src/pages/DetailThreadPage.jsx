import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Divider, Grid, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { postedAt } from '../utils/index';
import {
  asyncGetDetailThread,
  asyncPostCommentThread,
  asyncToggleDownVotedThreadComment,
  asyncToggleDownVotedThreadDetail,
  asyncToggleUpVotedThreadComment,
  asyncToggleUpVotedThreadDetail,
} from '../store/detail_thread/action';
import ThreadTagChip from '../components/threads/ThreadTagChip';
import UpVoteButton from '../components/action/UpVoteButton';
import DownVoteButton from '../components/action/DownVoteButton';
import NewCommentInput from '../components/fragments/NewCommentInput';
import { resetDetailThreadState } from '../store/detail_thread/detail_thread_slice';
import CommentList from '../components/comments/CommentList';
import { HOME_ROUTE } from '../utils/route-name';

function DetailThreadPage() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { thread, getDetailThreadError } = useSelector((states) => states.detailThread);
  const { authUser } = useSelector((states) => states.auth);
  useEffect(() => {
    dispatch(resetDetailThreadState());
  }, [dispatch]);

  useEffect(() => {
    if (getDetailThreadError) navigate(HOME_ROUTE);
  }, [getDetailThreadError, navigate]);

  useEffect(() => {
    dispatch(asyncGetDetailThread({ id }));
  }, [id, dispatch]);

  if (!thread) return null;

  const isUpVoted = thread?.upVotesBy.includes(authUser?.id);
  const isDownVoted = thread?.downVotesBy.includes(authUser?.id);

  function onUpvoteClick() {
    dispatch(asyncToggleUpVotedThreadDetail({ authUserId: authUser.id }));
  }

  function onDownVoteClick() {
    dispatch(asyncToggleDownVotedThreadDetail({ authUserId: authUser.id }));
  }

  function onToggleDownVotedCommentHandler(commentId, authUserId) {
    dispatch(asyncToggleDownVotedThreadComment({ commentId, authUserId }));
  }

  function onToggleUpVotedCommentHandler(commentId, authUserId) {
    dispatch(asyncToggleUpVotedThreadComment({ commentId, authUserId }));
  }

  function onNewCommentSubmitted(content) {
    dispatch(asyncPostCommentThread({ content }));
  }

  return (
    <Box>
      <Grid container>
        <Grid item sm={1} />
        <Grid item sm={7}>
          <Stack alignItems="flex-start" justifyContent="left" sx={{ height: 1, margin: 1, pt: 3 }}>
            <Button
              onClick={() => {
                navigate(HOME_ROUTE, { replace: true });
              }}
              variant="text"
            >
              <ArrowBackIcon />
            </Button>
            <Card sx={{ p: 1, width: 1, mt: 2 }}>
              <CardHeader
                avatar={<Avatar aria-label="user-avatar" src={thread.owner?.avatar} />}
                title={<Typography variant="subtitle1">{thread.owner?.name}</Typography>}
                subheader={<Typography variant="body2">{`Posted ${postedAt(thread.createdAt)}`}</Typography>}
              />
              <Divider />

              <CardContent>
                <Typography variant="h5">{thread.title}</Typography>
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
                  {parse(thread.body)}
                </Typography>
              </CardContent>
              <CardActions>
                <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                  <ThreadTagChip category={thread.category} />
                  <Stack direction="row" spacing={1.2}>
                    <UpVoteButton isUpVoted={isUpVoted} onUpvoteClick={() => onUpvoteClick()} totalVote={thread.upVotesBy.length} />
                    <DownVoteButton isDownVoted={isDownVoted} onDownVoteClick={() => onDownVoteClick()} totalVote={thread.downVotesBy.length} />
                  </Stack>
                </Stack>
              </CardActions>
            </Card>
            <Divider sx={{ my: 3 }} />
            <Card sx={{ pt: '16px', width: 1 }}>
              {thread.comments.length === 0 && (
                <Typography variant="body1" sx={{ pl: '16px', mb: 2 }}>
                  Be the first to comment!
                </Typography>
              )}
              <NewCommentInput authUser={authUser} onCommentSubmitted={(newComment) => onNewCommentSubmitted(newComment)} />

              <CardContent>
                <CommentList
                  authUserId={authUser?.id}
                  comments={thread.comments}
                  onToggleDownVoted={(commentId, authUserId) => onToggleDownVotedCommentHandler(commentId, authUserId)}
                  onToggleUpVoted={(commentId, authUserId) => onToggleUpVotedCommentHandler(commentId, authUserId)}
                />
              </CardContent>
            </Card>
          </Stack>
        </Grid>
        <Grid item sm={4} />
      </Grid>
    </Box>
  );
}

export default DetailThreadPage;
