// src/components/VehicleForm.jsx

import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useRootStore } from "../stores/RootStore";
import form from "../utils/formConfig";

const VehicleForm = observer(({ onSubmit, onCancel, initialValues }) => {
  const { formStore } = useRootStore();

  useEffect(() => {
    form.update(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    form.$(name).value = value;
    formStore.setFormData(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formStore.setFormSubmitted(true);

    try {
      await form.validate({ showErrors: true });

      if (form.isValid) {
        onSubmit(form.values());
      } else {
        formStore.setErrors(form.errors());
      }
    } catch (err) {
      console.error("Validation Error:", err);
    }
  };

  const getFieldError = (fieldName) => {
    const field = form.$(fieldName);

    if (formStore.formSubmitted && !field.value) {
      return "This field is required.";
    }

    if (formStore.errors[fieldName]) {
      return formStore.errors[fieldName];
    }

    return '';
  };

  const { make, model, year, price } = form.values();

  return (
    <div className="container mt-4">
      <h3>{initialValues.id ? "Edit Vehicle" : "Add Vehicle"}</h3>
      <form onSubmit={handleSubmit}>
        {formStore.formSubmitted && (
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
