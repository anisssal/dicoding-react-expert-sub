import { describe, it, expect } from 'vitest';
import reducer, { resetDetailThreadState, toggleDownVoteComment, toggleDownVoteThreadDetail, toggleUpVoteComment, toggleUpVoteThreadDetail } from './detail_thread_slice';
import { asyncGetDetailThread, asyncPostCommentThread } from './action';

/**
 *detail thread slice reducers test
 */
//
describe('detail thread slice reducers function', () => {
  it('should reset the state to the initial state ', () => {
    const initialState = {
      thread: null,
      postCommentLoading: false,
      postCommentSuccess: false,
      getDetailThreadError: false,
    };

    const dummyThread = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };
    const state = {
      ...initialState,
    };
    state.thread = dummyThread;
    const nextState = reducer(state, resetDetailThreadState());
    expect(nextState).toEqual(initialState);
  });

  it('should return the state with UP VOTED thread when toggleUpVoteThreadDetail called', () => {
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
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const initialState = {
      thread: dummyThread,
      postCommentLoading: false,
      postCommentSuccess: false,
      getDetailThreadError: false,
    };

    const authUserId = 'users-4';
    const nextState = reducer(initialState, toggleUpVoteThreadDetail({ authUserId }));
    expect(nextState).toEqual({
      ...initialState,
      thread: {
        ...dummyThread,
        upVotesBy: [authUserId],
      },
    });
  });

  it('should return the state with DOWN VOTED thread when toggleDownVoteThreadDetail called', () => {
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
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const initialState = {
      thread: dummyThread,
      postCommentLoading: false,
      postCommentSuccess: false,
      getDetailThreadError: false,
    };

    const authUserId = 'users-4';
    const nextState = reducer(initialState, toggleDownVoteThreadDetail({ authUserId }));
    expect(nextState).toEqual({
      ...initialState,
      thread: {
        ...dummyThread,
        downVotesBy: [authUserId],
      },
    });
  });

  it('should return the state with UP VOTED thread-comment when toggleUpVoteComment called', () => {
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
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const initialState = {
      thread: {
        ...dummyThread,
      },
      postCommentLoading: false,
      postCommentSuccess: false,
      getDetailThreadError: false,
    };

    const authUserId = 'users-4';
    const commentId = 'comment-1';
    const payload = {
      authUserId,
      commentId,
    };
    const nextState = reducer(initialState, toggleUpVoteComment(payload));

    expect(nextState).toEqual({
      ...initialState,
      thread: {
        ...dummyThread,
        comments: [
          {
            ...initialState.thread.comments[0],
            upVotesBy: [authUserId],
          },
        ],
      },
    });
  });

  it('should return the state with DOWN VOTED thread-comment when toggleDownVoteComment called', () => {
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
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const initialState = {
      thread: {
        ...dummyThread,
      },
      postCommentLoading: false,
      postCommentSuccess: false,
      getDetailThreadError: false,
    };

    const authUserId = 'users-4';
    const commentId = 'comment-1';
    const payload = {
      authUserId,
      commentId,
    };
    const nextState = reducer(initialState, toggleDownVoteComment(payload));

    expect(nextState).toEqual({
      ...initialState,
      thread: {
        ...dummyThread,
        comments: [
          {
            ...initialState.thread.comments[0],
            downVotesBy: [authUserId],
          },
        ],
      },
    });
  });
});

describe('detail thread slice extraReducers function', () => {
  it('should return the state with thread when asyncGetDetailThread full-filled', () => {
    const initialState = {
      thread: null,
      postCommentLoading: false,
      postCommentSuccess: false,
      getDetailThreadError: false,
    };
    const dummyThread = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };

    const action = { type: asyncGetDetailThread.fulfilled.type, payload: { ...dummyThread } };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      thread: dummyThread,
      postCommentLoading: false,
      postCommentSuccess: false,
      getDetailThreadError: false,
    });
  });

  it('should return the state with error when asyncGetDetailThread rejected', () => {
    const initialState = {
      thread: null,
      postCommentLoading: false,
      postCommentSuccess: false,
      getDetailThreadError: false,
    };

    const action = { type: asyncGetDetailThread.rejected.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      thread: null,
      postCommentLoading: false,
      postCommentSuccess: false,
      getDetailThreadError: true,
    });
  });

  it('should return the state with postCommentSuccess = false & postCommentLoading = true when asyncPostCommentThread pending', () => {
    const initialState = {
      thread: null,
      postCommentLoading: false,
      postCommentSuccess: false,
      getDetailThreadError: false,
    };

    const action = { type: asyncPostCommentThread.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      thread: null,
      postCommentLoading: true,
      postCommentSuccess: false,
      getDetailThreadError: false,
    });
  });

  it('should return the state with new Comment &postCommentSuccess = true & postCommentLoading = false when asyncPostCommentThread full-filled', () => {
    const initialState = {
      thread: {
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
        comments: [],
      },

      postCommentLoading: true,
      postCommentSuccess: false,
      getDetailThreadError: false,
    };

    const action = {
      type: asyncPostCommentThread.fulfilled.type,
      payload: {
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      thread: {
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
        comments: [
          {
            id: 'comment-1',
            content: 'Ini adalah komentar pertama',
            createdAt: '2021-06-21T07:00:00.000Z',
            owner: {
              id: 'users-1',
              name: 'John Doe',
              avatar: 'https://generated-image-url.jpg',
            },
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      },
      postCommentLoading: false,
      postCommentSuccess: true,
      getDetailThreadError: false,
    });
  });

  it('should return the state with  postCommentLoading = false when asyncPostCommentThread rejected', () => {
    const initialState = {
      thread: {
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
        comments: [],
      },

      postCommentLoading: true,
      postCommentSuccess: false,
      getDetailThreadError: false,
    };

    const action = { type: asyncPostCommentThread.rejected.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      thread: {
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
        comments: [],
      },
      postCommentLoading: false,
      postCommentSuccess: false,
      getDetailThreadError: false,
    });
  });
});
