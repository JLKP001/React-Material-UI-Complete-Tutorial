import {
  Table,
  TableCell,
  TableRow,
  TableHead as MuiTableHead,
  makeStyles,
  TablePagination as MuiTablePagination,
  TableSortLabel,
} from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));

export const useTable = (records, headCells, filterFn) => {
  const classes = useStyles();

  const pages = [1, 5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[0]);
  const [order, setOrder] = useState(pages[0]);
  const [orderBy, setOrderBy] = useState(pages[0]);

  const TableContainer = (props) => {
    return <Table className={classes.table}>{props.children}</Table>;
  };

  const TableHead = (props) => {
    const handleSortRequest = (cellId) => {
      const isAscending = orderBy === cellId && order === "asc";
      setOrder(isAscending ? "desc" : "asc");
      setOrderBy(cellId);
    };
    return (
      <MuiTableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.disableSorting ? (
                headCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={() => handleSortRequest(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </MuiTableHead>
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const TablePagination = () => (
    <MuiTablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );

  const stableSort = (array, comparator) => {
    const stabalizedThis = array.map((el, index) => [el, index]);
    stabalizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabalizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const recordsAfterPagingAndSorting = () => {
    return stableSort(
      filterFn.fn(records),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  return {
    TableContainer,
    TableHead,
    TablePagination,
    recordsAfterPagingAndSorting,
  };
};
