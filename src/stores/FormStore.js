// src/stores/FormStore.js
import { makeObservable, observable, action } from 'mobx';

class FormStore {
  formData = {
    make: "",
    model: "",
    year: "",
    price: "",
  };
  formSubmitted = false;
  errors = {};

  constructor() {
    makeObservable(this, {
      formData: observable,
      formSubmitted: observable,
      errors: observable,
      setFormData: action,
      setFormSubmitted: action,
      setErrors: action,
      clearFormData: action,
    });
  }

  setFormData(name, value) {
    this.formData[name] = value;
  }

  setFormSubmitted(value) {
    this.formSubmitted = value;
  }

  setErrors(errors) {
    this.errors = errors;
  }

  clearFormData() {
    this.formData = {
      make: "",
      model: "",
      year: "",
      price: "",
    };
    this.formSubmitted = false;
    this.errors = {};
  }
}

export default FormStore;
