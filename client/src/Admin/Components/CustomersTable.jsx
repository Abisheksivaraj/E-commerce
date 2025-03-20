import {
  Card,
  CardHeader,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const CustomersTable = () => {
  return (
    <div className="p-5 mt-2 w-[65rem]">
      <Card className="mt-1">
        <CardHeader title="Customers Details" />
      </Card>
      <TableContainer
        sx={{
          bgcolor: "#242b2e",
        }}
        component={Paper}
      >
        <Table
          sx={{
            color: "white",
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Customer Id</TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Name
              </TableCell>
              <TableCell sx={{ color: "white" }} align="right">
                Created At
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomersTable;

// Unique Customer id
//     Customer name
//     account creation date
//     account status(login/logout) if customer deleted their account means it automatically removed from dashboard
//     total order placed
