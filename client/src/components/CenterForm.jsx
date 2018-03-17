import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../components/RenderField';
import Dropzone from 'react-dropzone';

const renderCenterType = ({ label, input, meta: { touched, error, invalid } }) => (
  <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
    <label htmlFor="type" className="control-label">
      {label}
    </label>
    <select {...input} className={error && touched ? 'form-control is-invalid' : 'form-control'}>
      <option value="">Select a type...</option>
      <option value="Theatre">Theatre</option>
      <option value="Classroom">Classroom</option>
      <option value="Banquest">Banquest</option>
      <option value="Hall">Hall</option>
    </select>
    <div className="invalid-feedback">{error}</div>
  </div>
);

const renderFacilities = ({ label, input, meta: { touched, error, invalid } }) => (
  <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
    <label htmlFor="type" className="control-label">
      {label}
    </label>
    <textarea
      {...input}
      className={error && touched ? 'form-control is-invalid' : 'form-control'}
      row="5"
    />
    <div className="invalid-feedback">{error}</div>
    <small>Note: list should be seperated by a comma</small>
  </div>
);

const validate = values => {
  var errors = {};
  var hasErrors = false;

  if (!values.name || values.name.trim() === '') {
    errors.name = 'center name is required';
    hasErrors = true;
  }
  if (!values.capacity) {
    errors.capacity = 'Capacity is required';
    hasErrors = true;
  }
  if (!values.location || values.location.trim() === '') {
    errors.location = 'Center location is required';
    hasErrors = true;
  }
  if (!values.price) {
    errors.price = 'Center amount is required';
    hasErrors = true;
  }
  if (!values.type || values.type.trim() === '') {
    errors.type = 'Select a center type';
    hasErrors = true;
  }
  if (!values.facilities || values.facilities.trim() === '') {
    errors.facilities = 'facilities are required';
    hasErrors = true;
  }
  return hasErrors && errors;
};

class CenterForm extends Component {
  initValues = {
    id: this.props.center ? this.props.center.id : '',
    name: this.props.center ? this.props.center.name : '',
    capacity: this.props.center ? this.props.center.capacity : '',
    location: this.props.center ? this.props.center.location : '',
    price: this.props.center ? this.props.center.price : '',
    facilities: this.props.center ? this.props.center.facilities : '',
    type: this.props.center ? this.props.center.type : '',
  };
  state = {
    files: [],
    file: null,
    imageUrl: null,
    display: 'none',
  };
  onDrop = files => {
    const file = files[0];
    this.setState({
      file,
      files,
    });
  };
  isOpen = () => {
    this.setState({
      display: 'block',
    });
  };
  isClose = () => {
    this.setState({ display: 'none' });
  };

  onSubmitForm = values => {
    const centers = { ...values, file: this.state.file };
    if (!this.props.match.params.id) {
      this.props.createCenter(centers, this.props.history);
    }
    if (this.props.match.params.id) {
      this.props.updateCenter(centers);
    }
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.load(this.initValues);
    }
  }

  render() {
    const { handleSubmit, submitting, reset, pristine } = this.props;
    return (
      <div>
        <div className="container center-flex adjust-top">
          <div className="row">
            <div className="col-md-5 offset-md-3">
              <section className="section-features">
                {!this.props.match.params.id && (
                  <div>
                    <h1 className="header-section row-width">Register a new Center</h1>
                  </div>
                )}
                {this.props.match.params.id && (
                  <div>
                    <h1 className="header-section">Edit Center Info</h1>
                  </div>
                )}
                <form
                  onSubmit={handleSubmit(this.onSubmitForm)}
                  className="control-forms"
                  encType="multipart/form-data"
                >
                  <Field
                    name="name"
                    type="text"
                    component={RenderField}
                    label="Center Name"
                    required
                  />
                  <Field
                    name="capacity"
                    type="number"
                    component={RenderField}
                    label="Capacity"
                    required
                  />
                  <Field
                    name="location"
                    type="text"
                    component={RenderField}
                    label="Location"
                    required
                  />
                  <Field
                    name="price"
                    type="number"
                    component={RenderField}
                    label="Price"
                    required
                  />
                  <Field name="facilities" component={renderFacilities} label="Facilities" />
                  <Field name="type" component={renderCenterType} label="Center Type" />
                  <div className="form-group">
                    <Dropzone onDrop={this.onDrop} multiple={false}>
                      <p>Try dropping some files here, or click to select files to upload.</p>
                    </Dropzone>
                    <aside>
                      <ul>
                        {this.state.files.map(f => (
                          <li key={f.name}>
                            {f.name} - {f.size} bytes
                          </li>
                        ))}
                      </ul>
                    </aside>
                  </div>
                  <div className="spinner">
                    {this.props.centers.message && <small>{this.props.centers.message}</small>}
                  </div>
                  {!this.props.match.params.id && (
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={submitting}
                      style={{ marginRight: 10 }}
                    >
                      <span className={this.props.centers.loading ? 'loader' : ''} />Create New
                      Center
                    </button>
                  )}
                  {!this.props.match.params.id && (
                    <button type="button" className="btn btn-danger" onClick={reset}>
                      Cancel
                    </button>
                  )}
                  {this.props.match.params.id && (
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={submitting || pristine}
                      style={{ marginRight: 10 }}
                    >
                      <span className={this.props.centers.loading ? 'loader' : ''} />Edit Center
                    </button>
                  )}
                  {this.props.match.params.id && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={reset}
                      disabled={submitting || pristine}
                    >
                      Undo Changes
                    </button>
                  )}
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'centerForm',
  validate,
})(CenterForm);
