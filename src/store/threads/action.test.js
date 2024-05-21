import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest';
import api from '../../data/network-api';
import {asyncPostThread, asyncToggleDownVotedThread, asyncToggleUpVotedThread} from './action';
import { toggleDownVoteThread, toggleUpVoteThread } from './threads_slice';

const fakeSuccessPostThreadResponse = {
  id: "thread-1",
  title: "Thread Pertama",
  body: "Ini adalah thread pertama",
  category: "General",
  createdAt: "2021-06-21T07:00:00.000Z",
  ownerId: "users-1",
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0
}
const fakeErrorPostThreadResponse = new Error('Ups, something went wrong');


describe('asyncPostThread thunk tes', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
  });

  afterEach(() => {
    api.createThread = api._createThread;

    // delete backup data
    delete api._createThread;
  });

  it('should return action correctly when post thread success', async () => {
    api.createThread = () => Promise.resolve(fakeSuccessPostThreadResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    const returnedValue = await asyncPostThread({
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
    })(dispatch);

    // assert
    expect(returnedValue.payload).toEqual(fakeSuccessPostThreadResponse);
  });

  it('should return action correctly when post thread failed', async () => {
    api.createThread = () => Promise.reject(fakeErrorPostThreadResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    const returned = await asyncPostThread({
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
    })(dispatch)

    // assert
    expect(returned.payload).toMatch(fakeErrorPostThreadResponse.message)

  })
})





const fakeSuccessUpVotedThread = {
  status: 'success',
  message: 'Thread upvoted',
  data: {
    vote: {
      id: 'vote-1',
      userId: 'users-1',
      threadId: 'thread-1',
      voteType: 1,
    },
  },
};

