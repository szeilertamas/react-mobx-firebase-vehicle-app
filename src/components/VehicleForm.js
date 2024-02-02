// src/components/VehicleForm.js

import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import form from "../utils/formConfig";

const VehicleForm = observer(({ onSubmit, onCancel, initialValues }) => {
  const { make, model, year, price } = form.values();
  const { errors } = form;

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    form.$(name).value = value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormSubmitted(true);

    const hasEmptyFields = Object.values(form.values()).some((value) => value === '');

    if (hasEmptyFields) {
      setFormSubmitted(true);
      return;
    }

    form
      .validate({ showErrors: true })
      .then(() => {
        if (form.isValid) {
          onSubmit(form.values());
        }
      })
      .catch((err) => console.error("Validation Error:", err));
  };

  useEffect(() => {
    form.update(initialValues);
  }, [initialValues]);

  const getFieldError = (fieldName) => {
    const field = form.$(fieldName);

    if (formSubmitted && !field.value) {
      return "This field is required.";
    }

    return errors[fieldName] && errors[fieldName].message;
  };

  return (
    <div className="container mt-4">
      <h3>{initialValues.id ? "Edit Vehicle" : "Add Vehicle"}</h3>
      <form onSubmit={handleSubmit}>
        {formSubmitted && (
          <div className="alert alert-danger" role="alert">
            Please fix the errors before submitting the form.
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="make" className="form-label">
            Make
          </label>
          <input
            type="text"
            className={`form-control ${getFieldError('make') ? 'is-invalid' : ''}`}
            id="make"
            name="make"
            value={make}
            onChange={handleChange}
          />
          {getFieldError('make') && (
            <div className="invalid-feedback">{getFieldError('make')}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="model" className="form-label">
            Model
          </label>
          <input
            type="text"
            className={`form-control ${getFieldError('model') ? 'is-invalid' : ''}`}
            id="model"
            name="model"
            value={model}
            onChange={handleChange}
          />
          {getFieldError('model') && (
            <div className="invalid-feedback">{getFieldError('model')}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="year" className="form-label">
            Year
          </label>
          <input
            type="text"
            className={`form-control ${getFieldError('year') ? 'is-invalid' : ''}`}
            id="year"
            name="year"
            value={year}
            onChange={handleChange}
          />
          {getFieldError('year') && (
            <div className="invalid-feedback">{getFieldError('year')}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="text"
            className={`form-control ${getFieldError('price') ? 'is-invalid' : ''}`}
            id="price"
            name="price"
            value={price}
            onChange={handleChange}
          />
          {getFieldError('price') && (
            <div className="invalid-feedback">{getFieldError('price')}</div>
          )}
        </div>

        <div className="mb-3 text-center">
          <button type="submit" className="btn btn-primary me-2">
            {initialValues.id ? "Update" : "Add"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
});

export default VehicleForm;
