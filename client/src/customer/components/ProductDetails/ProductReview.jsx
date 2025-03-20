import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";

const ProductReview = () => {
  return (
    <div className="border p-3">
      <Grid container spacing={2} gap={3}>
        {/* Avatar Section */}
        <Grid item xs={1}>
          <Box>
            <Avatar
              sx={{ width: 56, height: 56, bgcolor: "#040084", color: "white" }}
            >
              A
            </Avatar>
          </Box>
        </Grid>

        {/* Review Content */}
        <Grid item xs={9}>
          <div className="space-y-2">
            <div>
              <p className="font-semibold">Abishek</p>
              <p className="text-sm font-medium text-gray-500 opacity-50">
                Nov 26, 2024
              </p>
            </div>
          </div>

          <Rating value={3.5} precision={0.5} name="half-rating" readOnly />

          <p className="mt-4 text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, rem
            aliquid harum veritatis accusamus vel facere in ab tempora quas, non
            debitis reiciendis esse vitae repudiandae dignissimos veniam? At,
            commodi?
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductReview;
