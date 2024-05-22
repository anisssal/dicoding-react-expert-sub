import { describe, it, expect } from 'vitest';
import reducer, {
  receiveThreads,
  resetPostThread,
  setFilterCategory,
  toggleDownVoteThread,
  toggleUpVoteThread
} from './threads_slice';
import {asyncPostThread} from "./action";

/**
 *thread slice reducers test
 */
describe('detail thread slice reducers function', () => {
  it('should return state with threads data ', () => {
    const initialState = {
      threads: [],
      filterCategory: null,
      postThreadLoading: false,
      postThreadSuccess: false,
    };

    const dummyThreads = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'Redux',
        createdAt: '2021-06-22T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 1,
      },
    ];
    const state = {
      ...initialState,
    };
    const nextState = reducer(state, receiveThreads(dummyThreads));
    expect(nextState).toEqual({
      ...initialState,
      threads: dummyThreads,
    });
  });
  it('should reset state with default post-thread state  ', () => {
    const initialState = {
      threads: [],
      filterCategory: null,
      postThreadLoading: true,
      postThreadSuccess: false,
    };

    const state = {
      ...initialState,
    };
    const nextState = reducer(state, resetPostThread());
    expect(nextState).toEqual({
      threads: [],
      filterCategory: null,
      postThreadLoading: false,
      postThreadSuccess: false,
    });
  });

  it('should return state with new filter category  ', () => {
    const initialState = {
      threads: [],
      filterCategory: null,
      postThreadLoading: false,
      postThreadSuccess: false,
    };

    const state = {
      ...initialState,
    };
    const filter = 'Redux';
    const nextState = reducer(state, setFilterCategory(filter));
    expect(nextState).toEqual({
      threads: [],
      filterCategory: filter,
      postThreadLoading: false,
      postThreadSuccess: false,
    });
  });

  it('should return state remove filter category when new-filter is same as old one ', () => {
    const filter = 'Redux';

    const initialState = {
      threads: [],
      filterCategory: filter,
      postThreadLoading: false,
      postThreadSuccess: false,
    };

    const state = {
      ...initialState,
    };
    const nextState = reducer(state, setFilterCategory(filter));
    expect(nextState).toEqual({
      threads: [],
      filterCategory: null,
      postThreadLoading: false,
      postThreadSuccess: false,
    });
  });

  it('should return the state with UP VOTED thread when toggleUpVoteThread called', () => {
    const dummyThread = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      totalComments : 0,
    };
    const initialState = {
      threads: [
          dummyThread
      ],
      filterCategory: null,
      postThreadLoading: false,
      postThreadSuccess: false,
    };

    const authUserId = 'users-4';
    const {id} = dummyThread;
    const nextState = reducer(initialState, toggleUpVoteThread({ id , authUserId }));
    expect(nextState).toEqual({
      threads: [
        {
          ...dummyThread,
          upVotesBy:  [
              authUserId
          ]
        }
      ],
      filterCategory: null,
      postThreadLoading: false,
      postThreadSuccess: false,
    });
  })

  it('should return the state with DOWN VOTED thread when toggleDownVoteThread called', () => {
    const dummyThread = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      totalComments : 0,
    };
    const initialState = {
      threads: [
        dummyThread
      ],
      filterCategory: null,
      postThreadLoading: false,
      postThreadSuccess: false,
    };

    const authUserId = 'users-4';
    const {id} = dummyThread;
    const nextState = reducer(initialState, toggleDownVoteThread({ id , authUserId }));
    expect(nextState).toEqual({
      threads: [
        {
          ...dummyThread,
          downVotesBy:  [
            authUserId
          ]
        }
      ],
      filterCategory: null,
      postThreadLoading: false,
      postThreadSuccess: false,
    });
  })
});

describe('thread_slice extraReducers function', () => {
  it('should return the state with postThreadLoading =true when asyncPostThread pending', () => {
    const initialState = {
      threads: [],
      filterCategory: null,
      postThreadLoading: false,
      postThreadSuccess: false,
    };

    const action = { type: asyncPostThread.pending.type,  };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      threads: [],
      filterCategory: null,
      postThreadLoading: true,
      postThreadSuccess: false,
    });
  });

  it('should return the state with postThreadLoading =false & postThreadSuccess = true when asyncPostThread full-filled', () => {
    const initialState = {
      threads: [],
      filterCategory: null,
      postThreadLoading: true,
      postThreadSuccess: false,
    };

    const action = { type: asyncPostThread.fulfilled.type,  };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      threads: [],
      filterCategory: null,
      postThreadLoading: false,
      postThreadSuccess: true,
    });
  })

  it('should return the state with postThreadLoading=false & postThreadSuccess=false when asyncPostThread rejected', () => {
    const initialState = {
      threads: [],
      filterCategory: null,
      postThreadLoading: true,
      postThreadSuccess: false,
    };

    const action = { type: asyncPostThread.rejected.type,  };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      threads: [],
      filterCategory: null,
      postThreadLoading: false,
      postThreadSuccess: false,
    });
  })
})

