// src/components/VehicleForm.js

import React from "react";

const VehicleForm = ({ onSubmit, onCancel, initialValues }) => {
  const [formData, setFormData] = React.useState(initialValues || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="container mt-4">
      <h3>{initialValues ? "Edit Vehicle" : "Add Vehicle"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="make" className="form-label">
            Make
          </label>
          <input
            type="text"
            className="form-control"
            id="make"
            name="make"
            value={formData.make || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="model" className="form-label">
            Model
          </label>
          <input
            type="text"
            className="form-control"
            id="model"
            name="model"
            value={formData.model || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="year" className="form-label">
            Year
          </label>
          <input
            type="number"
            className="form-control"
            id="year"
            name="year"
            value={formData.year || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={formData.price || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 text-center">
          <button type="submit" className="btn btn-primary me-2">
            {initialValues ? "Update" : "Add"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default VehicleForm;
