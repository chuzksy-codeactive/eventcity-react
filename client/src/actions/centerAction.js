import axios from 'axios';
import * as types from './actionTypes';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('user')}`;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

export const fetchingCenter = () => ({
  type: types.FETCHING_CENTER
});

export const fetchingCenterError = () => ({
  type: types.FETCHING_CENTER_ERROR
});

export const centerReset = () => ({
  type: types.CENTER_RESET
});

export const fectchCenterSuccess = payload => ({
  type: types.FETCHING_CENTER_SUCCESS,
  payload
});

export const fetchCenter = () => (dispatch) => {
  dispatch(fetchingCenter());
  axios({
    url: '/api/v1/centers',
    method: 'get'
  })
    .then((res) => {
      dispatch(fectchCenterSuccess(res.data.data));
    })
    .catch(() => {
      dispatch(fetchingCenterError());
    });
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

export const createCenter = (values, route) => {
  const data = new FormData();
  data.append('name', values.name);
  data.append('capacity', values.capacity);
  data.append('location', values.location);
  data.append('price', values.price);
  data.append('facilities', values.facilities);
  data.append('type', values.type);
  data.append('file', values.file);
  return (dispatch) => {
    dispatch(creatingCenter());
    axios({
      url: '/api/v1/centers',
      method: 'post',
      data
    })
      .then((res) => {
        if (res.status === 200 && res.data) {
          dispatch(createCenterSuccess(res.data));
          route.push('/centers/list');
        }
      })
      .catch((err) => {
        dispatch(createCenterFailure(err));
      });
  };
};

export const updatingCenter = () => ({
  type: types.UPDATING_CENTER
});

export const updatingCenterSuccess = payload => ({
  type: types.UPDATING_CENTER_SUCCESS,
  payload
});

export const updatingCenterFailure = () => ({
  type: types.UPDATING_CENTER_FAILURE
});

export const updateCenter = (values) => {
  const data = new FormData();
  data.append('name', values.name);
  data.append('capacity', values.capacity);
  data.append('location', values.location);
  data.append('price', values.price);
  data.append('facilities', values.facilities);
  data.append('type', values.type);
  data.append('file', values.file);
  return (dispatch) => {
    dispatch(updatingCenter());
    axios({
      url: `/api/v1/centers/${values.id}`,
      method: 'put',
      data
    })
      .then((res) => {
        dispatch(updatingCenterSuccess(res.data));
        setTimeout(() => {
          history.goBack();
        }, 2000);
      })
      .catch((err) => {
        // dispatch(updatingCenterFailure());
        console.log(err);
      });
  };
};

export const centerDeleting = () => ({
  type: types.CENTER_DELETING
});

export const centerDeleted = id => ({
  type: types.CENTER_DELETED,
  id
});

export const deleteCenter = id => (dispatch) => {
  dispatch(centerDeleting());
  return axios({
    url: `/api/v1/centers/${id}`,
    method: 'delete'
  }).then(() => {
    dispatch(centerDeleted(id));
  });
};
