import { createSelector } from 'reselect';

export const selectThreadsWithUser = createSelector([(state) => state.threads.threads, (state) => state.users.users, (state) => state.threads.filterCategory], (threads, users, category) => {
  const filteredThreadsByCategory = category ? threads.filter((thread) => thread.category === category) : threads;

  return filteredThreadsByCategory.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }));
});
