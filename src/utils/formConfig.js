// utils/formConfig.js

import { Form } from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";

// Plugins configuration for the form
const plugins = {
  dvr: dvr({ package: validatorjs }),
};

// Fields configuration for the form
const fields = {
  make: {
    label: 'Make',
    rules: 'required|string',
  },
  model: {
    label: 'Model',
    rules: 'required|string',
  },
  year: {
    label: 'Year',
    rules: 'required|integer',
  },
  price: {
    label: 'Price',
    rules: 'required|numeric',
  },
};

const form = new Form({ fields }, { plugins });

export default form;
