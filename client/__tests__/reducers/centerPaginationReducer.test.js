import * as types from '../../src/actions/actionTypes';
import centerPaginationReducer from '../../src/reducer/centerPaginationReducer';

const initialState = {
  error: null,
  loading: false,
  centers: {}
}

describe('Center pagination reducer test', () => {
  it('should return the initial state', () => {
    expect(centerPaginationReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle SEARCHING_CENTER_PER_PAGE', () => {
    expect(centerPaginationReducer(initialState, {
      type: types.SEARCHING_CENTER_PER_PAGE
    })).toEqual({
      ...initialState,
      centers: {},
      error: null,
      loading: true
    });
  });
  it('should handle SEARCH_CENTER_PER_PAGE_FAILURE', () => {
    expect(centerPaginationReducer(initialState, {
      type: types.SEARCH_CENTER_PER_PAGE_FAILURE,
      payload: 'error fetching center page'
    })).toEqual({
      ...initialState,
      centers: {},
      error: 'error fetching center page',
      loading: false
    });
  });
  it('should handle SEARCH_CENTER_PER_PAGE_SUCCESSFULL', () => {
    expect(centerPaginationReducer(initialState, {
      type: types.SEARCH_CENTER_PER_PAGE_SUCCESSFULL,
      payload: {
        data: [{
          name: 'Grailland Hall',
          location: 'Iju Hills'
        }]
      }
    })).toEqual({
      ...initialState,
      centers: {
        data: [{
          name: 'Grailland Hall',
          location: 'Iju Hills'
        }]
      },
      error: null,
      loading: false
    });
  });
});