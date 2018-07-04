import { connect } from 'react-redux';
import { userSignUp } from '../../actions/userLoginAction'
import SignUpForm from './Signup';

/**
 * This container does the data fetching
 * then renders to its component
 *
 * @function 
 * @param {state, dispatch}
 * @return {object, function} user, auth, userSignUp
 */
const mapStateToProps = state => ({
  user: state.userReducer,
  auth: state.authReducer,
});

const mapDispatchToProps = dispatch => ({
  userSignUp: (data, history) => dispatch(userSignUp(data, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
