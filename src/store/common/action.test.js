import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest';
import api from '../../data/network-api';
import {asyncPreloadProcess} from "./common_action";
import {setUser} from "../auth/auth_slice";

const fakeUserProfileResponse = {
  user: {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPreloadProcess thunk tes', () => {
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile;

    // delete backup data
    delete api._getOwnProfile;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    api.getOwnProfile = () => Promise.resolve(fakeUserProfileResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(setUser(fakeUserProfileResponse));

  });

  it('should dispatch action correctly when data fetching failed', async () => {
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    const returned = await asyncPreloadProcess()(dispatch);

    // assert
    expect(returned.payload).toMatch(fakeErrorResponse.message);
  });
});
