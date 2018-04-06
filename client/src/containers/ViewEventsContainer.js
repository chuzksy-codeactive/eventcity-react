import { connect } from 'react-redux';
import { fetchEvent } from '../actions/eventActions';
import ViewEvents from '../components/ViewEvents';

const mapStateToProps = state => ({
  events: state.eventReducer
});

const mapDispatchToProps = dispatch => ({
  fetchEvent: () => dispatch(fetchEvent())
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewEvents);
