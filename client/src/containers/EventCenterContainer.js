import { connect } from 'react-redux';
import { fetchEventCenter, createEvent } from '../actions/eventActions';
import EventCenterPage from '../components/EventCenterPage';

const mapStateToProps = state => ({
  eventCenter: state.eventCenterReducer,
  userId: state.userReducer.user.data.id
});

const mapDispatchToProps = dispatch => ({
  fetchEventCenter: id => dispatch(fetchEventCenter(id)),
  createEvent: data => dispatch(createEvent(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventCenterPage);
