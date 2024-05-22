import { IconButton, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

/** * Button Component for showing vote button and total vote count */
export default function VoteButton({ iconType, isVoted, onVoteClick, totalVote }) {
  return (
    <Stack direction="row" alignItems="center">
      <IconButton disableRipple onClick={() => onVoteClick()}>
        {iconType === 'upvote' && <span className={isVoted ? "icon--bxs icon--bxs--upvote" : "icon--bx icon--bx--upvote"}/>}
        {iconType === 'downvote' && <span className={isVoted ? "icon--bxs icon--bxs--downvote" : "icon--bx icon--bx--downvote"}/>}
        </IconButton>
      <Typography variant="subtitle" color="text.secondary">
        {totalVote}
      </Typography>
    </Stack>
  );
}
VoteButton.propTypes = {
  /**
   * VoteButton icon Type => upvote or downvote
   */
  iconType: PropTypes.oneOf(['upvote', 'downvote']).isRequired,
  /**
   * User voted status
   */
  isVoted: PropTypes.bool.isRequired,
  /**
   * On button vote click handler
   */
  onVoteClick: PropTypes.func.isRequired,
  /**
   * Total vote count to be displayed beside icon-button
   */
  totalVote: PropTypes.number.isRequired,
};
