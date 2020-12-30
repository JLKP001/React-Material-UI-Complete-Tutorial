import React from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const convertToDefaultEventParameter = (name, value) => ({
  target: { name, value },
});

export const DatePicker = ({ name, label, value, onChange }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        label={label}
        format="MMM/dd/yyyy"
        name={name}
        value={value}
        onChange={(e) => onChange(convertToDefaultEventParameter(name, e))}
      />
    </MuiPickersUtilsProvider>
  );
};
