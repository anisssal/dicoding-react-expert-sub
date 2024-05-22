import LeaderboardItem from "../components/LeaderboardItem";

export default {
    title: 'LeaderboardItem',
    component: LeaderboardItem,
    parameters: {
        layout: 'left',
    },
    tags: ['autodocs'],
};

export const LeaderboardItemExample = {
    args: {
        user: {
            id: 10,
            name: "Anis",
            email: "anis@gmail.com",
            avatar: "https://ui-avatars.com/api/?name=Anis&background=random\"",
        },
        score: 100,
    },
};

