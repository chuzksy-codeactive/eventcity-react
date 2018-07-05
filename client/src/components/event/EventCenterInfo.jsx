import PropTypes from 'prop-types';

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { resetEvent } from '../../actions/eventActions';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const moment = require('moment');

const LoadEventCenter = props => {
  const { name, location, capacity, type, Events, facilities } = props.eventCenter;
  return (
    <div className="menucontent">
      <div className="center-event-info">
        <strong>Name: </strong>
        <div>{name}</div>
      </div>
      <div className="center-event-info">
        <strong>Location: </strong>
        <div>{location}</div>
      </div>
      <div className="center-event-info">
        <strong>Capacity: </strong>
        <div>{capacity}</div>
      </div>
      <div className="center-event-info">
        <strong>Type: </strong>
        <div>{type}</div>
      </div>
      <div className="center-event-info">
        <strong>Facilities: </strong>
        <div>{facilities}</div>
      </div>
      <h4>Events Date scheduled for this Center</h4>
      <div>
        {Events.length === 0 ? (
          <div style={{ margin: '10px 0 50px 20px', color: '#c0392b' }}>No event is scheduled for this center</div>
        ) : (
          <ul className="event-date">{Events.map(event => <li key={event.id}>{moment(event.eventDate).format('dddd, MMMM, Do YYYY')}</li>)}</ul>
        )}
      </div>
      <div>
        <button type="button" className="btn btn-primary" onClick={props.onOpenModal}>
          Book Center Now!
        </button>
      </div>
    </div>
  );
};

const renderFacilities = ({ label, input, meta: { touched, error, invalid } }) => (
  <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
    <label htmlFor="type" className="control-label">
      {label}
    </label>
    <textarea {...input} className={error && touched ? 'form-control is-invalid' : 'form-control'} row="5" />
    <div className="invalid-feedback">{error}</div>
  </div>
);

const renderPurposeField = ({ input, label, type, meta: { touched, error, invalid, warning } }) => (
  <div>
    <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
      <label htmlFor="type" className="control-label">
        {label}
      </label>
      <input
        {...input}
        type={type}
        placeholder="e.g weddding, AGM, birthday, meetup"
        className={`form-control form-control-sm ${error && touched ? 'is-invalid' : ''}`}
      />
      <small className="invalid-feedback">{error}</small>
    </div>
  </div>
);

const renderField = ({ input, label, type, meta: { touched, error, invalid, warning } }) => (
  <div>
    <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
      <label htmlFor="type" className="control-label">
        {label}
      </label>
      <input {...input} type={type} placeholder={label} className={`form-control form-control-sm ${error && touched ? 'is-invalid' : ''}`} />
      <small className="invalid-feedback">{error}</small>
    </div>
  </div>
);

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Event name is required';
  }
  if (!values.purpose) {
    errors.purpose = 'Event purpose is required';
  }
  if (!values.note) {
    errors.note = 'Please provide a short note';
  }
  return errors;
};

class EventCenterInfo extends Component {
  state = {
    selectedDay: undefined,
    message: null
  };
  handleDayClick = (day, { selected, disabled }) => {
    if (disabled) {
      return;
    }
    if (selected) {
      this.setState({ selectedDay: undefined });
      return;
    }
    this.setState({ selectedDay: day, message: null });
  };
  onCloseModal = () => {
    this.modal.classList.toggle('opened');
    this.modal_overlay.classList.toggle('opened');
    this.setState({
      selectedDay: undefined,
      message: null
    });
    this.props.dispatch(resetEvent());
  };
  onOpenModal = () => {
    this.modal.classList.toggle('opened');
    this.modal_overlay.classList.toggle('opened');
    this.props.reset();
  };
  onSubmitForm = values => {
    if (this.state.selectedDay) {
      const data = { ...values, userId: this.props.userId, centerId: this.props.centerId, eventDate: this.state.selectedDay.toLocaleDateString() };
      this.props.createEvent(data);
    } else {
      this.setState({
        message: 'Please select a date'
      });
    }
  };

  render() {
    const { loading } = this.props.eventCenter;
    const { selectedDay } = this.state;
    const { handleSubmit, submitting, reset, pristine } = this.props;
    return (
      <section className="section-features">
        <div>
          <h1 className="header-section row-width"> {"Center's Information"}</h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              {loading ? (
                <div className="loader-big" />
              ) : (
                <LoadEventCenter eventCenter={this.props.eventCenter.eventCenter.data} onOpenModal={this.onOpenModal} reset={reset} />
              )}
            </div>
          </div>
        </div>
        <div
          className="modal-overlay"
          id="modal-overlay"
          ref={el => {
            this.modal_overlay = el;
          }}
        />
        {/* Show the center events modal */}
        <div
          className="modal event-center"
          id="modal"
          ref={el => {
            this.modal = el;
          }}
        >
          <div className="modal-guts">
            <div className="modal-header">
              <h5>Book an event for this center</h5>
              <span className="close" onClick={this.onCloseModal}>
                &times;
              </span>
            </div>
            <div className="row">
              <div className="col-6">
                <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', color: '#555' }}>{this.props.name}</div>
                <form style={{ padding: '0 20px', marginTop: '10px' }} id="event-center" onSubmit={handleSubmit(this.onSubmitForm)}>
                  <Field name="name" type="text" component={renderField} label="Event Name" required />
                  <Field
                    name="purpose"
                    type="text"
                    component={renderPurposeField}
                    label="Event Purpose"
                    required
                    placeholder="e.g wedding, AGM, birthday, meetup"
                  />
                  <Field name="note" component={renderFacilities} label="Short note" />
                  {this.props.eventCenter.message && (
                    <div style={{ textAlign: 'center', margin: '10px 0', color: 'red' }}>{this.props.eventCenter.message}</div>
                  )}
                  {this.state.message && <div style={{ textAlign: 'center', margin: '10px 0', color: 'red' }}>{this.state.message}</div>}
                  <div className="modal-footer">
                    <button className="close-button btn btn-danger btn-sm" id="close-button" type="submit" disabled={pristine || submitting}>
                      <span className={loading ? 'loader' : ''} />
                      submit
                    </button>
                    <button type="button" className="btn btn-default btn-sm" onClick={this.onCloseModal}>
                      cancel
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-6">
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#555' }}>Select a day</div>
                <DayPicker onDayClick={this.handleDayClick} selectedDays={this.state.selectedDay} disabledDays={{ before: new Date() }} />
                {selectedDay ? (
                  <div style={{ marginBottom: '10px', textAlign: 'center', color: '#78B0F6' }}>Date selected: {selectedDay.toLocaleDateString()}</div>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
EventCenterInfo.propTypes = {
  eventCenter: PropTypes.object.isRequired,
  onOpenModal: PropTypes.func,
  userId: PropTypes.number.isRequired,
  centerId: PropTypes.any.isRequired,
  reset: PropTypes.func.isRequired,
  createEvent: PropTypes.func,
  name: PropTypes.string,
  location: PropTypes.string,
  capacity: PropTypes.number,
  type: PropTypes.string,
  Events: PropTypes.array,
  facilities: PropTypes.string
}
export default reduxForm({ form: 'eventCenter', validate })(EventCenterInfo);


