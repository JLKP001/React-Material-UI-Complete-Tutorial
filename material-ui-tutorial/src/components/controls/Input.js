import React from "react";
import { TextField } from "@material-ui/core";

export const Input = ({ name, label, value, onChange }) => {
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};
