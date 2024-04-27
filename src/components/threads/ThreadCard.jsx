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
import parse from 'html-react-parser';
import { Icon } from '@iconify/react';
import PropTypes from "prop-types";
import { postedAt } from '../../utils/index';
import threadItemShape from '../../data/types/thread-item-shape';
import ThreadAction from './ThreadAction';

function ThreadCard({
  id,
  title,
  body,
  category,
  createdAt,
  user,
  authUserId,
  upVotesBy,
  downVotesBy,
  totalComments,
  onToggleDownVoted,
  onToggleUpVoted,
  onCommentsClick,
}) {
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
          <ThreadAction
            id={id}
            authUserId={authUserId}
            totalComments={totalComments}
            votedBy={upVotesBy}
            downVotedBy={downVotesBy}
            onToggleDownVoted={onToggleDownVoted}
            onToggleUpVoted={onToggleUpVoted}
            onCommentsClick={onCommentsClick}
          />
        </Stack>
      </CardActions>
    </Card>
  );
}

ThreadCard.propTypes = {
  ...threadItemShape,
    onToggleUpVoted : PropTypes.func.isRequired,
    onToggleDownVoted : PropTypes.func.isRequired,
    onCommentsClick : PropTypes.func.isRequired,

};

export default ThreadCard;
