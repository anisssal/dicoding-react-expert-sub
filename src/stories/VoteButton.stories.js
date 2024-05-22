import {fn} from "@storybook/test";
import VoteButton from "../components/action/VoteButton";

export default {
    title: 'VoteButton',
    component: VoteButton,
    parameters: {
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: { onVoteClick: fn() },
};

export const UpVoteButton = {
    args: {
        iconType: "upvote",
        isVoted: false,
        totalVote : 20
    },
};

export const DownVoteButton = {
    args: {
        iconType: "downvote",
        isVoted: false,
        totalVote : 10
    },
};

