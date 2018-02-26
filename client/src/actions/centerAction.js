import axios from 'axios';
import * as types from './actionTypes';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('user');
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

export const fetchingCenter = () => ({
  type: types.FETCHING_CENTER
});

export const fetchingCenterError = payload => ({
  type: types.FETCHING_CENTER_ERROR,
  payload
});

export const fectchingSuccess = payload => ({
  type: types.FETCHING_CENTER_SUCCESS,
  payload
});

export const fetchCenter = () => {
  return dispatch => {
    dispatch(fetchingCenter());
    axios({
      url: '/api/v1/centers',
      method: 'get'
    })
      .then(res => {
        dispatch(fectchingSuccess(res));
        console.log(res);
      })
      .catch(() => {
        dispatch(fetchingCenterError('Error'));
      });
  };
};

export const creatingCenter = () => ({
  type: types.CREATING_CENTER
});

export const createCenterFailure = payload => ({
  type: types.CENTER_CREATED_FAILURE,
  payload
});

export const createCenterSuccess = payload => ({
  type: types.CENTER_CREATED_SUCCESS,
  payload
});

export const createCenter = (values, history) => {
  let data = new FormData();
  data.append('name', values.name);
  data.append('capacity', values.capacity);
  data.append('location', values.location);
  data.append('price', values.price);
  data.append('facilities', values.facilities);
  data.append('type', values.type);
  data.append('file', values.file);
  return dispatch => {
    dispatch(creatingCenter());
    axios({
      url: '/api/v1/centers',
      method: 'post',
      data
    })
      .then(res => {
        if (res.status === 200 && res.data) {
          dispatch(createCenterSuccess(res.data));
        }
      })
      .catch(err => {
        dispatch(createCenterFailure(err));
      });
  };
};
