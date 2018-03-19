import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
require('react-datepicker/dist/react-datepicker.css');

const moment = require('moment');

const LoadEventCenter = props => {
  const { name, location, capacity, type, events, facilities } = props.eventCenter;
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
        {events.length === 0 ? (
          <div style={{ margin: '10px 0 50px 20px', color: '#c0392b' }}>No event is scheduled for this center</div>
        ) : (
          <ul className="event-date">{events.map(event => <li key={event.id}>{moment(event.eventDate).format('dddd, MMMM, Do YYYY')}</li>)}</ul>
        )}
      </div>
      <div>
        <button type="button" className="btn btn-primary" onClick={props.onOpenModal}>
          Book Center Now!{' '}
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

class EventCenterInfo extends Component {
  state = {
    startDate: moment()
  };
  onDateChange = date => {
    this.setState({
      startDate: date
    });
  };
  onCloseModal = () => {
    this.modal.classList.toggle('opened');
    this.modal_overlay.classList.toggle('opened');
  };
  onOpenModal = () => {
    this.modal.classList.toggle('opened');
    this.modal_overlay.classList.toggle('opened');
  };

  render() {
    const { loading } = this.props.eventCenter;
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
                <LoadEventCenter eventCenter={this.props.eventCenter.eventCenter.data} onOpenModal={this.onOpenModal} />
              )}>
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
            <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', color: '#555' }}>{this.props.name}</div>
            <form style={{ padding: '0 20px' }} id="event-center">
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
              <DatePicker
                selected={this.state.startDate}
                onChange={this.onDateChange}
                minDate={moment()}
                maxDate={moment().add(5, 'days')}
                placeholderText="Select a date between today and 5 days in the future"
              />
            </form>

            <div className="modal-footer">
              <button className="close-button btn btn-danger btn-sm" id="close-button" type="submit">
                submit
              </button>
              <button type="button" className="btn btn-default btn-sm" onClick={this.onCloseModal}>
                cancel
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default reduxForm({ form: 'eventCenter' })(EventCenterInfo);
