import ThreadCategoryItem from "../components/ThreadCategoryItem";

export default {
    title: 'Thread Category Item Filter',
    component: ThreadCategoryItem,
    parameters: {
        layout: 'left',
    },
    tags: ['autodocs'],
};
export const ThreadCategoryItemSelected = {
    args: {
        category: "Redux",
        selected : true,
    },
};

export const ThreadCategoryItemNotSelected = {
    args: {
        category: "Redux",
        selected : false,
    },
};

