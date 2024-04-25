import { IconButton, Stack, Typography } from '@mui/material';
import { Icon } from '@iconify/react';

export default function ThreadAction({
  isUpVoted,
  isDownVoted,
  totalComments,
  onToggleUpVoted,
  onToggleDownVoted,
  onClickComments,
}) {
  return (
    <Stack direction="row">
      <IconButton sx={{ maxHeight: 20 }} disableRipple onClick={onToggleUpVoted}>
        <Icon icon={isUpVoted ? "bxs:upvote"  : "bx:upvote"} />
      </IconButton>
      <IconButton sx={{ maxHeight: 20 }} disableRipple onClick={onToggleDownVoted}>
        <Icon  icon={isUpVoted ? "bxs:downvote"  : "bx:downvote"}/>
      </IconButton>
      <IconButton sx={{ maxHeight: 20 }} disableRipple onClick={onClickComments}>
        <Icon icon="material-symbols:comment" />
        <Typography sx={{ ml: 0.5 }} variant="subtitle" color="text.secondary">
          {totalComments}
        </Typography>
      </IconButton>
    </Stack>
  );
}
