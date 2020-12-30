import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from "@material-ui/core";
import React from "react";

const convertToDefaultEventParameter = (name, value) => ({
  target: { name, value },
});

export const Checkbox = ({ name, label, value, onChange }) => {
  return (
    <FormControl>
      <FormControlLabel
        control={
          <MuiCheckbox
            name={name}
            color="primary"
            checked={value}
            onChange={(e) => {
              onChange(convertToDefaultEventParameter(name, e.target.checked));
            }}
          />
        }
        label={label}
      />
    </FormControl>
  );
};
