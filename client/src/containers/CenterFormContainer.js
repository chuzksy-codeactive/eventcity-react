import { connect } from 'react-redux';
import { createCenter } from '../actions/centerAction';
import CenterForm from '../components/CenterForm';

const mapStateToProps = state => ({
  center: state.centerReducer
});

const mapDispatchToProps = dispatch => ({
  createCenter: (data, history) => dispatch(createCenter(data, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(CenterForm);
