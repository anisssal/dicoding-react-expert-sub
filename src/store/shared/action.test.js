import {
  describe, it, beforeEach, afterEach, vi, expect,
} from 'vitest';
import api from "../../data/network-api";
import {showGlobalLoading, hideGlobalLoading} from "../common/common_slice";
import {asyncPopulateUsersAndThreads} from "./shared_action";
import {receiveUsers} from "../users/users_slice";
import {receiveThreads} from "../threads/threads_slice";


const fakeThreadsResponse = {
  "status": "success",
  "message": "ok",
  "data": {
    "threads": [
      {
        "id": "thread-1",
        "title": "Thread Pertama",
        "body": "Ini adalah thread pertama",
        "category": "General",
        "createdAt": "2021-06-21T07:00:00.000Z",
        "ownerId": "users-1",
        "upVotesBy": [],
        "downVotesBy": [],
        "totalComments": 0
      }
    ]
  }
};


const fakeUsersResponse = {
  "status": "success",
  "message": "ok",
  "data": {
    "users": [
      {
        "id": "john_doe",
        "name": "John Doe",
        "email": "john@example.com",
        "avatar": "https://generated-image-url.jpg"
      },
      {
        "id": "jane_doe",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "avatar": "https://generated-image-url.jpg"
      }
    ]
  }
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateUsersAndThreads thunk test', () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;

    // delete backup data
    delete api._getAllUsers;
    delete api._getAllThreads;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showGlobalLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveUsers(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveThreads(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideGlobalLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    const returned = await asyncPopulateUsersAndThreads()(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showGlobalLoading());
    expect(dispatch).toHaveBeenCalledWith(hideGlobalLoading());

    expect(dispatch).not.toHaveBeenCalledWith(receiveUsers(fakeUsersResponse));
    expect(dispatch).not.toHaveBeenCalledWith(receiveThreads(fakeThreadsResponse));
    expect(returned.payload).toMatch(fakeErrorResponse.message)

  })


});
