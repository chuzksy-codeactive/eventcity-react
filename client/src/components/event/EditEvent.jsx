import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchEventById } from '../../actions/eventActions';
import EditEventList from './EditEventList';

class EditEvent extends Component {
  componentDidMount() {
    this.props.fetchEventById(this.props.userId);
  }

  render() {
    const { loading, message, events } = this.props.eventsByUserId;
    return (
      <Fragment>
        <h1 className="header-section set-margin-top">List of events you have scheduled</h1>
        <div className="container">
          <div style={{ margin: '30px 0' }} className="row">
            <div className="col-md-7 offset-md-2 center-list">
              {loading ? <div className="loader-big" /> : message ? <div className="set-message-center">{message}</div> : <EditEventList events={events} />}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  eventsByUserId: state.eventReducer,
  userId: state.userReducer.user.data.id
});

const mapDispatchToProps = dispatch => ({
  fetchEventById: userId => dispatch(fetchEventById(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
