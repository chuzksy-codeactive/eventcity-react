import createHistory from 'history/createBrowserHistory';
import axios from 'axios';
import * as types from './actionTypes';

const history = createHistory();

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('user')}`;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

/**
 * Action Creators for fetching center pagination
 *
 * @return {object}  action
 */

export const searchingCenter = () => ({
  type: types.SEARCHING_CENTER_PER_PAGE
});

export const searchCenterSuccess = (payload) => ({
  type: types.SEARCH_CENTER_PER_PAGE_SUCCESSFULL,
  payload
});

export const searchCenterFailure = (payload) => ({
  type: types.SEARCH_CENTER_PER_PAGE_FAILURE,
  payload
});

export const searchCenterPerPage = (number) => (dispatch) => {
  dispatch(searchingCenter());
  return axios({
    url: `/api/v1/centers/page/${number}`,
    method: 'get'
  }).then((res) => {
    if(res.status === 200){
      dispatch(searchCenterSuccess(res.data));
    }
  }).catch((err) => {
    if(err.response){
      if(err.response.status === 400 || err){
        dispatch(searchCenterFailure("Invalid page number, should start with 1"));
      }
    }
  })
}