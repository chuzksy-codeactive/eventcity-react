import { connect } from 'react-redux';
import { fetchEventCenter, createEvent } from '../../actions/eventActions';
import { resetCenterEvent } from '../../actions/centerAction';
import EventCenterPage from './EventCenterPage';

const mapStateToProps = state => ({
  eventCenter: state.eventCenterReducer,
  userId: state.userReducer.user.data.id || null
});

const mapDispatchToProps = dispatch => ({
  fetchEventCenter: id => dispatch(fetchEventCenter(id)),
  createEvent: data => dispatch(createEvent(data)),
  resetCenterEvent: () => dispatch(resetCenterEvent())
});

export default connect(mapStateToProps, mapDispatchToProps)(EventCenterPage);
