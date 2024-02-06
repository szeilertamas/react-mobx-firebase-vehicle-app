// src/components/VehicleForm.js

import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import form from "../utils/formConfig";

const VehicleForm = observer(({ onSubmit, onCancel, initialValues }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Update form values when initialValues change
  useEffect(() => {
    form.update(initialValues);
  }, [initialValues]);

  // Event handler for input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    form.$(name).value = value;
  };

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark form as submitted
    setFormSubmitted(true);

    try {
      await form.validate({ showErrors: true });

      // If form is valid, invoke onSubmit callback with form values
      if (form.isValid) {
        onSubmit(form.values());
      } else {
        // If form is invalid, set validation errors
        setErrors(form.errors());
      }
    } catch (err) {
      console.error("Validation Error:", err);
    }
  };

  // Function to get field error message
  const getFieldError = (fieldName) => {
    const field = form.$(fieldName);

    // Show required error if field is empty and form is submitted
    if (formSubmitted && !field.value) {
      return "This field is required.";
    }

    // Show validation error
    if (errors[fieldName]) {
      return errors[fieldName];
    }

    return '';
  };

  const { make, model, year, price } = form.values();

  return (
    <div className="container mt-4">
      <h3>{initialValues.id ? "Edit Vehicle" : "Add Vehicle"}</h3>
      <form onSubmit={handleSubmit}>
        {/* Show error message if form is submitted and invalid */}
        {formSubmitted && (
          <div className="alert alert-danger" role="alert">
            Please fix the errors before submitting the form.
          </div>
        )}

        {/* Input field for 'Make' */}
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
          {/* Show field error message */}
          {getFieldError('make') && (
            <div className="invalid-feedback">{getFieldError('make')}</div>
          )}
        </div>

        {/* Input field for 'Model' */}
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
          {/* Show field error message */}
          {getFieldError('model') && (
            <div className="invalid-feedback">{getFieldError('model')}</div>
          )}
        </div>

        {/* Input field for 'Year' */}
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
          {/* Show field error message */}
          {getFieldError('year') && (
            <div className="invalid-feedback">{getFieldError('year')}</div>
          )}
        </div>

        {/* Input field for 'Price' */}
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
          {/* Show field error message */}
          {getFieldError('price') && (
            <div className="invalid-feedback">{getFieldError('price')}</div>
          )}
        </div>

        {/* Submit and cancel buttons */}
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
