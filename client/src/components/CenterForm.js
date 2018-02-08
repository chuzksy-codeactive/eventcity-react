import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../components/RenderField';
import Dropzone from 'react-dropzone';

const renderCenterType = ({ label, input, meta: { touched, error, invalid } }) => (
  <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
    <label htmlFor="centerType" className="control-label">
      {label}
    </label>
    <select {...input} className={error && touched ? 'form-control is-invalid' : 'form-control'}>
      <option value="">Select a color...</option>
      <option value="ff0000">Red</option>
      <option value="00ff00">Green</option>
      <option value="0000ff">Blue</option>
    </select>
    <div className="invalid-feedback">{error}</div>
  </div>
);

const renderFacilities = ({ label, input, meta: { touched, error, invalid } }) => (
  <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
    <label htmlFor="centerType" className="control-label">
      {label}
    </label>
    <textarea {...input} className={error && touched ? 'form-control is-invalid' : 'form-control'} row="5" />
    <div className="invalid-feedback">{error}</div>
    <small>Note: list should be seperated by a comma</small>
  </div>
);

const validate = values => {
  var errors = {};
  var hasErrors = false;

  if (!values.centerName || values.centerName.trim() === '') {
    errors.centerName = 'center name is required';
    hasErrors = true;
  }
  if (!values.capacity || values.capacity.trim() === '') {
    errors.capacity = 'Capacity is required';
    hasErrors = true;
  }
  if (!values.location || values.location.trim() === '') {
    errors.location = 'Center location is required';
    hasErrors = true;
  }
  if (!values.price || values.price.trim() === '') {
    errors.price = 'Center amount is required';
    hasErrors = true;
  }
  if (!values.centerType || values.centerType.trim() === '') {
    errors.centerType = 'Select a center type';
    hasErrors = true;
  }
  if (!values.facilities || values.facilities.trim() === '') {
    errors.facilities = 'facilities are required';
    hasErrors = true;
  }
  return hasErrors && errors;
};

class CenterForm extends Component {
  state = {
    filename: '',
    image: '',
    imageError: ''
  };
  onDrop = (acceptedFiles, rejectedFiles) => {
    console.log(acceptedFiles);
    if (acceptedFiles.length > 0) {
      this.setState(() => ({
        filename: acceptedFiles[0].name
      }));
      acceptedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          const fileAsBinaryString = reader.result;
          this.setState(() => ({
            image: fileAsBinaryString,
            imageError: ''
          }));
        };
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        reader.readAsBinaryString(file);
      });
    } else {
      this.setState(() => ({
        imageError: 'Wrong image format',
        filename: ''
      }));
    }
  };
  render() {
    let dropzoneRef;
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="container center-flex adjust-top">
        <div className="row">
          <div className="col">
            <section className="section-features">
              <div>
                <h1 className="header-section row-width">Register a new Center</h1>
              </div>
              <form onSubmit={handleSubmit(this.onSubmit)} className="control-forms">
                <Field name="name" type="text" component={RenderField} label="Center Name" required />
                <Field name="capacity" type="number" component={RenderField} label="Capacity" required />
                <Field name="location" type="text" component={RenderField} label="Location" required />
                <Field name="price" type="number" component={RenderField} label="Price" required />
                <Field name="facilities" component={renderFacilities} label="Facilities" />
                {/* <div className="form-group">
                  <label className="control-label">Facilities</label>
                  <Field name="facilities" component="textarea" row="5" className="form-control" />
                  <small>Note: list should be seperated by a comma</small>
                </div> */}
                <Field name="type" component={renderCenterType} label="Center Type" />
                <div className="form-group">
                  <Dropzone
                    ref={node => {
                      dropzoneRef = node;
                    }}
                    onDrop={files => this.onDrop(files)}
                    multiple={false}
                    accept={'image/*'}
                  >
                    <div>Try dropping some files here, or click to select files to upload.</div>
                  </Dropzone>
                  {this.state.filename && (
                    <div>
                      <small>{`Select image: ${this.state.filename}`}</small>
                    </div>
                  )}
                  {this.state.imageError && (
                    <div>
                      <small>{this.state.imageError}</small>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      dropzoneRef.open();
                    }}
                  >
                    Open File Dialog
                  </button>
                </div>
                <button type="submit" className="btn btn-primary">
                  Create New Center
                </button>
                <button type="submit" className="btn btn-danger">
                  Cancel
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'centerForm',
  validate
})(CenterForm);