const fakeSuccessDownVotedThread = {
  status: 'success',
  message: 'Thread downvoted',
  data: {
    vote: {
      id: 'vote-1',
      userId: 'users-1',
      threadId: 'thread-1',
      voteType: -1,
    },
  },
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('toggleUpVoteThread thunk tes', () => {
  beforeEach(() => {
    api._upVoteThread = api.upVoteThread;
  });

  afterEach(() => {
    api.upVoteThread = api._upVoteThread;

    // delete backup data
    delete api._upVoteThread;
  });

  it('should dispatch action correctly when upVoted-thread which on neutral condition', async () => {
    api.upVoteThread = () => Promise.resolve(fakeSuccessUpVotedThread);

    // mock dispatch
    const dispatch = vi.fn();

    const threadId = 'thread-1';

    function neutralThreadState() {
      return {
        threads: {
          threads: [
            {
              id: threadId,
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
              totalComments: 0,
            },
          ],
        },
      };
    }

    const actionPayload = {
      id: threadId,
      authUserId: 'users-4',
    };
    // action
    await asyncToggleUpVotedThread(actionPayload)(dispatch, neutralThreadState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(toggleUpVoteThread(actionPayload));
    expect(dispatch).not.toHaveBeenCalledWith(toggleDownVoteThread(actionPayload));
  });

  it('should dispatch action correctly when upVoted-thread which has been downVoted (downVoted condition) ', async () => {
    api.upVoteThread = () => Promise.resolve(fakeSuccessUpVotedThread);

    // mock dispatch
    const dispatch = vi.fn();

    const threadId = 'thread-1';
    const userId = 'users-4';

    function downVotedThreadState() {
      return {
        threads: {
          threads: [
            {
              id: threadId,
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
              downVotesBy: [userId],
              totalComments: 0,
            },
          ],
        },
      };
    }

    const actionPayload = {
      id: threadId,
      authUserId: userId,
    };
    // action
    await asyncToggleUpVotedThread(actionPayload)(dispatch, downVotedThreadState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(toggleUpVoteThread(actionPayload));
    expect(dispatch).toHaveBeenCalledWith(toggleDownVoteThread(actionPayload));
  });

  it('should dispatch action correctly when upVoted-thread which has been downVoted (downVoted condition) and data fetching failed', async () => {
    api.upVoteThread = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    const threadId = 'thread-1';
    const userId = 'users-4';

    function downVotedThreadState() {
      return {
        threads: {
          threads: [
            {
              id: threadId,
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
              downVotesBy: [userId],
              totalComments: 0,
            },
          ],
        },
      };
    }

    const actionPayload = {
      id: threadId,
      authUserId: userId,
    };
    // action
    const returned = await asyncToggleUpVotedThread(actionPayload)(dispatch, downVotedThreadState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(toggleUpVoteThread(actionPayload));
    expect(dispatch).toHaveBeenCalledWith(toggleDownVoteThread(actionPayload));

    expect(dispatch).toHaveBeenCalledWith(toggleUpVoteThread(actionPayload));
    expect(dispatch).toHaveBeenCalledWith(toggleDownVoteThread(actionPayload));
    expect(returned.payload).toMatch(fakeErrorResponse.message);
  });
});

describe('asyncToggleDownVotedThread thunk tes', () => {
  beforeEach(() => {
    api._upVoteThread = api.upVoteThread;
    api._neutralVoteThread = api.neutralVoteThread;
  });

  afterEach(() => {
    api.upVoteThread = api._upVoteThread;
    api.neutralVoteThread = api._neutralVoteThread;

    // delete backup data
    delete api._upVoteThread;
    delete api._neutralVoteThread;
  });

  it('should dispatch action correctly when downVote-thread which on neutral condition', async () => {
    api.downVoteThread = () => Promise.resolve(fakeSuccessDownVotedThread);

    // mock dispatch
    const dispatch = vi.fn();

    const threadId = 'thread-1';

    function neutralThreadState() {
      return {
        threads: {
          threads: [
            {
              id: threadId,
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
              totalComments: 0,
            },
          ],
        },
      };
    }

    const actionPayload = {
      id: threadId,
      authUserId: 'users-4',
    };
    // action
    await asyncToggleDownVotedThread(actionPayload)(dispatch, neutralThreadState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(toggleDownVoteThread(actionPayload));
    expect(dispatch).not.toHaveBeenCalledWith(toggleUpVoteThread(actionPayload));
  });

  it('should dispatch action correctly when downVote-thread which has been upVoted (upVoted condition) ', async () => {
    api.downVoteThread = () => Promise.resolve(fakeSuccessDownVotedThread);

    // mock dispatch
    const dispatch = vi.fn();

    const threadId = 'thread-1';
    const userId = 'users-4';

    function upVotedThreadState() {
      return {
        threads: {
          threads: [
            {
              id: threadId,
              title: 'Thread Pertama',
              body: 'Ini adalah thread pertama',
              category: 'General',
              createdAt: '2021-06-21T07:00:00.000Z',
              owner: {
                id: 'users-1',
                name: 'John Doe',
                avatar: 'https://generated-image-url.jpg',
              },
              upVotesBy: [userId],
              downVotesBy: [],
              totalComments: 0,
            },
          ],
        },
      };
    }

    const actionPayload = {
      id: threadId,
      authUserId: userId,
    };
    // action
    await asyncToggleDownVotedThread(actionPayload)(dispatch, upVotedThreadState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(toggleUpVoteThread(actionPayload));
    expect(dispatch).toHaveBeenCalledWith(toggleDownVoteThread(actionPayload));
  });

  it('should dispatch action correctly when downVote-thread which has been upVoted (upVoted condition) and data fetching failed', async () => {
    api.downVoteThread = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    const threadId = 'thread-1';
    const userId = 'users-4';

    function upVotedThreadState() {
      return {
        threads: {
          threads: [
            {
              id: threadId,
              title: 'Thread Pertama',
              body: 'Ini adalah thread pertama',
              category: 'General',
              createdAt: '2021-06-21T07:00:00.000Z',
              owner: {
                id: 'users-1',
                name: 'John Doe',
                avatar: 'https://generated-image-url.jpg',
              },
              upVotesBy: [userId],
              downVotesBy: [],
              totalComments: 0,
            },
          ],
        },
      };
    }

    const actionPayload = {
      id: threadId,
      authUserId: userId,
    };
    // action
    const returned = await asyncToggleDownVotedThread(actionPayload)(dispatch, upVotedThreadState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(toggleDownVoteThread(actionPayload));
    expect(dispatch).toHaveBeenCalledWith(toggleUpVoteThread(actionPayload));

    expect(dispatch).toHaveBeenCalledWith(toggleDownVoteThread(actionPayload));
    expect(dispatch).toHaveBeenCalledWith(toggleUpVoteThread(actionPayload));
    expect(returned.payload).toMatch(fakeErrorResponse.message);
  });
});
