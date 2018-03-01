import { connect } from 'react-redux';
import { createCenter } from '../actions/centerAction';
import CenterForm from '../components/CenterForm';
import { load as loadCenter } from '../reducer/loadCenter';

const mapStateToProps = (state, props) => {
  if (props.match.params.id) {
    const center = state.centerListReducer.centers.find(item => item.id === parseInt(props.match.params.id, 10));
    return {
      center,
      centers: state.centerReducer,
      initialValues: center
    };
  }
  return { centers: state.centerReducer };
};

const mapDispatchToProps = dispatch => ({
  createCenter: (data, history) => dispatch(createCenter(data, history)),
  load: loadCenter
});

export default connect(mapStateToProps, mapDispatchToProps)(CenterForm);
