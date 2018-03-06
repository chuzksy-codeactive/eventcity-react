import { connect } from 'react-redux';
import { updateCenter } from '../actions/centerAction';
import CenterForm from '../components/CenterForm';
import { load as loadCenter } from '../reducer/loadCenter';

const mapStateToProps = (state, props) => {
  const center = state.centerListReducer.centers.find(item => item.id === parseInt(props.match.params.id, 10));
  return {
    center,
    centers: state.centerReducer,
    initialValues: center
  };
};

const mapDispatchToProps = dispatch => ({
  updateCenter: data => dispatch(updateCenter(data)),
  load: loadCenter
});

export default connect(mapStateToProps, mapDispatchToProps)(CenterForm);
