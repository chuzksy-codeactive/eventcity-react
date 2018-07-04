import { connect } from 'react-redux';
import { userSignIn } from '../../actions/userLoginAction';
import SignInForm from './SignInForm';

/**
 * This container does the data fetching
 * then renders to its component
 *
 * @function 
 * @param {state, dispatch}
 * @return {object, function} user, auth, userSignIn
 */

const mapStateToProps = state => ({
  user: state.userReducer,
  auth: state.authReducer
});

const mapDispatchToProps = dispatch => ({
  userSignIn: (data, history) => dispatch(userSignIn(data, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
