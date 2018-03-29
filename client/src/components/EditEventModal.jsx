import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { load } from '../reducer/loadCenter';
import { updateEventById } from '../actions/eventActions';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const moment = require('moment');

const renderFacilities = ({ label, input, meta: { touched, error, invalid } }) => (
  <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
    <label htmlFor="type" className="control-label">
      {label}
    </label>
    <textarea {...input} className={error && touched ? 'form-control is-invalid' : 'form-control'} row="5" />
    <div className="invalid-feedback">{error}</div>
  </div>
);

const renderPurposeField = ({ input, label, type, meta: { touched, error, invalid } }) => (
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

const renderField = ({ input, label, type, meta: { touched, error, invalid } }) => (
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

class EditEventModal extends Component {
  state = {
    selectedDay: undefined
  };
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
  componentDidUpdate() {
    if (this.props.event) {
      const { name, purpose, note } = this.props.event;
      this.props.load({ name, purpose, note });
    }
  }
  componentDidMount() {
    if (this.props.event) {
      const { name, purpose, note } = this.props.event;
      this.props.load({ name, purpose, note });
    }
  }
  onSubmitForm = () => {
    console.log(this.state.selectedDay);
  };

  render() {
    const { handleSubmit } = this.props;
    const { selectedDay } = this.state;
    const { eventDate } = this.props.event;
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

const mapStateToProps = (state, props) => {
  return { initialValues: props.event };
};

const mapDispatchToProps = dispatch => ({
  load,
  updateEventById: data => dispatch(updateEventById(data))
});

EditEventModal = reduxForm({
  form: 'editEvent',
  enableReinitialize: true
})(EditEventModal);

EditEventModal = connect(mapStateToProps, mapDispatchToProps)(EditEventModal);

export default EditEventModal;
