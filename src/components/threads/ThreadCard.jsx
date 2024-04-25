import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { Icon } from '@iconify/react';
import { postedAt } from '../../utils/index';
import threadItemShape from '../../data/types/thread-item-shape';
import ThreadAction from './ThreadAction.jsx';

function ThreadCard({
  id,
  title,
  body,
  category,
  createdAt,
  user,
  authUser,
  upVotesBy,
  downVotesBy,
  totalComments,
}) {
  const isUpVoted = upVotesBy.includes(authUser?.id);
  const isDownVoted = downVotesBy.includes(authUser?.id);
  return (
    <Card sx={{ mt: 2 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={user?.avatar}
          />
        }
        title={<Typography variant="subtitle2">{title}</Typography>}
        subheader={
          <Typography
            variant="caption"
            dangerouslySetInnerHTML={{
              __html: `By ${user?.name} &#x2022; ${postedAt(createdAt)}`,
            }}
          />
        }
      />

      <Divider />
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

      <CardActions>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: '100%' }}
        >
          <Chip icon={<Icon icon="mdi:tag" />} label={category} />
          <ThreadAction totalComments={totalComments} isUpVoted={isUpVoted} isDownVoted={isDownVoted}  />
        </Stack>

        {/* <Icon icon="bxs:upvote" /> */}
        {/* <Icon icon="bxs:downvote" /> */}
      </CardActions>
    </Card>
  );
}

ThreadCard.propTypes = {
  ...threadItemShape,
};

export default ThreadCard;
