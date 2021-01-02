import React, { useState } from "react";
import {
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from "@material-ui/core";
import { EmployeeForm } from "./EmployeeForm";
import { PageHeader } from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import { useTable } from "../../components/useTable";
import * as employeeService from "../../services/employeeService";
import { Controls } from "../../components/controls/Controls";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  pageContent: { margin: theme.spacing(5), padding: theme.spacing(3) },
  searchInput: { width: "75%" },
}));

const headCells = [
  { id: "fullName", label: "Employee Name" },
  { id: "email", label: "Email" },
  { id: "mobile", label: "Mobile Number" },
  { id: "department", label: "Department", disableSorting: true },
];

export const Employees = () => {
  const classes = useStyles();
  const [records, setRecords] = useState(employeeService.getAllEmployees());
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const {
    TableContainer,
    TableHead,
    TablePagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.fullName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  return (
    <>
      <PageHeader
        title="New Employee"
        subtitle="Form design with validation"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        {/* <EmployeeForm /> */}
        <Toolbar>
          <Controls.Input
            label="Search Employee"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Toolbar>
        <TableContainer>
          <TableHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.department}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
        <TablePagination />
      </Paper>
    </>
  );
};
