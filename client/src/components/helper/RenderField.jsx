import React from 'react';

const RenderField = ({ input, id, label, type, meta: { touched, error, invalid, warning } }) => (
  <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
    <label className="control-label">{label}</label>
    <div>
      <input {...input}  id={id} className={error && touched ? 'form-control is-invalid' : 'form-control'} placeholder={label} type={type} />
      <div className="invalid-feedback">{error}</div>
    </div>
  </div>
);

export default RenderField;
