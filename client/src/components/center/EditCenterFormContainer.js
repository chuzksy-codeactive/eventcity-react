import { connect } from 'react-redux';
import { updateCenter } from '../../actions/centerAction';
import CenterForm from './CenterForm';

const mapStateToProps = (state, props) => {
  const center = state.centerListReducer.centers.find(item => item.id === parseInt(props.match.params.id, 10));
  return {
    center,
    centers: state.centerReducer,
    initialValues: center
  };
};

const mapDispatchToProps = dispatch => ({
  updateCenter: data => dispatch(updateCenter(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CenterForm);
