import {IconButton, Stack, Typography} from "@mui/material";
import {Icon} from "@iconify/react";
import PropTypes from "prop-types";

export default function DownVoteButton({isDownVoted , onDownVoteClick, totalVote}){
    return (
        <Stack direction="row" alignItems="center">
            <IconButton disableRipple onClick={onDownVoteClick}>
                <Icon
                    icon={isDownVoted ? 'bxs:downvote' : 'bx:downvote'}
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

DownVoteButton.propTypes = {
    isDownVoted : PropTypes.bool.isRequired,
    onDownVoteClick : PropTypes.func.isRequired,
    totalVote : PropTypes.number.isRequired
}
