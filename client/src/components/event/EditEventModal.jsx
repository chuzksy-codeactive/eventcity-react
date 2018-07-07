import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { load } from '../../reducer/loadCenter';
import { updateEventById, resetEvent } from '../../actions/eventActions';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import PropTypes from 'prop-types';

const moment = require('moment');

const renderFacilities = ({ label, input, meta: { touched, error, invalid } }) => (
  <div id="form-group" className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
    <label htmlFor="type" className="control-label">
      {label}
    </label>
    <textarea {...input} className={error && touched ? 'form-control is-invalid' : 'form-control'} row="5" />
    <div className="invalid-feedback">{error}</div>
  </div>
);

const renderPurposeField = ({ input, label, type, meta: { touched, error, invalid } }) => (
  <div>
    <div id="form-group" className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
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

const renderField = ({ input, label, type, meta: { touched, error, invalid } }) => (
  <div>
    <div id="form-group" className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
      <label htmlFor="type" className="control-label">
        {label}
      </label>
      <input {...input} type={type} placeholder={label} className={`form-control form-control-sm ${error && touched ? 'is-invalid' : ''}`} />
      <small className="invalid-feedback">{error}</small>
    </div>
  </div>
);

const renderSelectCenter = ({change, defaultCenter, centers, label, input, meta: { touched, error, invalid } }) => {
  console.log(defaultCenter);
  return (
  <div>
    <div id="form-group" className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
      <label htmlFor="type" className="control-label">
        {label}
      </label>
      <select className={`form-control form-control-sm ${error && touched ? 'is-invalid' : ''}`} defaultValue={defaultCenter} onChange={change}>
      {centers.map(center => {
        return (<option key={center.id} value={center.id}>{center.name}</option>);
      })}
      </select>
      <small className="invalid-feedback">{error}</small>
    </div>
  </div>
);}

const validate = values => {
  const errors = {};
  if(!values.centerName){
    error.centerName = "Center name is required";
  }
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
}

/**
 * This component handle the editting of events
 *
 * @class EditEventModal
 * @extends {Component}
 * @return {object} JSX DOM
 */
class EditEventModal extends Component {
  state = {
    selectedDay: undefined,
    message: null,
    selectCenter: ''
  };
  componentDidMount(){
    this.state.message = null;
    this.props.reset();
  }

  componentWillReceiveProps(newProps) {
    this.setState({selectedDay: new Date(newProps.event.eventDate)})
  }

  handleDayClick = (day, { selected, disabled }) => {
    if (disabled) {
      return;
    }
    if (selected) {
      this.setState({ selectedDay: undefined });
      return;
    }
    this.setState({ selectedDay: day });
  };

  onSelectCenter = (e) => {
    this.setState({
      selectCenter: e.target.value
    })
  }
  
  onSubmitForm = (values) => {
    
    if (this.state.selectedDay) {
      const data = { ...values, eventDate: this.state.selectedDay, centerId: this.state.selectCenter };
      this.props.updateEventById(data);
    } else {
      this.setState({
        message: 'Please select another date'
      });
    }
  };

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    const { selectedDay } = this.state;
    const { eventDate } = this.props.event;
    const { message } = this.props.updateEvent;

    return (
      <div>
        <div className="modal-overlay" id="modal-overlay" ref={this.props.modal_overlay}>
          <div className="modal event-center" id="modal" ref={this.props.modal}>
            <div className="modal-guts">
              <div className="modal-header">
                <h5>Edit booked event</h5>
                <span className="close" onClick={this.props.onCloseModal}>
                  &times;
                </span>
              </div>
              <div className="row">
                <div className="col-6">
                  <form style={{ padding: '0 20px', marginTop: '10px' }} id="event-center" onSubmit={handleSubmit(this.onSubmitForm)}>
                  {message && (
                      <div style={{ margin: '10px 0', color: 'red' }}>{message}</div>
                    )}

                     <Field centers={this.props.centers || []} defaultCenter={this.props.initialValues.centerId} name="centerName" type="select" component={renderSelectCenter} label="Change Center" required change={this.onSelectCenter.bind(this)} />

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
                    {eventDate && (
                      <div style={{ margin: '10px 0', color: '#343A40' }}>{`Event date: ${moment(eventDate).format('MMMM Do YYYY')}`}</div>
                    )}
                    {this.state.message && (
                      <div style={{ margin: '10px 0', color: 'red' }}>{this.state.message}</div>
                    )}
                    <div className="modal-footer">
                      <button className="close-button btn btn-danger btn-sm" id="close-button" type="submit">
                        submit
                      </button>
                      <button type="button" className="btn btn-default btn-sm" onClick={this.props.onCloseModal}>
                        cancel
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-6">
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#555' }}>Change date</div>
                  <div>
                    <DayPicker onDayClick={this.handleDayClick} selectedDays={this.state.selectedDay} disabledDays={{ before: new Date() }} />
                  </div>
                  {selectedDay ? (
                    <div style={{ marginBottom: '10px', textAlign: 'center', color: '#78B0F6' }}>
                      Date selected: {selectedDay.toLocaleDateString()}
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditEventModal.propTypes = {
  reset: PropTypes.func,
  updateEventById: PropTypes.func,
  updateEvent: PropTypes.object,
  eventDate: PropTypes.string,
  message: PropTypes.string,
  onCloseModal: PropTypes.func,
  userId: PropTypes.number,
  eventsByUserId: PropTypes.object
}

const mapStateToProps = (state, props) => {
  
  return {
    centers: state.centerListReducer.centers,
    initialValues: props.event,
    updateEvent: state.updateEventReducer,
    eventsByUserId: state.eventReducer,
    userId: state.userReducer.user.data.id
  };
};

const mapDispatchToProps = dispatch => ({
  load,
  updateEventById: data => dispatch(updateEventById(data)),
});

EditEventModal = reduxForm({
  form: 'editEvent',
  enableReinitialize: true,
})(EditEventModal);

EditEventModal = connect(mapStateToProps, mapDispatchToProps)(EditEventModal);

export default EditEventModal;
