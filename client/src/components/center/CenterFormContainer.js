import { connect } from 'react-redux';
import { createCenter } from '../../actions/centerAction';
import CenterForm from './CenterForm';

const mapStateToProps = (state, props) => {
  return { centers: state.centerReducer };
};

const mapDispatchToProps = dispatch => ({
  createCenter: (data, history) => dispatch(createCenter(data, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(CenterForm);
