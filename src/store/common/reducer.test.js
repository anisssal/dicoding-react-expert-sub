import { describe, it, expect } from 'vitest';
import reducer, {hideGlobalLoading, showGlobalLoading} from "./common_slice";
import {asyncPreloadProcess} from "./common_action";

/**
 *common_slice reducers test
 */
//
describe('common_slice reducers function', () => {
  it('should return state with globalLoading = true ', () => {
    const initialState = {
      isPreload: true,
      globalLoading: false,
    };

    const state = {
      ...initialState,
    };
    const nextState = reducer(state, showGlobalLoading());
    expect(nextState).toEqual({
      isPreload: true,
      globalLoading: true,
    });
  });

  it('should return state with globalLoading = false ', () => {
    const initialState = {
      isPreload: true,
      globalLoading: true,
    };

    const state = {
      ...initialState,
    };
    const nextState = reducer(state, hideGlobalLoading());
    expect(nextState).toEqual({
      isPreload: true,
      globalLoading: false,
    });
  });
});

describe('common_slice extraReducers function', () => {
  it('should return the state with isPreload = false when asyncPreloadProcess rejected', () => {
    const initialState = {
      isPreload: true,
      globalLoading: false,
    };

    const action = { type: asyncPreloadProcess.rejected.type,  };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      isPreload: false,
      globalLoading: false,
    });
  });

  it('should return the state with isPreload = false when asyncPreloadProcess full-filled', () => {
    const initialState = {
      isPreload: true,
      globalLoading: false,
    };

    const action = { type: asyncPreloadProcess.fulfilled.type,  };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      isPreload: false,
      globalLoading: false,
    });
  });

})


