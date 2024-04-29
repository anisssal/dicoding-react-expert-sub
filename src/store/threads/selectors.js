import { createSelector } from 'reselect';

export const selectThreadsCategory = createSelector(
  (state) => state.threads,
  (threads) => Array.from(new Set(threads.map((thread) => thread.category)))
);
