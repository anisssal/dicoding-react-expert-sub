import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { postedAt } from '../utils/index';
import {
  asyncGetDetailThread,
  asyncPostCommentThread,
  asyncToggleDownVotedThreadDetail,
  asyncToggleUpVotedThreadDetail,
} from '../store/detail_thread/action';
import ThreadTag from '../components/threads/ThreadTag';
import UpVoteButton from '../components/threads/action/UpVoteButton';
import DownVoteButton from '../components/threads/action/DownVoteButton';
import NewCommentInput from '../components/input/NewCommentInput';
import { resetDetailThreadState } from '../store/detail_thread/detail_thread_slice';
import CommentList from '../components/comments/CommentList';
import { HOME_ROUTE } from '../utils/route-name';

const inputCommentId = 'input-comment';

function DetailThreadPage() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    thread,
    getDetailThreadError,
    postCommentSuccess,
    postCommentLoading,
  } = useSelector((states) => states.detailThread);
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

  useEffect(() => {
    if (postCommentSuccess) {
      const inputEl = document.getElementById(inputCommentId);
      inputEl.innerHTML = '';
    }
  }, [postCommentSuccess]);

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
    // dispatch(asyncTogg)
  }

  function onToggleUpVotedCommentHandler(commentId, authUserId) {
    // dispatch()
  }

  function onNewCommentSubmitted(content) {
    dispatch(asyncPostCommentThread({ content }));
  }

  return (
    <Box>
      <Grid container>
        <Grid item sm={1} />
        <Grid item sm={7}>
          <Stack
            alignItems="left"
            justifyContent="left"
            sx={{ height: 1, margin: 1 }}
          >
            <Card sx={{ p: 1, mt: 4, width: 1 }}>
              <CardHeader
                avatar={
                  <Avatar aria-label="user-avatar" src={thread.owner?.avatar} />
                }
                title={
                  <Typography variant="subtitle1">
                    {thread.owner?.name}
                  </Typography>
                }
                subheader={
                  <Typography variant="body2">
                    {`Posted ${postedAt(thread.createdAt)}`}
                  </Typography>
                }
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
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ width: '100%' }}
                >
                  <ThreadTag category={thread.category} />
                  <Stack direction="row" spacing={1.2}>
                    <UpVoteButton
                      isUpVoted={isUpVoted}
                      onUpvoteClick={() => onUpvoteClick()}
                      totalVote={thread.upVotesBy.length}
                    />
                    <DownVoteButton
                      isDownVoted={isDownVoted}
                      onDownVoteClick={() => onDownVoteClick()}
                      totalVote={thread.downVotesBy.length}
                    />
                  </Stack>
                </Stack>
              </CardActions>
            </Card>
            <Divider sx={{ my: 3 }} />
            <Card sx={{ pt: '16px' }}>
              {thread.comments.length === 0 && (
                <Typography variant="body1" sx={{ pl: '16px', mb : 2 }}>
                  Be the first to comment!
                </Typography>
              )}
              <Stack
                direction="row"
                spacing={1}
                sx={{ pl: '16px', pr: '16px', mt: '16px,' }}
              >
                <Avatar aria-label="user-avatar" src={authUser.avatar} />
                <Box sx={{ flexGrow: 1 }}>
                  <NewCommentInput
                    isLoading={postCommentLoading}
                    onCommentSubmitted={(newComment) =>
                      onNewCommentSubmitted(newComment)
                    }
                    inputId={inputCommentId}
                  />
                </Box>
              </Stack>

              <CardContent>
                {thread.comments.length > 0 && (
                  <CommentList
                    authUserId={authUser.id}
                    comments={thread.comments}
                    onToggleDownVoted={(commentId, authUserId) =>
                      onToggleDownVotedCommentHandler(commentId, authUserId)
                    }
                    onToggleUpVoted={(commentId, authUserId) =>
                      onToggleUpVotedCommentHandler(commentId, authUserId)
                    }
                  />
                )}
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
