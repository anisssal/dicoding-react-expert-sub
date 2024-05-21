import { describe, it, expect } from 'vitest';
import reducer, { receiveUserLeaderboards, receiveUsers } from './users_slice';

/**
 *user slice reducers test
 */
//
describe('user_slice reducers function', () => {
  it('should return state with users data ', () => {
    const initialState = {
      users: [],
      leaderboards: [],
    };

    const users = [
      {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      {
        id: 'jane_doe',
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
    ];
    const state = {
      ...initialState,
    };
    const nextState = reducer(state, receiveUsers(users));
    expect(nextState).toEqual({
      users,
      leaderboards: [],
    });
  });

  it('should return state with leaderboards data ', () => {
    const initialState = {
      users: [],
      leaderboards: [],
    };

    const leaderboards = [
      {
        user: {
          id: 'users-1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        score: 10,
      },
      {
        user: {
          id: 'users-2',
          name: 'Jane Doe',
          email: 'jane@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
        score: 5,
      },
    ];
    const state = {
      ...initialState,
    };
    const nextState = reducer(state, receiveUserLeaderboards(leaderboards));
    expect(nextState).toEqual({
      leaderboards,
      users: [],
    });
  });
});


