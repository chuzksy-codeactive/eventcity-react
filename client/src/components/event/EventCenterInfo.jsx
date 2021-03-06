import React, { Component } from 'react';
import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';
import { resetEvent } from '../../actions/eventActions';


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
          <ul className="event-date">{Events.map(event => <li key={event.id}>{moment(event.startDate).format('dddd, MMMM, Do YYYY')} -- {moment(event.endDate).format('dddd, MMMM, Do YYYY')} </li>)}</ul>
        )}
      </div>
      <div>
        <button id="book-now" type="button" className="btn btn-primary" onClick={props.onOpenModal}>
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
  static defaultProps = {
    numberOfMonths: 1
  }
  state = {
    selectedDay: undefined,
    from: undefined,
    to: undefined,
    message: null
  };
  handleDayClick = (day, { selected, disabled }) => {
    const range = DateUtils.addDayToRange(day, {to: this.state.to, from: this.state.from});
    this.setState({
      selectedDay: range.from,
      from: range.from,
      to: range.to
    })
  };

  handleResetClick = () => {
    this.setState({
      from: undefined,
      to: undefined
    })
  }

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
    if (this.state.from && this.state.to) {
      const data = { ...values, 
        userId: this.props.userId, 
        centerId: this.props.centerId, 
        eventDate: moment(this.state.selectedDay).format("YYYY-MM-DD"),
        startDate: moment(this.state.from).format("YYYY-MM-DD"), 
        endDate: moment(this.state.to).format("YYYY-MM-DD")
      };
      this.props.createEvent(data);
      this.props.reset();
      this.setState({
        message: null,
        from: undefined,
        to: undefined
      })
    } else {
      this.setState({
        message: 'Please select a date'
      });
    }
  };

  render() {
    const modifiers = { start: from, end: to }
    const { loading } = this.props.eventCenter;
    const { selectedDay, from, to } = this.state;
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
                <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', color: 'green' }}> Center Name:&nbsp;{this.props.name.toUpperCase()}</div>
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
                  {this.props.eventCenter.message !== "Unable to book event" && (
                    <div style={{ textAlign: 'center', margin: '10px 0', color: 'green' }}>{this.props.eventCenter.message}</div>
                  )}
                  {this.props.eventCenter.message === "Unable to book event" && (
                    <div style={{ textAlign: 'center', margin: '10px 0', color: 'red' }}>{this.props.eventCenter.message}</div>
                  )}
                  {this.state.message && <div style={{ textAlign: 'center', margin: '10px 0', color: 'red' }}>{this.state.message}</div>}
                  <div className="modal-footer">
                    <button className="close-button btn btn-danger btn-sm" id="close-button" type="submit" disabled={pristine || submitting}>
                      <span className={loading ? 'loader' : ''} />
                      submit
                    </button>
                    <button id="close-modal" type="button" className="btn btn-default btn-sm" onClick={this.onCloseModal}>
                      close
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-6">
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#555' }}>Select a day</div>
                <DayPicker 
                  className="Selectable"
                  numberOfMonths={this.props.numberOfMonths}
                  modifiers={modifiers}
                  onDayClick={this.handleDayClick} 
                  selectedDays={this.state.selectedDay} 
                  disabledDays={{ before: new Date() }} />
                
                {!from && !to && <p className="time">Please select the first day.</p>}
                    {from && !to && <p className="time">Please select the last day.</p>}
                    {from && to && <p className="time">Selected from <strong style={{color:"green"}}>{from.toLocaleDateString()}</strong> to <strong style={{color:"green"}}>{to.toLocaleDateString()}</strong></p>}
                    {' '}
                    {from &&
                      to && (
                        <button className=" btn btn-danger btn-sm link" onClick={this.handleResetClick}>
                          Reset
                        </button>
                      )}
                <Helmet>
                    <style>{`
                      .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                        background-color: #f0f8ff !important;
                        color: grey;
                      }
                      .Selectable .DayPicker-Day {
                        border-radius: 0 !important;
                      }
                      .Selectable .DayPicker-Day--start {
                        border-top-left-radius: 50% !important;
                        border-bottom-left-radius: 50% !important;
                      }
                      .Selectable .DayPicker-Day--end {
                        border-top-right-radius: 50% !important;
                        border-bottom-right-radius: 50% !important;
                      }
                      .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover{
                        background-color: red; !important
                      }
                    `}
                    </style>
                  </Helmet>
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

