import { connect } from 'react-redux';
import { userSignUp } from '../actions/userLoginAction'
import SignUpForm from '../components/Signup';

const mapStateToProps = state => ({
  user: state.userReducer,
  auth: state.authReducer,
});

const mapDispatchToProps = dispatch => ({
  userSignUp: (data, history) => dispatch(userSignUp(data, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
