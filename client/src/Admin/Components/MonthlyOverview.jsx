import { MoreVert, TrendingUp } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DevicesIcon from "@mui/icons-material/Devices";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

const salesData = [
  {
    status: "245k",
    title: "Sales",
    color: "#e5d68a",
    icon: <TrendingUp sx={{ fontSize: "2rem" }} />,
  },
  {
    status: "15.3k",
    title: "Customers",
    color: "#22cb5c",
    icon: <AccountCircleIcon sx={{ fontSize: "2rem" }} />,
  },
  {
    status: "1.5k",
    title: "Products",
    color: "#de4839",
    icon: <DevicesIcon sx={{ fontSize: "2rem" }} />,
  },
  {
    status: "100k",
    title: "Revenue",
    color: "#12b0e8",
    icon: <AccountBalanceIcon sx={{ fontSize: "2rem" }} />,
  },
];

const renderState = () => {
  return salesData.map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          variant="rounded"
          sx={{
            mr: 3,
            width: 44,
            boxShadow: 3,
            color: "common.white",
            backgroundColor: `${item.color}`,
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption">{item.title}</Typography>
          <Typography variant="h6">{item.status}</Typography>
        </Box>
      </Box>
    </Grid>
  ));
};

const MonthlyOverview = () => {
  return (
    <div>
      <Card sx={{ bgcolor: "#242b2e",width: "43rem", color: "white" }}>
        <CardHeader
          title="Monthly Overview"
          action={
            <IconButton size="small">
              <MoreVert />
            </IconButton>
          }
          subheader={
            <Typography variant="body2">
              <Box
                component="span"
                sx={{ fontWeight: 600, color: "text.white" }}
              >
                Total 48.5% growth 😎 this Month
              </Box>
            </Typography>
          }
          titleTypographyProps={{
            sx: {
              mb: 2.5,
              lineHeight: "2rem !important",
              letterSpacing: "0.15px !important",
            },
          }}
        />

        <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
          <Grid container spacing={[5, 0]}>
            {renderState()}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyOverview;
