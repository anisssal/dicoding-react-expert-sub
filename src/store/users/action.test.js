import {
  describe, it, beforeEach, afterEach, vi, expect,
} from 'vitest';
import api from "../../data/network-api";
import {showGlobalLoading, hideGlobalLoading} from "../common/common_slice";
import {asyncPopulateLeaderboard} from "./action";
import {receiveUserLeaderboards} from "./users_slice";


const fakeLeaderboardResponse = {
  "status": "success",
  "message": "ok",
  "data": {
    "leaderboards": [
      {
        "user": {
          "id": "users-1",
          "name": "John Doe",
          "email": "john@example.com",
          "avatar": "https://generated-image-url.jpg"
        },
        "score": 10
      },
      {
        "user": {
          "id": "users-2",
          "name": "Jane Doe",
          "email": "jane@example.com",
          "avatar": "https://generated-image-url.jpg"
        },
        "score": 5
      }
    ]
  }
};



const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateLeaderboard thunk tes', () => {
  beforeEach(() => {
    api._getLeaderboards = api.getLeaderboards;
  });

  afterEach(() => {
    api.getLeaderboards = api._getLeaderboards;

    // delete backup data
    delete api._getLeaderboards;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPopulateLeaderboard()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showGlobalLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveUserLeaderboards(fakeLeaderboardResponse));
    expect(dispatch).toHaveBeenCalledWith(hideGlobalLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    const returned = await asyncPopulateLeaderboard()(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showGlobalLoading());
    expect(dispatch).not.toHaveBeenCalledWith(receiveUserLeaderboards(fakeLeaderboardResponse));
    expect(dispatch).toHaveBeenCalledWith(hideGlobalLoading());
    expect(returned.payload).toMatch(fakeErrorResponse.message)

  })


});
