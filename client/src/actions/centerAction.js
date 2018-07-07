import createHistory from 'history/createBrowserHistory';
import axios from 'axios';
import * as types from './actionTypes';

const history = createHistory();

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('user')}`;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';


/**
 * Action Creators for fetching center
 *
 * @return {object}  action [FETCHING_CENTER]
 */
export const fetchingCenter = () => ({
  type: types.FETCHING_CENTER
});

/**
 * Action Creators for flag errors 
 * when fetching centers
 *
 * @return {object}  action [FETCHING_CENTER_ERROR]
 */

export const fetchingCenterError = () => ({
  type: types.FETCHING_CENTER_ERROR
});

/**
 * Action Creators for resetting center state
 *
 * @return {object}  action [CENTER_RESET]
 */
export const centerReset = () => ({
  type: types.CENTER_RESET
});

/**
 * Action Creators fetching centers successfully
 * @param {object} payload centers data
 * @return {object}  action [FETCHING_CENTER_SUCCESS]
 */
export const fectchCenterSuccess = payload => ({
  type: types.FETCHING_CENTER_SUCCESS,
  payload
});

/**
 * Action to fetch centers by making
 * http request to the backend
 * 
 * 
 * @return {void}
 */
export const fetchCenter = () => (dispatch) => {
  dispatch(fetchingCenter());
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('user')}`;
  axios({
    url: '/api/v1/centers',
    method: 'get'
  })
  .then((res) => {
    dispatch(fectchCenterSuccess(res.data.data));
  })
  .catch((e) => {
      dispatch(fetchingCenterError());
    });
};

/**
 * Action Creators creating centers
 * 
 * @param {void} 
 * @return {object}  action [CREATING_CENTER]
 */
export const creatingCenter = () => ({
  type: types.CREATING_CENTER
});


/**
 * Action Creators for flagging error
 * when there is failure creating center
 * 
 * @param {object} payload centers data
 * @return {object}  action [CENTER_CREATED_FAILURE]
 */
export const createCenterFailure = payload => ({
  type: types.CENTER_CREATED_FAILURE,
  payload
});

/**
 * Action Creators creating centers successfully
 * @param {object} payload centers data
 * @return {object}  action [CENTER_CREATED_SUCCESS]
 */
export const createCenterSuccess = payload => ({
  type: types.CENTER_CREATED_SUCCESS,
  payload
});

/**
 * Action for creating center by making
 * POST http request to the server
 * 
 * @param {object} values values for center
 * @return {void}  
 */
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
        if (res.status === 201 && res.data) {
          dispatch(createCenterSuccess(res.data));
          route.push('/centers/list');
        }
      })
      .catch((err) => {
        dispatch(createCenterFailure(err));
      });
  };
};

/**
 * Action Creators updating 
 * It is use to indicate that the center is 
 * updating - The loader indicates that the center is updating
 * 
 * @param {void} 
 * @return {object}  action [UPDATING_CENTER]
 */
export const updatingCenter = () => ({
  type: types.UPDATING_CENTER
});

/**
 * Action Creators to indicate that the center
 * updated successfully
 * 
 * @param {object} payload centers data
 * @return {object}  action [FETCHING_CENTER_SUCCESS]
 */
export const updatingCenterSuccess = payload => ({
  type: types.UPDATING_CENTER_SUCCESS,
  payload
});

/**
 * Action Creators indicate that there's a failure
 * trying to update a center
 * 
 * @param {void} 
 * @return {object}  action [UPDATING_CENTER_FAILURE]
 */
export const updatingCenterFailure = () => ({
  type: types.UPDATING_CENTER_FAILURE
});

/**
 * Action for updating a center by making a POST
 * http request to the server
 * 
 * @param {object} values values to update
 * @return {object}  action [FETCHING_CENTER_SUCCESS]
 */
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
      .catch(() => {
        // dispatch(updatingCenterFailure());
      });
  };
};

/**
 * Action Creators to indicate that a center
 * is deleting. The loader shows that the center
 * is deleting
 * 
 * @param {void} 
 * @return {object}  action [CENTER_DELETING]
 */
export const centerDeleting = () => ({
  type: types.CENTER_DELETING
});

/**
 * Action Creator to indicate that a center has 
 * been deleted
 * 
 * @param {number} id center's Id to delete
 * @return {object}  action [CENTER_DELETED]
 */
export const centerDeleted = id => ({
  type: types.CENTER_DELETED,
  id
});

/**
 * Action Creators to delete a center
 * 
 * @param {number} id center's Id to delete
 * @return {void}  
 */
export const deleteCenter = id => (dispatch) => {
  dispatch(centerDeleting());
  return axios({
    url: `/api/v1/centers/${id}`,
    method: 'delete'
  }).then(() => {
    dispatch(centerDeleted(id));
  });
};
