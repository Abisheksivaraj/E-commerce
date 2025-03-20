import { Button, Card, CardContent, styled, Typography } from "@mui/material";
import React from "react";
import trophy from "../../assets/trophy.png";

const TriangleImg = styled("img")({
  right: 0,
  bottom: 0,
  height: 170,
  position: "absolute",
});

const TrophyImg = styled("img")({
  right: 0,
  bottom: 20,
  height: 98,
  position: "absolute",
});

const Achievements = () => {
  return (
    <div>
      <Card sx={{ position: "relative", width: "21rem", bgcolor: "#242b2e" }}>
        <CardContent>
          <Typography
            variant="h6"
            sx={{ letterSpacing: ".25px", color: "white" }}
          >
            Shopping Cart
          </Typography>

          <Typography variant="body2" sx={{ color: "white" }}>
            Congratulations...🥳
          </Typography>

          <Typography variant="h5" sx={{ my: 3.1, color: "white" }}>
            420.8k
          </Typography>

          <Button size="small" variant="contained">
            View Sales
          </Button>

          <TriangleImg src=""></TriangleImg>
          <TrophyImg src={trophy}></TrophyImg>
        </CardContent>
      </Card>
    </div>
  );
};

export default Achievements;
