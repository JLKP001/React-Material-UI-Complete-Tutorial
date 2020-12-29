import React from "react";
import { makeStyles, Paper } from "@material-ui/core";
import { EmployeeForm } from "./EmployeeForm";
import { PageHeader } from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";

const useStyles = makeStyles((theme) => ({
  pageContent: { margin: theme.spacing(5), padding: theme.spacing(3) },
}));

export const Employees = () => {
  const classes = useStyles();

  return (
    <>
      <PageHeader
        title="New Employee"
        subtitle="Form design with validation"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <EmployeeForm />
      </Paper>
    </>
  );
};
