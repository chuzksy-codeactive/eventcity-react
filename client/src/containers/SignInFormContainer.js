import { connect } from 'react-redux';
import { userSignIn } from '../actions/userLoginAction';
import SignInForm from '../components/SignInForm';

const mapStateToProps = state => ({
  user: state.userReducer,
  auth: state.authReducer
});

const mapDispatchToProps = dispatch => ({
  userSignIn: (data, history) => dispatch(userSignIn(data, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);
