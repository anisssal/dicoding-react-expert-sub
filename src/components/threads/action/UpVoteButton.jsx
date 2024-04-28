import {IconButton, Stack, Typography} from "@mui/material";
import {Icon} from "@iconify/react";
import PropTypes from "prop-types";

export default function UpVoteButton({isUpVoted , onUpvoteClick, totalVote}){
    return (
        <Stack direction="row"   alignItems="center">
            <IconButton disableRipple onClick={onUpvoteClick}>
                <Icon
                    icon={isUpVoted ? 'bxs:upvote' : 'bx:upvote'}
                    width="20px"
                    height="20px"
                    sx={{ fontSize: '18px' }}
                />
            </IconButton>
            <Typography  variant="subtitle" color="text.secondary">
                {totalVote}
            </Typography>
        </Stack>
    )
}

UpVoteButton.propTypes = {
    isUpVoted : PropTypes.bool.isRequired,
    onUpvoteClick : PropTypes.func.isRequired,
    totalVote : PropTypes.number.isRequired
}
