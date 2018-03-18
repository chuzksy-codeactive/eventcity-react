import { connect } from 'react-redux';
import { fetchEventCenter } from '../actions/eventActions';
import EventCenterPage from '../components/EventCenterPage';

const mapStateToProps = state => ({
  eventCenter: state.eventCenterReducer,
  userId: state.userReducer.user.data.id
});

const mapDispatchToProps = dispatch => ({
  fectchEventCenter: id => dispatch(fetchEventCenter(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventCenterPage);
