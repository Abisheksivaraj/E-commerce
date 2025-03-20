import { Grid } from "@mui/material";
import React from "react";
import Achievements from "./Achievements";
import MonthlyOverview from "./MonthlyOverview";

import OrderTableView from "../../State/Admin/View/OrderTableView";
import ProductTableView from "../../State/Admin/View/ProductTableView";

const adminDashboard = () => {
  return (
    <div className="pt-2">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Achievements />
        </Grid>

        <Grid item xs={12} md={8}>
          <MonthlyOverview />
        </Grid>

        <Grid item xs={12} md={6}>
          <OrderTableView />
        </Grid>

        <Grid item xs={12} md={6}>
          <ProductTableView />
        </Grid>
      </Grid>
    </div>
  );
};

export default adminDashboard;
